// pages/community/postDetail.js
const db = wx.cloud.database()
const app = getApp()
import utils from '../../utils/utils.js'
import Toast from '../../libray/dist/toast/toast.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId: '',
    post: null, //帖子
    // postTime: '14:01', //帖子时间
    imgwidth: 750, //
    imgheights: [],
    current: 0, //轮播的索引
    followPosts: [],
    reply_bottom: 0,
    domHeight: 0,
    isBottom: true,
    // phoneInfo: {},
    isMenusShow: false,
    /* 回复 */
    replyContent: '', //回复的文字
    showReply: false,
    currentFiles: [], //评论图片
    maxCount: 3,
    /* 分享 */
    share: false, //是否从分享页面进入
    opacity: 1, //回到首页按钮的透明度
    timer: null, //是否在滚动
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    if (options.share) {
      this.setData({
        share: true
      })
    }
    this.setData({
      postId: options._id
    })
    this.getPost()
    this.loadAllPosts()
    // this.getPhoneInfo()
  },
  backHome() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  /**
   * 选择评论图片
   */
  chooseImg() {
    let that = this
    wx.chooseImage({
      count: that.data.maxCount - that.data.currentFiles.length,
      success(res) {
        that.uploadFile(res).then(res => {
          let currentFiles = that.data.currentFiles.concat(res)
          that.setData({
            currentFiles
          })
        })
      }
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
      let cloudPath = `userImgs/my-image-${Math.floor(Math.random() * 10)}-${new Date().getTime()}${filePath.match(/\.[^.]+?$/)[0]}`;
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
  /***
   * 举报
   */
  report() {
    if (app.isLogin()) {
      //点赞
      Toast.success('举报成功，管理员将尽快处理')
      this.menusClose()
    } else {
      app.goLogin()
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
   * 隐藏评论输入框
   */
  hiddenReply() {
    this.setData({
      showReply: false
    })
  },

  previewImg(e) {
    let srcs = e.currentTarget.dataset.srcs;
    let current = e.currentTarget.dataset.src;
    wx.previewImage({
      current: current,
      urls: srcs
    })
  },
  /** 显示编辑 举报 弹出层 */
  menusShow() {
    this.setData({
      isMenusShow: true
    });
  },
  /** 隐藏编辑 举报 弹出层 */
  menusClose() {
    this.setData({
      isMenusShow: false
    });
  },
  /** 显示回复 */
  showReply() {
    if (app.isLogin()) {
      this.setData({
        showReply: true
      })
    } else {
      app.goLogin()
    }
  },
  /***
   * 监听键盘输入事件
   */
  replyInput(event) {
    let replyCon = event.detail.value;
    this.setData({
      replyContent: replyCon
    })
  },
  /***
   * 删除评论图片
   */
  deleteImage(e) {
    let index = e.currentTarget.dataset.index;
    let files = this.data.currentFiles;
    files.splice(index, 1)
    this.setData({
      currentFiles: files
    })
  },
  /**
   * 评论输入完成，往数据库存入数据
   */
  createReply() {
    let replyCon = this.data.replyContent
    if (!replyCon) {
      Toast.fail('你还没有评论呢')
      return
    }
    let that = this,
      postid = that.data.postId,
      // replyCon = event.detail.value,
      user = app.getUser(),
      nowTime = new Date().getTime(),
      images = that.data.currentFiles,
      _ = db.command;
    let params = {
      desc: replyCon, //评论内容，
      time: nowTime, //评论时间
      replyUser: user, //评论人
      likenum: 0,
      images: images,
      likesArr: [],
      reply: [] //评论的数组(存在评论里面有评论)
    };
    db.collection('posts').doc(postid).update({
      data: {
        reply: _.push(params)
      },
      success: function(res) {
        console.log(res)
        Toast.success('评论成功')
        that.setData({
          showReply: false,
          replyContent: '',
          currentFiles: []
        })
        that.getPost()
      }
    })
  },
  /** 获取手机信息 */
  getPhoneInfo() {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          phoneInfo: res
        })
      },
    })
  },
  /** 获取帖子的高度 */
  getPostHeight() {
    let that = this
    const query = wx.createSelectorQuery()
    query.select('#head').fields({
      id: true,
      size: true
    }, res => {
      // console.log(res)
      that.setData({
        domHeight: res.height
      })
    }).exec()
  },
  loadAllPosts() {
    let that = this
    db.collection('posts')
      .get({
        success: function(res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)
          let posts = res.data.filter(ele => {
            return ele._id != that.data.postId
          })
          if (app.isLogin()) {
            let userId = app.getUser()._id;
            posts.forEach(ele => {
              if (ele.likesArr.indexOf(userId) != -1) {
                //这个帖子用户已经点赞
                ele.alreadyLike = true
              } else {
                //未点赞
                ele.alreadyLike = false
              }
              if (ele.collectArr.indexOf(userId) != -1) {
                //这个帖子用户已经收藏
                ele.alreadyCollect = true
              } else {
                //未收藏
                ele.alreadyCollect = false
              }
            })
          } else {
            //如果用户未登录
            posts.forEach(ele => {
              ele.alreadyLike = false
              ele.alreadyCollect = false
            })
          }
          that.setData({
            followPosts: posts
          })
        }
      })
  },
  imageLoad: function(e) {
    //获取图片真实宽度
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比
      ratio = imgwidth / imgheight;
    console.log(imgwidth, imgheight)
    //计算的高度值
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },
  /** z展示图片切换 */
  bindchange: function(e) {
    this.setData({
      current: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /** 获取帖子信息 */
  getPost() {
    let that = this
    db.collection('posts').doc(this.data.postId).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      let post = res.data
      post.postTime = utils.getDateByTime(post.time)
      if (post.reply.length != 0) {
        post.reply.forEach(ele => {
          ele.time = utils.getDateByTime(ele.time)
        })
      }
      if (app.isLogin()) {
        let userId = app.getUser()._id;
        if (post.likesArr.indexOf(userId) != -1) {
          //这个帖子用户已经点赞
          post.alreadyLike = true
        } else {
          //未点赞
          post.alreadyLike = false
        }
        if (post.collectArr.indexOf(userId) != -1) {
          //这个帖子用户已经收藏
          post.alreadyCollect = true
        } else {
          //未收藏
          post.alreadyCollect = false
        }
      } else {
        //如果用户未登录
        post.alreadyLike = false
        post.alreadyCollect = false
      }
      that.setData({
        post: post
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  /*** 点赞 */
  like() {
    let that = this
    if (app.isLogin()) {
      let userid = app.getUser()._id;
      let _ = db.command
      if (that.data.post.alreadyLike) {
        //取消点赞
        let post = that.data.post
        post.alreadyLike = false
        post.likenum--;
        that.setData({
          post: post
        })
        let arrLike = post.likesArr
        let index = arrLike.indexOf(userid)
        arrLike.splice(index, 1)
        db.collection('posts').doc(that.data.postId).update({
          data: {
            likenum: _.inc(-1),
            likesArr: arrLike
          },
          success: function(res) {
            console.log(res)
          }
        })
      } else {
        //增加点赞
        let post = that.data.post
        post.alreadyLike = true
        post.likenum++;
        that.setData({
          post: post
        })
        db.collection('posts').doc(that.data.postId).update({
          data: {
            likenum: _.inc(1),
            likesArr: _.push(userid)
          }
        })
      }
    } else {
      // console.log('请登录')
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
  },
  /** 收藏 */
  collect() {
    let that = this
    if (app.isLogin()) {
      let userid = app.getUser()._id;
      let _ = db.command
      if (that.data.post.alreadyCollect) {
        //取消收藏
        let post = that.data.post
        post.alreadyCollect = false
        post.collectnum--;
        that.setData({
          post: post
        })
        let arrCollect = post.collectArr
        let index = arrCollect.indexOf(userid)
        arrCollect.splice(index, 1)
        db.collection('posts').doc(that.data.postId).update({
          data: {
            collectnum: _.inc(-1),
            collectArr: arrCollect
          },
          success: function(res) {
            console.log(res)
          }
        })
      } else {
        //增加点赞
        let post = that.data.post
        post.alreadyCollect = true
        post.collectnum++;
        that.setData({
          post: post
        })
        db.collection('posts').doc(that.data.postId).update({
          data: {
            collectnum: _.inc(1),
            collectArr: _.push(userid)
          }
        })
      }
    } else {
      // console.log('请登录')
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: this.data.post.content,
      // imageUrl: this.data.post.files[0],
      path: `pages/community/postDetail?_id=${this.data.postId}&share=share`,
      success: function(res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  /** 监听页面滚动 */
  onPageScroll(e) {
    if (this.data.isBottom) {
      this.getPostHeight()
    }
    if (e.scrollTop > this.data.domHeight) {
      this.setData({
        reply_bottom: -100
      })
    } else {
      this.setData({
        reply_bottom: 0
      })
    }
    if (this.data.timer) {
      clearTimeout(this.data.timer)
    }
    let timer = setTimeout(() => {
      this.setData({
        opacity: 1
      })
    }, 300)
    this.setData({
      opacity: 0.4,
      timer: timer
    })
  }
})