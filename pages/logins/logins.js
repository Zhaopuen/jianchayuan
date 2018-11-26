const Trequest = require('../../utils/request.js')
Page({
  data: {
    page: '',
    back: ''
  },
  onLoad: function (option,e) {
    console.log(e,"这是等了的额")
    this.setData({
      back: option.id
    })
    console.log(this.data.back,'backddddddd')
    // console.log(e,'这是we')
    // this.setData({
    //   pageAs: e.pageAs
    // })
    // console.log(e.pageAs, 'pageAs');
  },
  getUserInfo: function (t) {
    var that = this;
    wx.login({
      success: function (o) {
        console.log(o, 'wx.login')
        var n = o.code;
        wx.request({
          url: 'https://procuratorate.fengsh.cn/api/user/wechatLoginMiniProgram',
          method: "POST",
          data: {
            code: n,
            encryptedData: t.detail.encryptedData,
            iv: t.detail.iv,
            headimgurl: t.detail.userInfo.avatarUrl,
            nickname: t.detail.userInfo.nickName
          },
          success: function (e) {
            console.log('e', e)
            if (200 == e.statusCode) {

              wx.setStorageSync("access_token", e.data.access_token), wx.setStorageSync("user_info", e.data);
              if (that.data.back == 1) {
                console.log(1111)
                wx.redirectTo({
                  url: "/pages/index/index"
                });
              }
              // else if (that.data.back == 'mine') {
              //   wx.switchTab({
              //     url: "/pages/mine/mine"
              //   });
              // }
            }
          },
          complete: function () {
            wx.hideLoading();
          }
        });
      },
      fail: function (e) {

      }
    });
  }
});