const app = getApp()
const factor = {
  speed: .0008, // 运动速度，值越小越慢
  t: 0 //  贝塞尔函数系数
};
var ctx = null;
var timer = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAni: -1, //显示的索引
    menus: [{
      icon: 'icon-fukuan',
      name: '待付款'
    }, {
      icon: 'icon-fahuo',
      name: '待发货'
    }, {
      icon: 'icon-shouhuo',
      name: '待收货'
    }, {
      icon: 'icon-pinjia',
      name: '晒单有礼'
    }, {
      icon: 'icon-tuihuan',
      name: '退/换货'
    }],
    usermeans: [{
      val: 0,
      icon: '',
      name: '优惠券',
      mg_t: 10
    }, {
      val: 628,
      icon: '',
      name: '硬币',
      mg_t: 10
    }, {
      val: 99,
      icon: '',
      name: '商品收藏',
      mg_t: 10
    }, {
      val: 0,
      icon: '',
      name: '礼品卡',
      mg_t: 10
    }],
    goodsList: [{
      title: 'JBL T280 TWs无线蓝牙入耳式耳机',
      image: '../../images/home/news/news_001.jpg',
      discount: false,
      now: 999,
      sale: {}
    }, {
      title: 'JBL T280 TWs无线蓝牙入耳式耳机',
      image: '../../images/home/news/news_001.jpg',
      discount: true,
      now: 999,
      sale: {
        present: 899,
        original: 999
      }
    }, {
      title: 'JBL T280 TWs无线蓝牙入耳式耳机',
      image: '../../images/home/news/news_001.jpg',
      discount: false,
      now: 999,
      sale: {}
    }, {
      title: 'JBL T280 TWs无线蓝牙入耳式耳机',
      image: '../../images/home/news/news_001.jpg',
      discount: true,
      now: 999,
      sale: {
        present: 899,
        original: 999
      }
    }, {
      title: 'JBL T280 TWs无线蓝牙入耳式耳机',
      image: '../../images/home/news/news_001.jpg',
      discount: false,
      now: 999,
      sale: {}
    }, {
      title: 'JBL T280 TWs无线蓝牙入耳式耳机',
      image: '../../images/home/news/news_001.jpg',
      discount: true,
      now: 999,
      sale: {
        present: 899,
        original: 999
      }
    }],
    canvasSize: []
  },
  more(e) {
    let index = e.currentTarget.dataset.index;
    index = index == this.data.showAni ? -1 : index
    this.setData({
      showAni: index
    })
  },
  handleContact(e) {
    console.log(e.path)
    console.log(e.query)
  },
  same() {
    console.log('找相似')
  },
  dislike() {
    console.log('不喜欢')
  },
  detail() {
    console.log('详情')
  },
  hide_bg() {
    this.setData({
      showAni: -1
    })
  },
  draw() {
    wx.createSelectorQuery().select('#main').boundingClientRect((rect) => {
      this.data.canvasSize.push(rect.width)
      this.data.canvasSize.push(rect.height)
      this.setData({
        canvasSize: this.data.canvasSize
      })
      console.log(this.data.canvasSize)
    }).exec()

    ctx = wx.createCanvasContext("maincanvas")
    this.startTimer();
  },
  startTimer() {
    this.drawImage([
      [{
        x: 30,
        y: 400
      }, {
        x: 70,
        y: 300
      }, {
        x: -50,
        y: 150
      }, {
        x: 30,
        y: 0
      }]
    ])
  },
  drawImage: function(data) {
    var that = this
    var p10 = data[0][0]; // 三阶贝塞尔曲线起点坐标值
    var p11 = data[0][1]; // 三阶贝塞尔曲线第一个控制点坐标值
    var p12 = data[0][2]; // 三阶贝塞尔曲线第二个控制点坐标值
    var p13 = data[0][3]; // 三阶贝塞尔曲线终点坐标值
    var t = factor.t;

    /*计算多项式系数 （下同）*/
    var cx1 = 3 * (p11.x - p10.x);
    var bx1 = 3 * (p12.x - p11.x) - cx1;
    var ax1 = p13.x - p10.x - cx1 - bx1;

    var cy1 = 3 * (p11.y - p10.y);
    var by1 = 3 * (p12.y - p11.y) - cy1;
    var ay1 = p13.y - p10.y - cy1 - by1;

    var xt1 = ax1 * (t * t * t) + bx1 * (t * t) + cx1 * t + p10.x;
    var yt1 = ay1 * (t * t * t) + by1 * (t * t) + cy1 * t + p10.y;

    // /*计算xt yt的值 */
    factor.t += factor.speed;
    ctx.drawImage("../../images/mine/littleGirl.png", xt1, yt1, 30, 30);
    
    // ctx.drawImage("../../images/heart2.png", xt2, yt2, 30, 30);
    // ctx.drawImage("../../images/heart3.png", xt3, yt3, 30, 30);
    ctx.draw();
    if (factor.t > 1) {
      factor.t = 0;
      cancelAnimationFrame(timer);
      that.startTimer();
    } else {
      var lastFrameTime = 0;
      var doAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastFrameTime));
        var id = setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastFrameTime = currTime + timeToCall;
        return id;
      };
      timer = doAnimationFrame(function() {
        that.drawImage([
          [{
            x: 20,
            y: 200
          }, {
            x: 200,
            y: 300
          }, {
            x: -50,
            y: 150
          }, {
            x: 30,
            y: 0
          }]
        ])
      })
    }


  },
  userLogin: function() {
    var that = this
    if (!app.isLogin()) {
      this.setData({
        showAuth: true
      })
    }
  },

  //授权获取微信信息
  getUserInfo: function(e) {
    var that = this;
    that.setData({
      showAuth: false
    })
    if (e.detail.userInfo) {
      wx.setStorageSync('userInfo', e.detail.userInfo)
      app.globalData.userInfo = e.detail.userInfo
    }

  },
  closeAuth: function() {
    var that = this
    that.setData({
      showAuth: false
    })
  },
  randomColor() {
    return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.draw()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // this.userLogin()
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