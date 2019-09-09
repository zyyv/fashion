// pages/community/index.js
import Toast from '../../libray/dist/toast/toast.js';
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fabu: {
      right: 0,
      opacity: 1
    },
    followPosts: [],
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
          console.log(res.data)
          that.setData({
            followPosts: res.data
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.loadAllPosts()
  },
  getUserInfo(event) {
    console.log(event)
    let res = event.detail;
    if (res.errMsg.indexOf('ok') != -1) {
      wx.setStorageSync("user", res);
      wx.setStorageSync("userInfo", res.userInfo);
      app.globalData.userInfo = res.userInfo;
      wx.navigateTo({
        url: '/pages/community/release',
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
      this.setData({
        loginShow: true
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