wx.cloud.init()
const db = wx.cloud.database()
let _db = {
  insertToUser: function(userInfo) {
    db.collection('users').add({
      // data 字段表示需新增的 JSON 数据
      data: userInfo
    }).then(res => {
      console.log(res)
    })
  },
  queryToUser: function(openid) {
    return db.collection('users').where({
      _openid: openid
    }).get()
  }
}
export default _db;