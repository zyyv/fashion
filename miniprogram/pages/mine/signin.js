// pages/mine/signin.js
import Toast from '../../libray/dist/toast/toast.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    steps: [],
    active: -1,
    isSign: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let weekArr = this.getFurtureDay()
    let steps = weekArr.map(item => {
      return {
        text: item
      }
    })
    this.setData({
      steps
    })
  },
  /** 
   * 返回未来一周的时间
   */
  getFurtureDay() {
    var result = [];
    var now = new Date();
    result.push(this.getMonthDay(now));
    for (var i = 0; i < 6; i++) {
      now.setDate(now.getDate() + 1);
      result.push(this.getMonthDay(now))
    }
    return result
  },
  getMonthDay(date) {
    return (date.getMonth() + 1) + '.' + date.getDate();
  },
  sign() {
    if (app.isLogin()) {
      Toast.success('签到成功');
      this.setData({
        isSign: true,
        active: 0
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
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