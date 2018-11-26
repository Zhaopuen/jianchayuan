// pages/usertype/usertype.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { value: 'putong', name: '普通用户',checked:true},
      { value: 'guanli', name: '管理员', checked: false},
      { value: 'leader', name: '院领导', checked: false},
    ],
    checkedList:["普通用户","管理员","院领导"],
    checkArr: ['普通用户'],
    checked: false
  },

  checkboxChange: function (e) {
    console.log("11111111")
    var checked = false;
    this.setData({
      checked: !this.checked
    })
    // this.checked = !this.checked;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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