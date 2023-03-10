// pages/home/home.js

import { translate } from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // let salt = "2015063000000001apple143566028812345678"
    // console.log(salt)
    // var utilMd5 = require('../../utils/md5.js');  
    // var password = utilMd5.hexMD5(salt); 
    // console.log(password)
    // translate("apple").then(res =>{
    //   console.log(res)
    // })
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

  goSeek:function(){
    wx.navigateTo({
      url: '/pages/seek/seek',
    })
  },

  goRemember:function(){
    wx.navigateTo({
      url: '/pages/remember/remember',
    }) 
  }
  
})