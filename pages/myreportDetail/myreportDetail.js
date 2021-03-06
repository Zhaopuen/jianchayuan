// pages/myreportDetail/myreportDetail.js
const Trequest = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '1', value: '是', checked: false},
      { name: '2', value: '否', checked: false},
    ],
    question: [
      { name: '1', value: '是', checked: false },
      { name: '2', value: '否', checked: false },
    ],
    reply: [
      { name: '1', value: '满意', checked: false },
      { name: '2', value: '一般', checked: false },
      { name: '3', value: '不满意', checked: false },
    ],
    lawListTitle: "",   //法律咨询的标题
    lawListTime: '',    //法律咨询的时间
    lawListGuan: '',    //法律咨询的相关
    lawListName: '',    //法律咨询的作者
    lawListContent: '',  //法律咨询的内容
    lawListReply: '',   //法律咨询的回复
    lawListReplyTime: '',
    lawListAdress: '',    //法律咨询的地址
    noReply: false,        //暂无回复
    applyId:'',
    radioStr:'',     //是否及时联系
    radioQ:'',       //是否解决问题
    radioA:'',      //答案是否满意
    redioButton:true,   //满意度评价的提交按钮
    radioApply: false,   //满意度评价显示隐藏
    manyi: "",      //判断是否评价
  },

  // 是否及时联系
  radioChange: function (e) {
    for (var i = 0; i < this.data.items.length;i++){
      var str = "";
      if (this.data.items[i].name = e.detail.value){
        str = this.data.items[i].name;
      }
    }
    this.setData({ 
      radioStr: str,
    });
  },

  // 是否解决问题
  radioQuestion:function(e){
    for (var i = 0; i < this.data.question.length; i++) {
      var strq = "";
      if (this.data.question[i].name = e.detail.value) {
        strq = this.data.question[i].name;
      }
    }
    this.setData({
      radioQ: strq,
      manyi:e.detail.value
    });
    console.log(this.data.radioQ,'8chdijvhcduj')
  },

  // 答案是否满意
  radioAnswer: function(e){
    for (var i = 0; i < this.data.reply.length; i++) {
      var stra = "";
      if (this.data.reply[i].name = e.detail.value) {
        stra = this.data.reply[i].name;
      }
    }
    this.setData({
      radioA: stra,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      applyId: options.id
    })
    Trequest({
      url:'clue_report/details',
      data:{
        id:options.id
      },
      callback(res){
        console.log(res.data.data)
        if (res.data.data.replycontent == ""){
          that.setData({
            radioApply:false
          })
        }else{
          that.setData({
            radioApply: true
          })
        }
        if (res.data.data.whether == 1){
          that.setData({
            redioButton: false
          })
        } else if (res.data.data.whether == 0){
          that.setData({
            redioButton: true
          })
        }
        if (res.data.status == 1) {
          let promptreply = res.data.data.promptreply;  //是否及时联系
          let items = that.data.items;
          let stp = res.data.data.stp;   //是否解决问题
          let question = that.data.question;
          let lssatisfied = res.data.data.lssatisfied;  //答案是否满意
          let reply = that.data.reply;
          items.forEach(function (item, index) {
            if (res.data.data.whether == 1){
              if (promptreply == item.name) {
                console.log(promptreply, item.name, '这是是否及时联系吧')
                items[index].checked = true;
              } 
            } else if (res.data.data.whether == 0){
              if (promptreply == 0) {
                items[index].checked = false;
              }
            }
          })
          question.forEach(function (item, index) {
            if (res.data.data.whether == 1){
              if (stp == item.name) {
                question[index].checked = true;
              }
            }else if (stp == 0){
              question[0].checked = false;
            }
          })
          reply.forEach(function (item, index) {
            if (res.data.data.whether == 1) {
              if (lssatisfied == item.name) {
                reply[index].checked = true;
              } 
            }else if (lssatisfied == 0){
              reply[index].checked = false;
            }
          })
          that.setData({
            reply: reply,
            items: items,
            question: question,
          })
        }
        that.setData({
          lawListTitle: res.data.data.name,
          lawListTime: res.data.data.create_time,
          lawListContent: res.data.data.details_content,
          lawListReply: res.data.data.replycontent,
          lawListReplyTime: res.data.data.update_time,
          lawListAdress: res.data.data.address
        })
        
      }
    })
  },

  // 满意度评价
  ifAgreen:function(){
    var that = this;
    console.log(that.data.radioA,'满意度44444')
    if (that.data.radioStr == "" || that.data.radioQ == "" || that.data.radioA==""){
      wx.showToast({
        title: '请选择满意度',
      })
      return
    }
    Trequest({
      url:'Legal_Advice/satisfaction',
      data:{
        id: that.data.applyId,
        promptreply: that.data.radioStr,
        stp: that.data.radioQ,
        lssatisfied: that.data.radioA
      },
      callback(res){
        console.log(res.data,'8888888')
        if(res.data.status == 1){
          that.setData({
            redioButton:false
          })
        }else{
          that.setData({
            redioButton: true
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