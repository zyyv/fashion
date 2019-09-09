// components/post.js
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
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    more() {
      if (this.data.post.islike) {
        this.data.post.likenum++;
        this.data.post.islike = false;
        this.setData({
          isShow: true,
          post: this.data.post
        })
      }
    },
    detail() {
      wx.navigateTo({
        url: `/pages/community/postDetail?_id=${this.data.post._id}`,
      })
    }
  }
})