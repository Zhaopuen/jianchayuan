// pages/newsDetail/newsDetail.js
const Trequest = require('../../utils/request.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailTitle:'',
    detailContent:'',
    detailPic:'',
    detailTime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.parent,'kkkkk')
    if (options.parent == 2) {
      wx.setNavigationBarTitle({
        title: '法律宣传'
      })
    } else if (options.parent == 1) {
      wx.setNavigationBarTitle({
        title: '动态详情'
      })
    }
    Trequest({
      url:'article/detail',
      data:{
        id: options.id
      },
      callback(res){
        WxParse.wxParse('article', 'html', res.data.content, that, 5);
        that.setData({
          detailTitle:res.data.title,
          // detailContent:res.data.content,
          detailPic:res.data.pic,
          detailTime: res.data.create_time
        })
        console.log(res.data)
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