// pages/community/index.js
import Toast from '../../libray/dist/toast/toast.js';
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsActive: 1,
    fabu: {
      right: 0,
      opacity: 1
    },
    followPosts: [],
    talksArr:[],
    state: {
      scrollTop: null,
      scrollIng: null
    },
    scrollTimer: null,
    loginShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getApp().setWatcher(this);
  },
  onTabsChange(event) {
    // console.log(event)
    this.setData({
      tabsActive: event.detail.index
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // this.popup = this.selectComponent("#popup");
  },
  loadAllPosts() {
    let that = this
    db.collection('posts')
      .get({
        success: function(res) {
          // res.data 是包含以上定义的两条记录的数组
          // res.data.forEach(ele => {
          // ele.islike = true 
          // ele.isshow = false
          // })
          let posts = res.data
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
          console.log(that.data.followPosts)
        }
      })
  },
  loadAllTalks() {
    let that = this
    db.collection('talks')
      .get({
        success: function(res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)
          that.setData({
            talksArr: res.data
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.loadAllPosts()
    this.loadAllTalks()
  },
  getUserInfo(event) {
    console.log(event)
    let res = event.detail;
    let userInfo = res.userInfo
    if (res.errMsg.indexOf('ok') != -1) {
      // wx.setStorageSync("user", res);
      db.collection('users').add({
          // data 字段表示需新增的 JSON 数据
          data: userInfo
        })
        .then(response => {
          console.log(response)
          userInfo._id = response._id
          wx.setStorageSync("userInfo", userInfo);
          app.globalData.userInfo = userInfo;
          wx.navigateTo({
            url: '/pages/community/release',
          })
        })
    }
  },
  closeDialog() {
    this.setData({
      loginShow: false
    });
  },
  cancelDialog() {
    // Toast.fail(`不登录肯定是没法发布的···`);
    // return
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  release() {
    if (app.isLogin()) {
      wx.navigateTo({
        url: '/pages/community/release',
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
  },
  onPageScroll(e) {
    this.data.fabu = {
      right: -58,
      opacity: .5
    }
    this.data.state = {
      scrollTop: e.scrollTop,
      scrollIng: true
    }
    this.setData({
      fabu: this.data.fabu,
      state: this.data.state
    })
    if (this.data.scrollTimer) {
      // console.log('11')
      clearTimeout(this.data.scrollTimer)
    }
    this.data.scrollTimer = setTimeout(() => {
      if (this.data.state.scrollTop === e.scrollTop) {
        this.data.state = {
          scrollTop: e.scrollTop,
          scrollIng: false
        }
        this.data.fabu = {
          right: 0,
          opacity: 1
        }
        this.setData({
          fabu: this.data.fabu,
          state: this.data.state,
          scrollTimer: this.data.scrollTimer
        })
        clearTimeout(this.data.scrollTimer)
      }
    }, 300)
  },
  watch: {

  }
})