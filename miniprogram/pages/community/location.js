var bmap = require('../../utils/bmap-wx.min.js');
let BMap;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    locList: [],
    searchLocList: [],
    city: "",
    selectIndex: -3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    BMap = new bmap.BMapWX({
      ak: 'oxPB7NDWqso2unfVRhhxH6NQ6Xcxw5Gd'
    });
    this.getNowLocation();
    this.getRegeocode()
  },
  select(e) {
    let index = parseInt(e.currentTarget.dataset.index)
    let item = e.currentTarget.dataset.item
    this.setData({
      selectIndex: index
    })
    app.globalData.locationInfo = item
    wx.navigateBack({

    })
  },
  getRegeocode() {
    let that = this
    var fail = function(data) {
      console.log(data)
    };
    var success = function(data) {
      console.log(data)
      let city = data.originalData.result.addressComponent.city;
      let reg = new RegExp("市", "g");
      city = city.replace(reg, "");
      that.setData({
        city: city,
        locList: data.originalData.result.pois
      });

    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
    });
  },
  bindKeyInput: function(event) {
    var that = this;
    if (event.detail === '') {
      that.setData({
        searchLocList: [],
        selectIndex: -3
      })
      return;
    }
    var fail = function(data) {
      console.log(data)
    };
    var success = function(data) {
      console.log(data)
      that.setData({
        searchLocList: data.result,
        selectIndex: -3
      })
    }
    BMap.suggestion({
      query: event.detail,
      region: '苏州',
      city_limit: true,
      fail: fail,
      success: success
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  getNowLocation() {
    let that = this;
    wx.showLoading({
      title: "定位中",
      mask: true
    })
    wx.getLocation({
      type: 'gcj02',
      altitude: true, //高精度定位
      //定位成功，更新定位结果
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        console.log(res)
      },
      //定位失败回调
      fail: function() {
        wx.showToast({
          title: "定位失败",
          icon: "none"
        })
      },
      complete: function() {
        //隐藏定位中信息进度
        wx.hideLoading()
      }

    })
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