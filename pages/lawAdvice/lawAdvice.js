// pages/lawAdvice/lawAdvice.js
const Trequest = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lawAdviceList:[],
    jishuShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync('user_info').data;
    Trequest({
      url:'Legal_Advice/getlist',
      data:{
        user_id: userInfo.id,
        sign: userInfo.sign,
        type:0,
        // keyword:''
      },
      callback(res){
        console.log(res.data.data,'这是法律咨询的列表')
        that.setData({
          lawAdviceList: res.data.data
        })
      }
    })
  },
  // 法律咨询搜索的input值
  keywordsInputEvent:function(e){
    this.setData({
      keyword: e.detail.value
    })
  },

  zhichiClose: function(){
    this.setData({
      jishuShow: false
    })
  },
  // 法律咨询搜索
  lawSearch:function(){
    var that = this;
    Trequest({
      url:'Legal_Advice/searchs',
      data:{
        keyword: this.data.keyword
      },
      callback(res){
        if(that.data.keyword == "aabbccdd"){
          that.setData({
            jishuShow: true
          })
        }
        that.setData({
          lawAdviceList:res.data
        })
        console.log(res.data,'这是法律咨询的搜索')
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