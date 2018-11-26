//index.js
//获取应用实例
const app = getApp()
const Trequest = require('../../utils/request.js')
Page({
  data: {
    imgUrls: [
      '../../images/banner.png',
      '../../images/banner.png',
      '../../images/banner.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    tabbar: {},
    xiansuo:[],   //线索举报
    serveList:[],    //法律服务
    lunbo: []      //轮播图
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  onLoad: function (options) {
    var that = this;
    // 判断是否登录
    var userInfo = wx.getStorageSync('user_info').data;
    if (!userInfo) {
      wx.redirectTo({
        url: "/pages/logins/logins?id=1"
      });
    } else {
      if (userInfo.type == "0") {
        this.setData({
          userType: '普通用户'
        })
      } else if (userInfo.type == "1") {
        this.setData({
          userType: '院领导'
        })
      }
      this.setData({
        userInfo: userInfo
      })
    }
    //调用app中的函数
    app.changeTabBar();
    // 轮播图
    Trequest({
      url: 'adv/getlist',
      data: {
        type:1
      },
      callback(res){
        that.setData({
          lunbo: res.data.data[0].pics
        })
      }
    })
    // 线索举报
    Trequest({
      url:'Clue_Report_Type/getlist',
      data:{
        parent_id:''
      },
      callback(res){
        that.setData({
          xiansuo: res.data.data.splice(0,3)
        })
      }
    })
    // 法律服务
    Trequest({
      url: 'legal_service/getlist',
      data: {

      },
      callback(res) {
        that.setData({
          serveList: res.data.data
        })
      }
    })
  },
  // 一键拨打电话
  reportPhone: function(){
    wx.makePhoneCall({
      phoneNumber: '07965712000' //Used as an example only, it is not a real phone number
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
