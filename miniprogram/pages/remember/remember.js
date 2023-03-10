// pages/remember/remember.js

import { translate } from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: 0,
    tab: 0,
    q:"",
    tran:"",
    temp:0,
    transfail:""
  },
  changeTab: function(e) {
    this.setData({
      tab: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    wx.cloud.callFunction({
      name:"getOpenId",
      success(res){
        console.log(res.result.openid)
        wx.setStorageSync('openid', res.result.openid)
      }
    })
    var opid =wx.getStorageSync('openid')
    console.log(opid)
    let that = this
    const db=wx.cloud.database()
    db.collection('wordlist').where({
      _openid:opid
    }).get().then(res => {
      that.setData({
        DataList:res.data
      })
    })

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
  changeItem: function(e) {
    this.setData({
      item: e.target.dataset.item,
    })
  },

  clickFirst: function () {
    wx.navigateTo({
      url: '/pages/remember1/remember1?title=四级单词',
    })
  },
  clickScond: function () {
    wx.navigateTo({
      url: '/pages/remember1/remember1?title=六级单词',
    })
  },

  transfer(e){
    // console.log(e)
    var id=e.target.dataset.val;
    var category=e.target.dataset.cate
    console.log(id)
    console.log(category)
    wx.navigateTo({
      url: '/pages/remember2/remember2?id='+id+'&cate='+category,
    })

  },
  shurudanci: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e);
    var danci=e.detail.value.danci
    if(danci!=""){
      this.setData({
        q:danci,
        temp:1
      })
      translate(danci).then(res =>{
        console.log(res)
        wx.setStorageSync('tran', res.trans_result[0].dst)
        var tran=wx.getStorageSync('tran')
        var transfail=wx.getStorageSync('transfail')
        this.setData({
            tran:tran,
            transfail:transfail
        })
      })
    }else{
      wx.showToast({
        title: '请输入内容！',
        icon: 'none',
        duration: 3000
      })
    }
    
    
  }
  
})