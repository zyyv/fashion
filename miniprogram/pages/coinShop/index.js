// pages/coinShop/index.js
import Toast from '../../libray/dist/toast/toast.js';
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },
  goodsDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/coinShop/goodsDetail?goodId=' + id,
    })
  },
  /**
   * 获取硬币
   */
  getCoins() {
    wx.navigateTo({
      url: '/pages/mine/signin'
    })
  },
  coinsDetail() {
    wx.navigateTo({
      url: '/pages/mine/signin'
    })
  },
  /** 
   * 加载所有的商品
   */
  loadAllShops() {
    let that = this
    db.collection('shops')
      .get({
        success: function(res) {
          let goods = res.data
          that.setData({
            goods: goods
          })
          console.log(goods)
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
    this.loadAllShops()
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