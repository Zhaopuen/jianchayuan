// pages/lawAdviceArticle/lawAdviceArticle.js
const Trequest = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lawListTitle:"",   //法律咨询的标题
    lawListTime:'',    //法律咨询的时间
    lawListGuan:'',    //法律咨询的相关
    lawListName:'',    //法律咨询的作者
    lawListContent:'',  //法律咨询的内容
    lawListReply:'',   //法律咨询的回复
    noReply:false,        //暂无回复
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id,'这是列表的id')
    Trequest({
      url:'legal_advice/details',
      data:{
        id: options.id,
        type:0
      },
      callback(res){
        console.log(res.data.data);
        if (res.data.data.replycontent == ""){
          that.setData({
            noReply:true
          })
        }
        that.setData({
          lawListTitle:res.data.data.title,
          lawListTime: res.data.data.create_time,
          lawListGuan: res.data.data.name,
          lawListName: res.data.data.nickname,
          lawListContent: res.data.data.content,
          lawListReply: res.data.data.replycontent
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})