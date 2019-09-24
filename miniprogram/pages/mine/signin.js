// pages/mine/signin.js
import Toast from '../../libray/dist/toast/toast.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    steps: [{
        text: 'Today',
      },
      {
        text: '10.02',
      },
      {
        text: '10.03',
      },
      {
        text: '10.04',
      }, {
        text: '10.05',
      },
      {
        text: '10.06',
      },
      {
        text: '10.07',
      }
    ],
    active: 5,
    isSign: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  sign() {
    this.setData({
      isSign: true
    })
  },
  goRuler() {
    wx.navigateTo({
      url: '/pages/mine/signRule?from=sign',
    })
  },
  onChange(event) {
    event.detail ? Toast('签到提醒已打开') : Toast('签到提醒已关闭');
    this.setData({
      checked: event.detail
    });
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