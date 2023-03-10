// pages/seek/seek.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post:false,
    array: ['小营校区', '健翔桥校区', '清河校区', '沙河校区'],
    index: 0,
    ifChoose:false,
    nowDate:'',
    // remenberCampus:0,

    totalData:[],
    allDayData:[],
    amData:[],
    pmData:[],
    eveData:[],
    
   
    campusChoose:'',
    dayChoose:'',
    timeChoose:'',



    
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
     index: e.detail.value
    })
    },
  
    checkboxChange: function (e) {
      var that = this;
      let checkboxValues=null;
      let checkboxItems = this.data.days, values = e.detail.value
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        if(checkboxItems[i].value==values[values.length-1]){
          checkboxItems[i].checked=true;
          checkboxValues = checkboxItems[i].value;
        }
        else{
          checkboxItems[i].checked = false;
        }
      }
      console.log(checkboxValues)
      that.setData({ checkboxItems, checkboxValues })
    },

    formSubmit: function (e) {
      console.log('form发生了submit事件，携带数据为：', e);
      this.setData({
        // index:e.detail.value.campusChoose,
        dayChoose:e.detail.value.dayChoose,
        timeChoose:e.detail.value.timeChoose,
        ifChoose:true,
        totalData:[],
        allDayData:[],
        amData:[],
        pmData:[],
        eveData:[],
      })
      
      
      wx.setStorage({
        
        data: {chooseCampus:e.detail.value.campusChoose},//需要存储的内容。只支持原生类型、Date、及能够通过JSON.stringify序列化的对象。
        key: 'campusChoose',//本地缓存中指定的 key
      })

      const that=this
      wx.getStorageSync({
        key: 'campusChoose',
        success(res){
          console.log(res);
          that.setData({
            index:res.data.chooseCampus
          })
        }
      })

      if (e.detail.value.campusChoose==0) {
        this.setData({
          ifChoose:false
        })
      }
      let dataTime
      // let yy = new Date().getFullYear()
      let mm = new Date().getMonth()+1
      let dd = new Date().getDate()
      // dataTime = `${yy}-${mm}-${dd}`;
      // console.log(dd)

      var num=parseInt(e.detail.value.dayChoose)
      var monDay=this.getDateStr(null,num)
      console.log(monDay)
      var campus=parseInt(this.data.index)+1
      var urlStr="https://unmeta.cn/"+campus+"/"+campus+monDay+".json"
      wx.request({
        url:"",
        url: urlStr,
        method:'GET',
        success:(res)=>{
          let returnData=res.data
            this.setData({
              totalData:returnData,
            })
            var target=0;
            const that=this;
            returnData.forEach(function(item, index){
              // console.log(item)
              if(item.d=="0"||item.d=="1"||item.d=="2"||item.d=="3"){
                target++;
              }
              if(target==1){
                that.setData({
                  allDayData:that.data.allDayData.concat(item)
                })
              }
              if(target==2){
                that.setData({
                  amData:that.data.amData.concat(item)
                })
              }
              if(target==3){
                that.setData({
                  pmData:that.data.pmData.concat(item)
                })
              }
              if(target==4){
                that.setData({
                  eveData:that.data.eveData.concat(item)
                })
              }
            })
            console.log(that.data.allDayData)
        },
        false:(fa)=>{
          console.log("获取失败")
        }
      })
      


    },

    //获取日期
    getDateStr: function(today, addDayCount) {
      var date;
      if(today) {
        date = new Date(today);
      }else{
        date = new Date();
      }
      date.setDate(date.getDate() + addDayCount);//获取AddDayCount天后的日期 
        var y = date.getFullYear();
        var m = date.getMonth() + 1;//获取当前月份的日期 
        var d = date.getDate();
        var currentDate=date.getDay();//获取存储当前日期
        var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        console.log("今天是：" + weekday[currentDate]);
        
        var theData=m+"月"+d+"日"+"("+weekday[currentDate]+")"
        this.setData({
          nowDate:theData
        })
        console.log( m + "-" + d)
        return   m + "" + d;
      },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    //获取明天
    that.getDateStr(null,0)
    console.log("到过这了！")
    wx.getStorage({
      key: 'campusChoose',
      success(res){
        console.log(res);
        that.setData({
          index:res.data.chooseCampus
        })
        if(that.data.index==null){
          that.setData({
            index:1
          })
        }
      }
    })
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

  }
})