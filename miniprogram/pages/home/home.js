// pages/home/home.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchDefaultVal: '',
    searchChangeVal: '',
    sliderLeft: 0, //轮播滑块的left值
    newsList: [], //新闻集合
    limit: 10, //每次加载多少条数据,
    skip: 0, //跳过前面多少条数据获取
    continueLoad: true, //继续加载--> 数据是否读取完
    showLoading: false,
    openid: '',
    sliderWidth: 0,
    tabs: [{
        id: 0,
        title: 'Converse',
        img: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/home_tabs/converse_logo.jpg?sign=74b7e1be0be4009a111788d0c6332af9&t=1564970619',
        desc: 'Converse诞生于1908年。创办以来Converse坚持品牌的独立性设计，不追随。集复古、流行、环保于一身的ALL STAR帆布鞋，是美国文化的精神象征，以其随心所欲，更成为追求自我时尚的青年人的忠实拍挡。'
      },
      {
        id: 1,
        title: 'Vans',
        img: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/home_tabs/vans_logo.jpg?sign=0f2aa50fbb35b4e30f538decea7d782e&t=1564970919',
        desc: 'Vans（范斯）是1966年3月16日由保罗·范·多伦创始的原创极限运动潮牌，将生活方式、艺术、音乐和街头时尚文化等注入Vans美学，形成别具个性的青年文化标志，成为年轻极限运动爱好者和潮流人士认同欢迎的世界性品牌！'
      },
      {
        id: 2,
        title: 'Puma',
        img: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/home_tabs/puma_logo.jpg?sign=1f642e9abff69446a7874a624899fcb0&t=1564970932',
        desc: 'PUMA（彪马）是德国运动品牌，提出全新品牌口号Forever Faster，设计提供专业运动装备，产品涉及跑步、足球、高尔夫乃至赛车领域。PUMA集团拥有的品牌PUMA，Cobra高尔夫和Tretorn。'
      },
      {
        id: 3,
        title: 'Nike',
        img: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/home_tabs/nike_logo.jpg?sign=4c42fdfeef3ec0d573ac953bbe2f2994&t=1564970946',
        desc: 'NIKE是全球著名的体育运动品牌，英文原意指希腊胜利女神，中文译为耐克。耐克商标图案是个小钩子。耐克一直将激励全世界的每一位运动员并为其献上最好的产品视为光荣的任务。'
      }
    ],
    lunbo_data: [], //轮播的数据,
    a: 0
  },
  currentChange(e) {
    if (this.data.sliderWidth === 0) {
      wx.createSelectorQuery().select('#slider').boundingClientRect((rect) => {
        this.setData({
          sliderWidth: Math.ceil(rect.width) * 2
        })
      }).exec()
    }
    this.setData({
      sliderLeft: e.detail.current
    })
  },
  searchValueChange(event) {
    this.setData({
      searchChangeVal: event.detail
    })
  },
  btnSearch() {
    // wx.navigateTo({
    //   url: '/pages/index/index',
    // })
    // return
    //搜索按钮点击事件
    if (this.data.searchChangeVal != '') {
      wx.showModal({ //提示
        title: 'Sorry',
        showCancel: false,
        confirmText: '✿◡‿◡',
        content: `您的搜索内容是：${this.data.searchChangeVal} 暂时不支持搜索功能`,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    // this.updateNews()
    // console.log(this.data.searchChangeVal)
  },
  loadLunBo() {
    const db = wx.cloud.database()
    db.collection('Images').where({
      // _openid: this.data.openid,
      type: "lunbo"
    }).get({
      success: res => {
        this.setData({
          lunbo_data: res.data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  loadNews() {
    const db = wx.cloud.database()
    let newsNum = this.data.newsList.length
    if (this.data.skip === 0) {
      db.collection('news').where({
        // _openid: this.data.openid
      }).limit(this.data.limit).orderBy('fbDate', 'desc').get({
        success: res => {
          this.setData({ 
            // newsList: res.data
            newsList: this.data.newsList.concat(res.data)
          })
          // console.log(this.data.newsList)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        },
        complete: () => {
          this.setData({
            showLoading: false
          })
          if (this.data.newsList.length == newsNum) {
            this.setData({
              continueLoad: false
            })
          }
        }
      })
    } else {
      db.collection('news').where({
        // _openid: this.data.openid
      }).skip(this.data.skip).limit(this.data.limit).get({
        success: res => {
          this.setData({
            // newsList: res.data
            newsList: this.data.newsList.concat(res.data)
          })
          console.log(this.data.newsList)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        },
        complete: () => {
          this.setData({
            showLoading: false
          })
          if (this.data.newsList.length == newsNum) {
            this.setData({
              continueLoad: false
            })
          }
        }
      })
    }

  },
  // updateNews() {
  //   const db = wx.cloud.database()
  //   // const _ = db.command
  //   var len = this.data.newsList.length
  //   for (let i = 0; i < len; i++) {
  //     db.collection('news').doc(this.data.newsList[i]._id).update({
  //       data: {
  //         fbDate: new Date(this.data.newsList[i].date)
  //       },
  //       success: function(res) {
  //         console.log(1)
  //       }
  //     })
  //   }
  //   // this.onUpdate()
  //   // .where({
  //   //   _openid: this.data.openid
  //   // }).update({
  //   //   data: {
  //   //     newsId: this.data.a++
  //   //   },
  //   // })

  // },
  /**
   * 跳转帖子详情
   */
  newsDetails(e) {
    var _id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/details?id=' + _id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.onGetOpenid()
    this.loadNews();
    this.loadLunBo();
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
    let newsNum = this.data.newsList.length;
    if (this.data.continueLoad) {
      this.setData({
        showLoading: true,
        skip: newsNum
      })
      setTimeout(() => {
        this.loadNews()
      }, 500)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // onUpdate(){
  //   wx.cloud.callFunction({
  //     name: 'updateNews',
  //     data: {},
  //     success: res => {
  //       console.log("ok")
  //     },
  //     fail: err => {
  //       console.error('[云函数] 调用失败', err)
  //     }
  //   })
  
  // },
  // onGetOpenid: function() {
  //   // 调用云函数
  //   wx.cloud.callFunction({
  //     name: 'login',
  //     data: {},
  //     success: res => {
  //       app.globalData.openid = res.result.openid
  //       this.setData({
  //         openid: app.globalData.openid
  //       })
  //     },
  //     fail: err => {
  //       console.error('[云函数] [login] 调用失败', err)
  //     }
  //   })
  // },
})