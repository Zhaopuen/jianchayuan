// pages/myLawadvice/myLawadvice.js
const Trequest = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    userInfo:'',
    lawAdviceList: [],   //已处理
    lawAllList:[],       //全部
    lawweiList:[],        //未处理
    report: false,        //已处理
    goingreport: false,    //全部
    gonereport: false,      //未处理
    reportSearchvalue:'',   //搜索  全部
    reportGones: '',   //已处理
    reportGoing:' ',      //未处理
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync('user_info').data;
    // 判断是否登录
    if (!userInfo) {
      wx.redirectTo({
        url: "/pages/logins/logins?id=1"
      });
    } else {
      this.setData({
        userInfo: userInfo
      })
    }
    //已处理
    Trequest({
      url:'Legal_Advice/getlist',
      data:{
        user_id: userInfo.id,
        sign:userInfo.sign,
        handle:0
      },
      callback(res){
        if(res.data.data == ""){
          that.setData({
            report:true
          })
        }
        that.setData({
          lawAdviceList:res.data.data
        })
        console.log(res.data.data,'这是我的咨询')
      }
    })
    //全部
    Trequest({
      url: 'Legal_Advice/getlist',
      data: {
        user_id: userInfo.id,
        sign: userInfo.sign,
        handle: ""
      },
      callback(res) {
        if (res.data.data == "") {
          that.setData({
            goingreport: true
          })
        }
        that.setData({
          lawAllList: res.data.data
        })
        console.log(res.data.data, '这是我的咨询')
      }
    })
    // 未处理
    Trequest({
      url: 'Legal_Advice/getlist',
      data: {
        user_id: userInfo.id,
        sign: userInfo.sign,
        handle: 1
      },
      callback(res) {
        if(res.data.data == ""){
          gonereport:true
        }
        that.setData({
          lawweiList: res.data.data
        })
        console.log(res.data.data, '这是我的咨询')
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },

  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // 我的咨询搜索  全部
  reportSearchInput: function (e) {
    this.setData({
      reportSearchvalue: e.detail.value
    })
  },
  
  // 我的咨询搜索   已处理
  reportGoneSearchInput: function(e) {
    this.setData({
      reportGones: e.detail.value
    })
  },

  // 我的咨询搜索  未处理
  reportGoingSearchInput: function (e) {
    this.setData({
      reportGoing: e.detail.value
    })
  },
  reportSearch: function () {
    var that = this;
    Trequest({
      url: 'Legal_Advice/searchs',
      data: {
        keyword: that.data.reportSearchvalue
      },
      callback(res) {
        console.log(res.data, '888888')
        that.setData({
          lawAllList: res.data
        })
      }
    })
  },
  // 我的咨询已处理搜索
  reportGoneSearch: function () {
    var that = this;
    Trequest({
      url: 'Legal_Advice/searchs',
      data: {
        keyword: that.data.reportGones,
        status: 1
      },
      callback(res) {
        console.log(res.data, '888888')
        that.setData({
          lawAdviceList: res.data,
        })
      }
    })
  },
  // 我的咨询未处理搜索
  reportGoingSearch: function () {
    var that = this;
    Trequest({
      url: 'Legal_Advice/searchs',
      data: {
        keyword: that.data.reportGoing,
        status: 0
      },
      callback(res) {
        console.log(res.data, '888888')
        if(res.data == ""){
          that.setData({
            gonereport: true
          })
        }else{
          that.setData({
            lawweiList: res.data,
            gonereport: false
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})