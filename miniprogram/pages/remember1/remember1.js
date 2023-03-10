// pages/remember1/remember1.js
Page({
  // var list = require("../../data/word-list");
  /**
   * 页面的初始数据
   */
  data: {
    english:"",
    symble:"",
    chinese:"",
    show:false,
    title:"",
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var title = options.title
    if (title=="四级单词") {
      wx.setNavigationBarTitle({
        title: title,
      })
    const db=wx.cloud.database().collection("fourT")
    const that=this;
    var id = (String)(Math.floor(Math.random() * 100) + 1);
    db.where({
      "_id":id
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
        that.setData({
          english: English,//数据存储到data里的
          symble: symble,
          chinese: Chinese,
          show: false,
          title: title,
          id:id
        });
      },
      false:function(fa){
        console.log("失败")
      }
    })
    }else{
      wx.setNavigationBarTitle({
        title: title,
      })
    const db=wx.cloud.database().collection("sixT")
    const that=this;
    var id = (String)(Math.floor(Math.random() * 100) + 1);
    db.where({
      "_id":id
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
        that.setData({
          english: English,//数据存储到data里的
          symble: symble,
          chinese: Chinese,
          show: false,
          title: title,
          id:id
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
  show: function () {
    this.setData({
      show: true
    })
    const db=wx.cloud.database()
    db.collection('wordlist').add({
      data:{
        English:this.data.english,//调用上面data里的数据
        Chinese:this.data.chinese,
        symble:this.data.symble,
        id:this.data.id,
        category:this.data.title
      }
    }).then(res=>{})

  },
  next: function () {
    var data = {
      title: this.data.title
    }
    this.onLoad(data);
  },
  back:function(){
    wx.navigateBack({
      delta: 0,
    })
  }
})