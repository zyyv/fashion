const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const db = cloud.database()
  const _ = db.command
  exports.main = async(event, context) => {
    try {
      db.collection('news')
        .update({
          data: {
            testdate: new Date()
          },
        })
    } catch (e) {
      console.error(e)
    }
  }
}