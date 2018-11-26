// pages/myreportnew/myreportnew.js
const Trequest = require('../../utils/request.js')
Page({
  data: {
    selected: true,
    selected1: false,
    selected2: false,
    lawGoneList: [],
    lawAdviceList: [],   //全部
    lawGoneList: [],  //已处理
    lawGoingList: [],  //未处理
    report: false,
    goingreport: false,
    gonereport: false,
    reportSearchvalue: '',   //全部搜索
    reportGoneSearch: '',     //已处理搜索
    reportGoingSearch: '',    //未处理
    page: 1,
    totalList: "",       //总条数
    numPerPage: 20, //设置默认一次加载数据条数
    pageNum: 1, // 设置加载的第几次，默认是第一次
    total: 0 // regardData数组（最近学习记录）的条数
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected1: true
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected2: true,
      selected1: false
    })
  },

  reportSearchInput: function (e) {
    this.setData({
      reportSearchvalue: e.detail.value
    })
  },

  reportSearch: function () {
    var that = this;
    Trequest({
      url: 'clue_report/searchs',
      data: {
        keyword: that.data.reportSearchvalue,
        // user_id: userInfo.id
      },
      callback(res) {
        that.setData({
          lawAdviceList: res.data,
        })
      }
    })
  },
  onLoad() {
    var that = this;
    var userInfo = wx.getStorageSync('user_info').data;
    Trequest({
      url: 'clue_report/getlist',
      data: {
        // user_id: userInfo.id,
        // sign: userInfo.sign,
        p: that.data.pageNum
      },
      callback(res) {
        console.log(2222)
        if (res.data.data == "") {
          that.setData({
            gonereport: true
          })
        } else {
          that.setData({
            lawAdviceList: res.data.data,
            totalList: res.data.total
          })
        }
      }
    })
  },
  // onShow: function(){
  //   var that = this;
  //   var userInfo = wx.getStorageSync('user_info').data;
  //   Trequest({
  //     url: 'clue_report/getlist',
  //     data: {
  //       // user_id: userInfo.id,
  //       // sign: userInfo.sign,
  //       p: that.data.pageNum
  //     },
  //     callback(res) {
  //       console.log(2222)
  //       if (res.data.data == "") {
  //         that.setData({
  //           gonereport: true
  //         })
  //       } else {
  //         that.setData({
  //           lawAdviceList: res.data.data,
  //           totalList: res.data.total
  //         })
  //       }
  //     }
  //   })
  // },

  onReachBottom: function () {
    var that = this;
    var arr1 = that.data.lawAdviceList,
      arr2 = [];
    let page = that.data.pageNum,
      a = that.data.total / that.data.numPerPage;
      console.log(page,a,'jjjjjjjjj')
    if (a < page) {
      page++;
      console.log(that.data.page, 'kkkkkk')
      Trequest({
        url: 'clue_report/getlist',
        data: {
          p: page,
        },
        callback(res) {
          if (that.data.lawAdviceList.length < that.data.totalList) {
            that.setData({
              lawAdviceList: arr1.concat(res.data.data),
              totalList: res.data.total
            })
          }
          that.setData({
            pageNum: page
          })
        }
      })
    }
  },
})