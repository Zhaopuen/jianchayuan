// pages/lawAdvicedetail/lawAdvicedetail.js
const Trequest = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    avatarUrl: "",
    casArray: ['民事相关', '经济相关', '刑事行政', '公司相关', '涉外相关','其他相关'],
    regionId:[],
    userName: '',
    mobile: '',
    Gender: 'female',
    casIndex: 0,
    concent:'',     //咨询标题
    phoneValue:'',    //联系方式
    lawContent:'',    //咨询内容
    lawClass:'',     //咨询类别
  },
  bindCasPickerChange: function (e) {
    console.log('乔丹选的是', this.data.casArray[e.detail.value])
    if (e.detail.value == 4) {
      this.setData({ reply: true })
    } else {
      this.setData({ reply: false })
    }
    this.setData({
      casIndex: e.detail.value
    })
  },
  // 咨询类别的值
  casArray: function (e) {
    this.setData({
      casIndex: e.detail.value
    })
  },
  // textarea 咨询标题
  bindTextAreaBlur: function (e) {
    this.setData({
      concent: e.detail.value,
    })
  },
  //咨询内容
  lawAdviceContent: function(e){
    this.setData({
      lawContent: e.detail.value,
    })
  },
  // phone input
  phoneInput: function (e) {
    this.setData({
      phoneValue: e.detail.value,
    })
  },
  // 发表法律咨询
  lawAdvice:function(){
    var that = this;
    var userInfo = wx.getStorageSync('user_info').data;
    if (that.data.phoneValue == ""){
      wx.showToast({
        title: '请输入联系方式！',
      })
      return false
    }else if (that.data.concent == ""){
      wx.showToast({
        title: '标题不能为空！',
      })
      return false;
    } else if (that.data.lawContent == ""){
      wx.showToast({
        title: '内容不能为空！',
      })
      return false;
    } else{
      Trequest({
        url: 'Legal_Advice/add',
        data: {
          user_id: userInfo.id,
          sign: userInfo.sign,
          category_id: that.data.casIndex,
          title: that.data.concent,
          content: that.data.lawContent,
          contact_information: that.data.phoneValue,
          type: 0
        },
        callback(res) {
          if (res.data.msg == "发布咨询成功") {
            wx.redirectTo({
              url: '../lawAdvice/lawAdvice',
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync('user_info').data;
    if (!userInfo) {
      wx.redirectTo({
        url: "/pages/logins/logins?id=1"
      });
    } else {
      this.setData({
        userInfo: userInfo
      })
    }
    Trequest({
      url:'category_consulting/getlist',
      data:{

      },
      callback(res){
        console.log(res,'这是咨询类别')
        var arr = [];
        var arrid = [];
        var len = res.data.data.length;
        for (var i = 0; i < len; i++) {
          arr.push(res.data.data[i].name);
          arrid.push(res.data.data[i].id)
        }
        console.log(arr)
        that.setData({
          casArray: arr,
          regionId: arrid,
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