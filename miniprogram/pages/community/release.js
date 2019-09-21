import Toast from '../../libray/dist/toast/toast.js';
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    files: [], //图片urls
    currentTxtLen: 0, //当前输入文字长度
    maxTxtLen: 200, //文字最大长度
    content: '', //文字内容
    locationTxt: '', //位置
    talkTxt: '', //话题
    maxCount: 9 //图片最大上传数量
  },
  onLoad() {},
  /**
   * 选择图片
   */
  chooseImage() {
    let that = this
    wx.chooseImage({
      count: that.data.maxCount - that.data.files.length,
      success(res) {
        that.uploadFile(res).then(res => {
          let files = that.data.files.concat(res)
          that.setData({
            files
          })
        })
      }
    })
  },
  /**
   * 创建帖子
   * */
  commit() {
    if (!this.data.content) {
      Toast.fail(`还是说一点什么吧`);
      return
    }
    if (this.data.files.length == 0) {
      Toast.fail(`没有照片无法吸粉呢`);
      return
    }
    if (this.data.talkTxt === 'Select Your Tag') {
      Toast.fail(`选择一个话题吧`);
      return
    }
    if (this.data.locationTxt === '打卡纪念') {
      Toast.fail(`找个地方打个卡吧`);
      return
    }
    let params = {
      content: this.data.content, //内容
      files: this.data.files, //图片
      locationTxt: this.data.locationTxt, //位置
      talkTxt: this.data.talkTxt, //话题
      author: app.getUser(), //作者
      time: new Date().getTime(), //发布时间
      likenum: 0, //点赞数默认0
      collectnum: 0, //收藏数默认0
      likesArr: [], //点赞的人
      collectArr: [], //收藏的人
      reply: [] //评论
    }
    console.log(params)
    db.collection('posts').add({
        // data 字段表示需新增的 JSON 数据
        data: params
      })
      .then(res => {
        console.log(res)
        Toast.success(`发布成功`);
        app.globalData.locationInfo = null
        app.globalData.talkInfo = null
        setTimeout(() => {
          wx.navigateBack({

          })
        }, 1000)
      })
  },
  /**
   * 选择关联商品
   */
  selectGoods() {
    wx.showToast({
      title: "(X﹏X)  暂时没有商品可以选择。",
      icon: "none"
    })
  },
  onShow() {
    if (app.isLogin()) {
      // console.log(app.globalData)
      let locationTxt = app.globalData.locationInfo ? app.globalData.locationInfo.name : '打卡纪念'
      let talkTxt = app.globalData.talkInfo ? '#' + app.globalData.talkInfo.name : 'Select Your Tag'
      this.setData({
        locationTxt: locationTxt,
        talkTxt: talkTxt
      })
    }
  },
  /**
   * 图片放大
   */
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  /** 文件上传返回promise */
  uploadFile(files) {
    try {
      let that = this
      console.log('upload files', files)
      return new Promise((resolve, reject) => {
        that.up(files.tempFilePaths, [], resolve)
      })
    } catch (e) {
      console.log(e)
    }
  },
  /** 递归上传 */
  up(filePaths, fildIds, resolve) {
    let that = this
    let len = filePaths.length
    if (len == 0) {
      wx.hideLoading()
      return resolve(fildIds)
    } else {
      wx.showLoading({
        title: '上传中',
      })
      let filePath = filePaths[0];
      //文件路径
      let cloudPath = `userImgs/my-image-${Math.floor(Math.random()*10)}-${new Date().getTime()}${filePath.match(/\.[^.]+?$/)[0]}`;
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          console.log('[上传文件] 成功：', res)
          fildIds.push(res.fileID)
          filePaths.shift()
          that.up(filePaths, fildIds, resolve)
        },
        fail: e => {
          console.error('[上传文件] 失败：', e)
          wx.showToast({
            icon: 'none',
            title: '上传失败',
          })
          reject('error')
        },
      })
    }
  },
  /*** 删除图片 */
  deleteImage(e) {
    let src = e.currentTarget.dataset.src
    let index = e.currentTarget.dataset.index
    let deleteArr = [src];
    let files = this.data.files
    files.splice(index, 1)
    this.setData({
      files
    })
    wx.cloud.deleteFile({
      fileList: deleteArr
    }).then(res => {
      console.log("删除成功", res.fileList)
    }).catch(error => {})
  },
  /**
   * 文章输入监听
   */
  editInput(event) {
    if (event.detail.value.length <= this.data.maxTxtLen) {
      this.data.content = event.detail.value
      this.data.currentTxtLen = event.detail.value.length
      this.setData({
        content: this.data.content,
        currentTxtLen: this.data.currentTxtLen
      })
    }
  }

});