// pages/news/news.js
const Trequest = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[],
    parent: 1,
    page: 1,
    totalList: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */

  // 新闻动态是1  法律宣传是2
  onLoad: function (options) {
    var that = this;
    if(options.id == 2){
      wx.setNavigationBarTitle({
        title: '法律宣传'
      })
      that.setData({
        parent: 2
      })
    } else if (options.id == 1){
      wx.setNavigationBarTitle({
        title: '新闻动态'
      })
      that.setData({
        parent: 1
      })
    }
    Trequest({
      url:'article/getlist',
      data:{
        legalservice_id: options.id,
      },
      callback(res){
        that.setData({
          newsList: res.data.data,
          totalList: res.data.total
        })
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
    console.log(88888)
    var that = this;
    var arr1 = that.data.newsList,
      arr2 = [];
    that.setData({
      page: 1
    })
    // if (that.data.lawAdviceList.length < that.data.totalList){
    that.data.page++;
    Trequest({
      url: 'clue_report/getlist',
      data: {
        p: that.data.page
      },
      callback(res) {
        console.log("0000000")
        if (res.data.data == "") {
          that.setData({
            report: true
          })
        } else if (that.data.newsList.length < that.data.totalList) {
          that.setData({
            newsList: arr1.concat(res.data.data),
            totalList: res.data.total
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})