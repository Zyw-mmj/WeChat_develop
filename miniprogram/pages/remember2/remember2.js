// pages/remember2/remember2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    english:"",
    symble:"",
    chinese:"",
    id:"",
    cate:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _id=options.id
    var _cate=options.cate
    console.log(_cate+"0000")
    console.log(_id+"0000")
    if(_cate=="四级单词"){
      const db=wx.cloud.database().collection("fourT")
    const That=this;
    db.where({
      "_id":_id
    }).get({
      success:function(res){
        wx.setStorageSync("Chinese", res.data[0].Chinese)
        wx.setStorageSync("English", res.data[0].English)
        wx.setStorageSync("symble", res.data[0].symble)
        wx.setStorageSync("-id", res.data[0]._id)
        var Chinese= wx.getStorageSync("Chinese")
        var English= wx.getStorageSync("English")
        var symble= wx.getStorageSync("symble")
        var id= wx.getStorageSync("-id")
        console.log(Chinese)
        That.setData({
          english: English,//数据存储到data里的
          symble: symble,
          chinese: Chinese,
          id:id,
          cate:"四级单词"
        });
      },
      false:function(fa){
        console.log("失败")
      }
    })
    }else{
      const db=wx.cloud.database().collection("sixT")
    const That=this;
    db.where({
      "_id":_id
    }).get({
      success:function(res){
        wx.setStorageSync("Chinese", res.data[0].Chinese)
        wx.setStorageSync("English", res.data[0].English)
        wx.setStorageSync("symble", res.data[0].symble)
        wx.setStorageSync("-id", res.data[0]._id)
        var Chinese= wx.getStorageSync("Chinese")
        var English= wx.getStorageSync("English")
        var symble= wx.getStorageSync("symble")
        var id= wx.getStorageSync("-id")
        console.log(Chinese)
        That.setData({
          english: English,//数据存储到data里的
          symble: symble,
          chinese: Chinese,
          id:id,
          cate:"六级单词"
        });
      },
      false:function(fa){
        console.log("失败")
      }
    })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  back:function(){
    wx.navigateBack({
      delta: 0,
    })
  },

  remove:function(e){
    var opid =wx.getStorageSync('openid')
    var id=e.target.dataset.val;
    var cate=e.target.dataset.cate;
    const db=wx.cloud.database()
    db.collection('wordlist').where({
      id:id ,
      _openid:opid,
      category:cate
    }).remove({
      success: function(res) {
      }
    })
    wx.navigateBack({
      delta: 0,
    })
  },
})