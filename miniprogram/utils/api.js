
const appid = '20221103001434862'
const key = 'XAloas9aHZVbNqDSF2bh'
const from='en'
const to='zh'
var utilMd5 = require('../utils/md5');  
    // var password = utilMd5.hexMD5(salt); 
function translate(q) {
  return new Promise((resolve, reject) => {
    let salt = Date.now()
    let sign = utilMd5.hexMD5(`${appid}${q}${salt}${key}`)
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: {
        q,
        from,
        to,
        appid,
        salt,
        sign
      },
      success(res) {
        if (res.data && res.data.trans_result) {
          resolve(res.data)
          wx.setStorageSync('transfail', "b")
        } else {
          reject({ status: 'error', msg: '翻译失败' })
          wx.showToast({
            title: '翻译失败',
            icon: 'none',
            duration: 3000
          })
          wx.setStorageSync('transfail', "a")
        }
      },
      fail() {
        reject({ status: 'error', msg: '翻译失败' })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 3000
        })
        wx.setStorageSync('transfail', "a")
      }
    })
  })
}
module.exports.translate = translate
