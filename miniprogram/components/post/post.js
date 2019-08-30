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
      value: {
        src: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/404.gif?sign=3dc24b5d7b8f0022d9d7970127f7c395&t=1567131183',
        title: 'sorry,this is a error',
        userface: 'https://6761-garbage-zy-jfq6e-1259641361.tcb.qcloud.la/404.gif?sign=3dc24b5d7b8f0022d9d7970127f7c395&t=1567131183',
        username: 'error',
        islike: true, //是否能点赞
        like: 0
      }
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
        this.data.post.like++;
        this.data.post.islike = false;
        this.setData({
          isShow: true,
          post: this.data.post
        })
      }
    },

  }
})