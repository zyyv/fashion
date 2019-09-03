//app.js

const watch = require("./utils/watch.js");
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

    this.globalData = {}
  },
  setWatcher(page) {
    watch.setWatcher(page);
  },
  // 判断是否登录
  isLogin: function() {
    var user = wx.getStorageSync('userInfo')
    if (user) {
      return true
    }
    return false
  },
  globalData: {
    userInfo: null
  }
})