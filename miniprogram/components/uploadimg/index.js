// components/uploadimg/index.js
const app = getApp()
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    sizeType: {
      type: Array,
      value: ['original', 'compressed']
    },
    sourceType: {
      type: Array,
      value: ['album', 'camera']
    },
    maxSize: {
      type: Number,
      value: 5 * 1024 * 1024
    },
    maxCount: {
      type: Number,
      value: 1
    },
    files: {
      type: Array,
      value: [],
      observer: function observer(newVal, oldVal, changedP) {
        this.setData({
          currentFiles: newVal
        });
      }
    },
    // select: {
    //   type: Function,
    //   value: function value() {}
    // },
    upload: {
      type: Function,
      value: null
    },
    // tips: {
    //   type: String,
    //   value: ''
    // },
    // extClass: {
    //   type: String,
    //   value: ''
    // }
  },
  data: {
    currentFiles: [],
    // showPreview: false,
    // previewImageUrls: []
  },
  ready: function ready() {},

  methods: {
    previewImage: function previewImage(e) {
      let index = e.currentTarget.dataset.index;
      let previewImageUrls = this.data.currentFiles.map(function(item) {
        return item.url
      });
      wx.previewImage({
        current: previewImageUrls[index], // 当前显示图片的http链接
        urls: previewImageUrls // 需要预览的图片http链接列表
      })
    },
    chooseImage: function chooseImage(e) {
      var _this = this;

      if (this.uploading) return;
      wx.chooseImage({
        count: this.data.maxCount - this.data.files.length,
        success: function success(res) {
          var invalidIndex = -1;
          res.tempFiles.forEach(function(item, index) {
            if (item.size > _this.data.maxSize) {
              invalidIndex = index;
            }
          });
          if (typeof _this.data.select === 'function') {
            var ret = _this.data.select(res);
            if (ret === false) {
              return;
            }
          }
          if (invalidIndex >= 0) {
            _this.triggerEvent('fail', {
              type: 1,
              errMsg: 'chooseImage:fail size exceed ' + _this.data.maxSize,
              total: res.tempFilePaths.length,
              index: invalidIndex
            }, {});
            return;
          }
          var mgr = wx.getFileSystemManager();
          var contents = res.tempFilePaths.map(function(item) {
            var fileContent = mgr.readFileSync(item);
            return fileContent;
          });
          var obj = {
            tempFilePaths: res.tempFilePaths,
            tempFiles: res.tempFiles,
            contents: contents
          };
          _this.triggerEvent('select', obj, {});
          var files = res.tempFilePaths.map(function(item, i) {
            return {
              loading: true,
              url: 'data:image/jpg;base64,' + wx.arrayBufferToBase64(contents[i])
            };
          });
          if (!files || !files.length) return;
          if (typeof _this.data.upload === 'function') {
            var len = _this.data.files.length;
            var newFiles = _this.data.files.concat(files);
            _this.setData({
              files: newFiles,
              currentFiles: newFiles
            });
            _this.loading = true;
            _this.data.upload(obj).then(function(json) {
              _this.loading = false;
              if (json.urls) {
                var oldFiles = _this.data.files;
                json.urls.forEach(function(url, index) {
                  oldFiles[len + index].loading = false;
                  oldFiles[len + index].url = url;
                });
                _this.setData({
                  files: oldFiles,
                  currentFiles: newFiles
                });
                console.log(1, _this.data.files)
                console.log(2, _this.data.currentFiles)
                _this.triggerEvent('success', json, {});
              } else {
                _this.triggerEvent('fail', {
                  type: 3,
                  errMsg: 'upload file fail, urls not found'
                }, {});
              }
            }).catch(function(err) {
              _this.loading = false;
              var oldFiles = _this.data.files;
              res.tempFilePaths.map(function(item, index) {
                oldFiles[len + index].error = true;
                oldFiles[len + index].loading = false;
              });
              _this.setData({
                files: oldFiles,
                currentFiles: newFiles
              });
              _this.triggerEvent('fail', {
                type: 3,
                errMsg: 'upload file fail',
                error: err
              }, {});
            });
          }
        },
        fail: function fail(_fail) {
          if (_fail.errMsg.indexOf('chooseImage:fail cancel') >= 0) {
            _this.triggerEvent('cancel', {}, {});
            return;
          }
          _fail.type = 2;
          _this.triggerEvent('fail', _fail, {});
        }
      });
    },
    deleteImage: function deleteImage(e) {
      let index = e.currentTarget.dataset.index;
      let files = this.data.files;
      files.splice(index, 1);
      console.log(files)
      this.setData({
        files: files,
        currentFiles: files
      });
    }
  }
});