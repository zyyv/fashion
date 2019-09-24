Page({

  /**
   * 页面的初始数据
   */
  data: {
    isReward: false,
    isAdvise: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.from == "advise") {
      wx.setNavigationBarTitle({
        title: '意见反馈',
      })
      this.setData({
        isAdvise: true
      })
    }
    if (options.from == "reward") {
      wx.setNavigationBarTitle({
        title: '打赏',
      })
      this.setData({
        isReward: true
      })
    }
  },
  previewImage: function(e) {
    let current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: [current]
    })
  },

  textPaste(e) {
    let data = e.currentTarget.dataset.num
    wx.setClipboardData({
      data: data,
      success: function(res) {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
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

  }
})