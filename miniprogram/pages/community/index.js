// pages/community/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fabu: {
      right: 0,
      opacity: 1
    },
    followPosts: [{
        src: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/imgs/9.jpg?sign=92e07b71e512f6997ea2d02f2b2e5e3a&t=1567141390',
        title: 'today is beautiful day,the weather is so cool,nice,^_^',
        userface: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/404.gif?sign=3dc24b5d7b8f0022d9d7970127f7c395&t=1567131183',
        username: 'hsdasd',
        islike: true, //是否能点赞
        like: 32,
        postid: '123123'
      },
      {
        src: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/imgs/5.jpg?sign=5eafef8f54204354d7d3aeca03612b7c&t=1567141275',
        title: 'today is beautiful day,the weather is so cool,nice,^_^',
        userface: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/404.gif?sign=3dc24b5d7b8f0022d9d7970127f7c395&t=1567131183',
        username: 'hh12ah',
        islike: true, //是否能点赞
        like: 659,
        postid: '123123'
      }, {
        src: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/imgs/0.jpg?sign=c903b58ab60dca32f9093f57eb1ff2d5&t=1567141320',
        title: 'today is beautiful day,the weather is so cool,nice,^_^',
        userface: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/404.gif?sign=3dc24b5d7b8f0022d9d7970127f7c395&t=1567131183',
        username: 'hdfsdhah',
        islike: true, //是否能点赞
        like: 549,
        postid: '123123'
      }, {
        src: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/imgs/1.jpg?sign=c5e154c2af43539fd8db6fea9d9b9669&t=1567141332',
        title: 'today is beautiful day,the weather is so cool,nice,^_^',
        userface: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/404.gif?sign=3dc24b5d7b8f0022d9d7970127f7c395&t=1567131183',
        username: 'bcvbhhah',
        islike: true, //是否能点赞
        like: 129,
        postid: '123123'
      }, {
        src: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/imgs/3.jpg?sign=9e1cd8bba2b322d8e21a3db5ae36a308&t=1567141343',
        title: 'today is beautiful day,the weather is so cool,nice,^_^',
        userface: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/404.gif?sign=3dc24b5d7b8f0022d9d7970127f7c395&t=1567131183',
        username: 'hsdfsdfhah',
        islike: true, //是否能点赞
        like: 159,
        postid: '123123'
      }, {
        src: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/imgs/6.jpg?sign=1cfffa3122c34ffa7e5775e68e2267df&t=1567141353',
        title: 'today is beautiful day,the weather is so cool,nice,^_^',
        userface: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/404.gif?sign=3dc24b5d7b8f0022d9d7970127f7c395&t=1567131183',
        username: 'hwerwehah',
        islike: true, //是否能点赞
        like: 539,
        postid: '123123'
      }, {
        src: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/imgs/7.jpg?sign=9867ab8e3e0b213135da5ed7d96cf9c9&t=1567141364',
        title: 'today is beautiful day,the weather is so cool,nice,^_^',
        userface: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/404.gif?sign=3dc24b5d7b8f0022d9d7970127f7c395&t=1567131183',
        username: 'hh31232ah',
        islike: true, //是否能点赞
        like: 519,
        postid: '123123'
      }, {
        src: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/imgs/8.jpg?sign=eecc2ce7a494c6e88ec7fe703b3f37f0&t=1567141376',
        title: 'today is beautiful day,the weather is so cool,nice,^_^',
        userface: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/404.gif?sign=3dc24b5d7b8f0022d9d7970127f7c395&t=1567131183',
        username: 'hhah',
        islike: true, //是否能点赞
        like: 59,
        postid: '123123'
      }, {
        src: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/imgs/9.jpg?sign=92e07b71e512f6997ea2d02f2b2e5e3a&t=1567141390',
        title: 'today is beautiful day,the weather is so cool,nice,^_^',
        userface: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/404.gif?sign=3dc24b5d7b8f0022d9d7970127f7c395&t=1567131183',
        username: 'hsdasd',
        islike: true, //是否能点赞
        like: 32,
        postid: '123123'
      }
    ],
    state: {
      scrollTop: null,
      scrollIng: null
    },
    scrollTimer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getApp().setWatcher(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // this.popup = this.selectComponent("#popup");
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

  },
  release(){
    wx.navigateTo({
      url: '/pages/community/release',
    })
  },
  onPageScroll(e) {
    this.data.fabu = {
      right: -58,
      opacity: .5
    }
    this.data.state = {
      scrollTop: e.scrollTop,
      scrollIng: true
    }
    this.setData({
      fabu: this.data.fabu,
      state: this.data.state
    })
    if (this.data.scrollTimer) {
      console.log('11')
      clearTimeout(this.data.scrollTimer)
    }
    this.data.scrollTimer = setTimeout(() => {
      if (this.data.state.scrollTop === e.scrollTop) {
        this.data.state = {
          scrollTop: e.scrollTop,
          scrollIng: false
        }
        this.data.fabu = {
          right: 0,
          opacity: 1
        }
        this.setData({
          fabu: this.data.fabu,
          state: this.data.state,
          scrollTimer: this.data.scrollTimer
        })
        clearTimeout(this.data.scrollTimer)
      }
    }, 300)
  },
  watch: {
    
  }
})