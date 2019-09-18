// components/post.js
const db = wx.cloud.database()
const app = getApp()
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    post: {
      type: Object,
      value: {}
    },
  },

  /**
   * 
   * 
   * 组件的初始数据
   */
  data: {
    // isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    more() {
      let that = this
      if (app.isLogin()) {
        if (!that.data.post.alreadyLike) {
          let userId = app.getUser()._id
          that.data.post.likenum++;
          that.data.post.alreadyLike = true
          that.setData({
            post: that.data.post
          })
          const _ = db.command
          let id = that.data.post._id
          let db_post = db.collection('posts').doc(id)
          db_post.update({
            data: {
              likenum: _.inc(1),
              likesArr: _.push(userId)
            },
            success: function(res) {

            }
          })
        }
      } else {
        //弹登录框
        // console.log('请登录')
        wx.navigateTo({
          url: '/pages/login/index',
        })
      }

    },
    detail() {
      // wx.navigateTo({
      //   url: `/pages/community/postDetail?_id=${this.data.post._id}&alreadyLike=${this.data.post.alreadyLike}&alreadyCollect=${this.data.post.alreadyCollect}`,
      // })
      wx.navigateTo({
        url: `/pages/community/postDetail?_id=${this.data.post._id}`
      })
    }
  }
})