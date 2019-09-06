// pages/community/talk.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    talkList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAllTalks()
  },
  getAllTalks() {
    const db = wx.cloud.database()
    let that = this
    db.collection('talks').orderBy('ishot', 'desc').get({
      success: res => {
        that.setData({
          talkList: res.data
        })
        console.log(that.data.newsList)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      },
      complete: () => {
        
      }
    })

  },
  select(e) {
    let item = e.currentTarget.dataset.item;
    app.globalData.talkInfo = item;
    wx.navigateBack({})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})