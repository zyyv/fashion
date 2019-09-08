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
  },
  setWatcher(page) {
    watch.setWatcher(page);
  },
  // 判断是否登录
  isLogin: function() {
    var user = wx.getStorageSync('userInfo')
    return user ? true : false
  },
  getUser(){
    var user = wx.getStorageSync('userInfo')
    return user
  },
  login: function() {
    let that = this
    let config = {
      loginWXUrl: 'https://api.weixin.qq.com/sns/jscode2session'
    }
    wx.login({
      success: function(res) {
        wx.getSetting({
          success(setRes) {
            // 判断是否已授权  
            // debugger
            if (!setRes.authSetting['scope.userInfo']) {
              // 授权访问  
              // console.log(1)
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  //获取用户信息
                  wx.getUserInfo({
                    lang: "zh_CN",
                    success: function(userRes) {
                      //发起网络请求  
                      wx.request({
                        url: config.loginWXUrl,
                        data: {
                          code: res.code,
                          encryptedData: userRes.encryptedData,
                          iv: userRes.iv
                        },
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: 'POST',
                        //服务端的回掉  
                        success: function(result) {
                          var data = result.data.result;
                          data.expireTime = nowDate + EXPIRETIME;
                          wx.setStorageSync("userInfo", data);
                          this.globalData.userInfo = data;
                        }
                      })
                    }
                  })
                },
                fail(){
                  console.log('error')
                }
              })
            } else {
              //获取用户信息  
              wx.getUserInfo({
                lang: "zh_CN",
                success: function(userRes) {
                  //发起网络请求  
                  wx.request({
                    url: config.loginWXUrl,
                    data: {
                      code: res.code,
                      encryptedData: userRes.encryptedData,
                      iv: userRes.iv
                    },
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: 'POST',
                    success: function(result) {
                      var data = result.data.result;
                      data.expireTime = nowDate + EXPIRETIME;
                      wx.setStorageSync("userInfo", data);
                      this.globalData.userInfo = data;
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  },
  getUserId: function() {
    if (this.isLogin()) {
      return wx.getStorageSync('userInfo')._id
    }
    return null
  },
  globalData: {
    userInfo: null
  }
})