// pages/mySuggest/mySuggest.js
const Trequest = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fankui: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync('user_info').data;
    Trequest({
      url:'feedback/getlist',
      data:{
        user_id: userInfo.id,
        sign: userInfo.sign,
      },
      callback(res){
        console.log(res.data,'8888')
        that.setData({
          fankui:res.data.data
        })
        console.log(that.data.fankui,'这是反馈意见的列表')
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