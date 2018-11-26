// pages/myreport/myreport.js
const Trequest = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,   // tab切换 
    lawAdviceList: [],   //全部
    lawGoneList: [],  //已处理
    lawGoingList: [],  //未处理
    report: false,
    goingreport: false,
    gonereport: false,
    reportSearchvalue: '',   //全部搜索
    reportGoneSearch: '',     //已处理搜索
    reportGoingSearch: '',    //未处理
    
  },

  // 我的举报的搜索  全部
  reportSearchInput: function (e) {
    this.setData({
      reportSearchvalue: e.detail.value
    })
  },
  // 已处理
  reportGoneSearchInput: function (e) {
    this.setData({
      reportGoneSearch: e.detail.value
    })
  },
  // 未处理
  reportGingSearchInput: function (e) {
    this.setData({
      reportGoingSearch: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync('user_info').data;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    // 我的举报
    Trequest({
      url: 'clue_report/getlist',
      data: {
        user_id: userInfo.id,
        sign: userInfo.sign,
        status: ''
      },
      callback(res) {
        if (res.data.data == "") {
          that.setData({
            report: true
          })
        } else {
          that.setData({
            lawAdviceList: res.data.data
          })
        }

      }
    })
    //已处理
    Trequest({
      url: 'clue_report/getlist',
      data: {
        user_id: userInfo.id,
        sign: userInfo.sign,
        status: 1,
      },
      callback(res) {
        if (res.data.data == "") {
          that.setData({
            gonereport: true
          })
        } else {
          that.setData({
            lawGoneList: res.data.data
          })
        }
      }
    })
    // 未处理
    Trequest({
      url: 'clue_report/getlist',
      data: {
        user_id: userInfo.id,
        sign: userInfo.sign,
        status: 0
      },
      callback(res) {
        if (res.data.data == "") {
          that.setData({
            goingreport: true
          })
        }
        that.setData({
          lawGoingList: res.data.data
        })
      }
    })
  },
  // 我的全部举报搜索
  reportSearch: function () {
    var userInfo = wx.getStorageSync('user_info').data;
    var that = this;
    Trequest({
      url: 'clue_report/searchs',
      data: {
        keyword: that.data.reportSearchvalue,
        user_id: userInfo.id
      },
      callback(res) {
        that.setData({
          lawAdviceList: res.data,
        })
      }
    })
  },
  // 我的举报已处理搜索
  reportGoneSearch: function () {
    var userInfo = wx.getStorageSync('user_info').data;
    var that = this;
    Trequest({
      url: 'clue_report/searchs',
      data: {
        keyword: that.data.reportGoneSearch,
        status: 1,
        user_id: userInfo.id
      },
      callback(res) {
        that.setData({
          lawGoneList: res.data,
        })
      }
    })
  },
  // 我的举报未处理搜索
  reportGoingSearch: function () {
    var userInfo = wx.getStorageSync('user_info').data;
    var that = this;
    Trequest({
      url: 'clue_report/searchs',
      data: {
        keyword: that.data.reportGoingSearch,
        status: 0,
        user_id: userInfo.id
      },
      callback(res) {
        that.setData({
          lawGoingList: res.data
        })
      }
    })
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