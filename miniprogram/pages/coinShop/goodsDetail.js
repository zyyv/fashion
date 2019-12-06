// pages/coinShop/goodsDetail.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodId: '',
    goods: {},
    user: {
      name: '',
      phone: '',
      address: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let goodId = options.goodId
    this.setData({
      goodId
    })
    this.loadGoodsById()
  },
  /** 加载商品 */
  async loadGoodsById() {
    let goodId = this.data.goodId
    let res = await db.collection('shops').doc(goodId).get()
    console.log(res.data)
    this.setData({
      goods: res.data
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})