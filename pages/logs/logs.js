const Trequest = require('../../utils/request.js')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabbar: {},
    userType:'',
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // 我的举报跳转
  report: function(){
    var that = this;
    if (that.data.userType == "普通用户"){
      wx.navigateTo({
        url: '/pages/myreport/myreport',
      })
    } else if (that.data.userType == "线索管理员"){
      wx.navigateTo({
        url: '/pages/xiansuolist/xiansuolist',
      })
    }else if (that.data.userType == "院领导"){
      wx.navigateTo({
        url: '/pages/myreportnew/myreportnew',
      })
    }
  },
  
  onLoad: function () {
    var userInfo = wx.getStorageSync('user_info').data;
    var that = this;
    // 判断是否登录
    // wx.redirectTo({
    //     url: "/pages/logins/logins?id=1"
    // });
    Trequest({
      url:'user/detail',
      data:{
        user_id: userInfo.id,
        sign: userInfo.sign,
      },
      callback(res){
        console.log(res.data.data,'mmmmmmmmm');
        if (res.data.data.type == "0") {
          that.setData({
            userType: '普通用户'
          })
        } else if (res.data.data.type == "1") {
          that.setData({
            userType: '线索管理员'
          })
        } else if (res.data.data.type == "2") {
          that.setData({
            userType: '院领导'
          })
        }
        that.setData({
          userInfo: res.data.data
        })
      }

    })
    
    // if (!userInfo) {
    //   wx.redirectTo({
    //     url: "/pages/logins/logins?id=1"
    //   });
    // } else {
     
      
    // }
    app.changeTabBar();
  },
})
