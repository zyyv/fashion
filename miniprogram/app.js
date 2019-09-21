//app.js

const watch = require("./utils/watch.js");
const _db = require('./utils/db.js')
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // 此处请填入环境 ID, 环境 ID 可打开云控制台查看
        env: 'garbage-zy-jfq6e',
        traceUser: true,
      })
    }
  },
  setWatcher(page) {
    watch.setWatcher(page);
  },
  // 判断是否登录
  isLogin: function() {
    var user = wx.getStorageSync('userInfo')
    return user ? true : false
  },
  goLogin(){
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  getUser() {
    var user = wx.getStorageSync('userInfo')
    return user
  },
  async getUserInfo(e, cb) {
    try {
      var that = this
      if (!this.isLogin()) {
        let res = await that.login()
        // console.log(res)
        // console.log(e)
        let openid = res.data.openid,
          session_key = res.data.session_key;
        let db_user = await _db.default.queryToUser(openid) //数据库查出来的user
        console.log(db_user)
        if (db_user.data.length != 0) { //如果存在user
          let u = db_user.data[0]
          wx.setStorageSync('userInfo', u)
          that.globalData.userInfo = u
          typeof cb == "function" && cb(u)
          // return db_user
        } else {
          let u = e.detail.userInfo;
          u.openid = openid
          wx.setStorageSync('userInfo', u)
          that.globalData.userInfo = u
          _db.default.insertToUser(u)
          typeof cb == "function" && cb(u)
        }
      }
    } catch (e) {
      console.log(e)
    }
  },
  login: function() {
    let that = this
    let config = {
      loginWXUrl: 'https://api.weixin.qq.com/sns/jscode2session'
    }
    return new Promise(function(resolve, reject) {
      wx.login({
        success: function(res) {
          wx.request({
            url: config.loginWXUrl,
            data: {
              appid: that.globalData.appId,
              secret: that.globalData.secret,
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success: function(res) {
              resolve(res)
            }
          })
        }
      })
    })


  },
  getUserId: function() {
    if (this.isLogin()) {
      return wx.getStorageSync('userInfo')._id
    }
    return null
  },
  globalData: {
    // userInfo: null,
    appId: 'wx70d49114809ab0c1',
    secret: '1c44334068a63d72a56b156d928f586b'
  }
})