const Trequest = require('../../utils/request.js')
var e = getApp(), a = new (require("../../libs/qqmap-wx-jssdk.min.js"))({
  key: "55WBZ-O3GHU-F6PV6-4ZHOK-IOJUT-CNB6F"
});
const app = getApp()
import { $init, $digest } from '../../utils/common.util';
if (wx.getRecorderManager) var t = wx.getRecorderManager(), n = wx.createInnerAudioContext();

var o = "";

Page({
  data: {
    //视频地址
    src:'',
    reportname: e.reportname,
    voiceState: 1,
    play_fileIndex: "",
    tempFilePath: [],
    address: "",
    uploadImg: [],
    isChecked: !1,
    category_name: "",
    xiansuostyle: [],
    casIndex: 0,
    regionId: [],
    category: 0,
    tabbar: {},
    concent: '', 
    phoneValue: '',
    images:[],
    tempadress:'',
    productInfo: {},
    photoImg: '',  
    luyinTemp: [],
    video: ""
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      category: e.detail.value
    });
  },
  // 线索类型的选择
  bindCasPickerChange: function (e) {
    this.setData({
      casIndex: e.detail.value
    })
  },
 // 上传视频
  upVideo:function(){
    var that =this;
    wx.chooseVideo({
      sourceType: ['camera'],
      maxDuration: 30,
      success:function(res){
        that.uploadvideo(res)
      }
    })
  },
  //上传视频 目前后台限制最大100M，以后如果视频太大可以在选择视频的时候进行压缩
  uploadvideo: function (t) {
    console.log(t)
    var that = this;
    wx.uploadFile({
      url: 'https://procuratorate.fengsh.cn/api' + '/upload/index',
      filePath: t.tempFilePath,
      name: "file",
      success: function (t) {
        var data = t.data;
        t = JSON.parse(t.data);
        var imgarr = 'https://procuratorate.fengsh.cn' + t.data.name;
        if(imgarr == ""){
          
        }
        that.setData({
          video: imgarr
        })
        wx.hideLoading();
      },
      fail: function (e) {
        wx.hideLoading(), wx.showToast({
          title: '上传失败',
        })
      }
    });
  },

  // 线索类型的值
  // xiansuoStyle: function (e) {
  //   console.log(e);
  //   this.setData({
  //     regionId: e.detail.value
  //   })
  // },
  // textarea
  bindTextAreaBlur: function (e) {
    this.setData({
      concent: e.detail.value,
    })
  },
  // phone input  
  phoneInput: function (e) {
    this.setData({
      phoneValue: e.detail.value,
    })
  },
  onLoad: function (a) {
    var that = this;
    $init(this);
    // 线索类型的数据 
    Trequest({
      url: 'Clue_Report_Type/getlist',
      data: {
        parent_id: a.id
      },
      callback(res) {
        var arr = [];
        var arrid = [];
        console.log(res.data.data.slice(0,-3),'这是线索类别')
        var len = res.data.data.length;
        for (var i = 0; i < len; i++) {
          arr.push(res.data.data[i].name);
          arrid.push(res.data.data[i].id);
        }
        let loactionId = arrid[0];
        that.setData({
          xiansuostyle: arr,
          regionId: arrid,
        })
      }
    })
    app.changeTabBar();     //调用app中的函数
    var t = this, n = "";
    wx.getStorageInfoSync("location");
  },

  // 上传图片
  chooseImage(e) {
    var that = this;
    wx.chooseImage({
      count:6,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        var tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length;i++){
          wx.uploadFile({
            url: 'https://procuratorate.fengsh.cn/api' + '/upload/index',
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'user': 'test'
            },
            success: function (res) {
              console.log(res.data,'这是上传图片成功444')
              var data = res.data;
              res = JSON.parse(res.data);
              var imgarr = that.data.images;
              imgarr.push('https://procuratorate.fengsh.cn' + res.data.name);
              that.setData({
                images: imgarr
              })
              console.log(that.data.images,'8888888')
            }
          })
        }
        $digest(this)
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    $digest(this)
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },
  // 诉讼举报提交
  reportSubmit: function(){
    var that = this;
    // 判断是否登录
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
    var userInfo = wx.getStorageSync('user_info').data;
    var picImg = that.data.images;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; 
    if (that.data.concent == "") {
      wx.showToast({
        title: '请说明举报事由',
      })
      return false;
    } else if (that.data.phoneValue == "") {
      wx.showToast({
        title: '请填写联系电话',
      })
      return false;
    }else if (!myreg.test(this.data.phoneValue)) { 
      wx.showToast({ 
        title: '手机号有误！', 
        icon: 'success', 
        duration: 1500 
      })  
      return false; 
    } else {
      console.log(that.data.images,'000000')
      var pics = ["11","222"];
      Trequest({
        url: 'clue_report/add',
        data: {
          user_id: userInfo.id,
          sign: userInfo.sign,
          type_id: that.data.regionId[that.data.casIndex],
          details_content: that.data.concent,
          address: that.data.address,
          pics: that.data.images,
          mobile: that.data.phoneValue,
          phonetic: that.data.tempFilePath,
          video: that.data.video,
          replycontent: ''
        },
        callback(res) {
          console.log(res.data)
          if (res.data.status == 1) {
            wx.showToast({
              title: '举报成功',
            })
            wx.redirectTo({
              url: '../myreport/myreport',
            })
          }
        }
      })
    }
  },
  onShow: function () {
    this.bindopensetting();
  },
  checkboxChange: function (e) {
    if (e.detail.value.length > 0) a = !0; else var a = !1;
    this.setData({
      isChecked: a
    });
  },
  bindopensetting: function () {
    var e = this;
    wx.getSetting({
      success: function (a) {
        a.authSetting["scope.record"] ? e.setData({
          canVoice: !0
        }) : wx.authorize({
          scope: "scope.record",
          success: function () {
            e.setData({
              canVoice: !0
            });
          },
          fail: function () {
            e.setData({
              canVoice: !1,
              tempFilePath: []
            });
          }
        }), a.authSetting["scope.userLocation"] || e.data.address ? (e.setData({
          canLocation: !0
        }), e.data.address || wx.getLocation({
          type: "wgs84",
          success: function (a) {
            var t = {
              latitude: a.latitude,
              longitude: a.longitude
            };
            e.getLocationName(t);
          }
        })) : wx.authorize({
          scope: "scope.userLocation",
          success: function () {
            e.setData({
              canLocation: !0
            }), wx.getLocation({
              type: "wgs84",
              success: function (a) {
                var t = {
                  latitude: a.latitude,
                  longitude: a.longitude
                };
                e.getLocationName(t);
              }
            });
          },
          fail: function () {
            e.setData({
              canLocation: !1
            });
          }
        });
      }
    });
  },
  start: function () {
    var e = this;
    if (e.setData({
      voiceState: 0
    }), wx.showLoading({
      title: "录音中..."
    }), wx.getRecorderManager) {
      var a = {
        duration: 1e4,
        sampleRate: 16e3,
        numberOfChannels: 1,
        encodeBitRate: 96e3,
        format: "mp3",
        frameSize: 50
      };
      t.start(a);
    } else wx.startRecord({
      success: function (a) {
        var tempFilePath = a.tempFilePath;
        var t = e.data.tempFilePath, n = a.tempFilePath;
        t.push(n), t.length > 5 && t.shift(), e.setData({
          tempFilePath: t
        });
      },
      fail: function (e) {
        wx.showToast({
          title: "录音失败",
          icon: "loading"
        });
      }
    });
    o = setTimeout(function () {
      e.bindVoiceEnd();
    }, 1e4);
  },
  stop: function () {
    var a = this;
    clearTimeout(o), a.setData({
      voiceState: 1
    }), 
    wx.hideLoading(), 
    wx.getRecorderManager ? (t.stop(), t.onStop(function (t) {
      wx.showLoading({
        title: "上传中..."
      }), 
      wx.uploadFile({
        url: 'https://procuratorate.fengsh.cn/api' + '/upload/index',
        filePath: t.tempFilePath,
        name: "file",
        formData: {
          token: wx.getStorageSync("member").token,
          yard_name: e.yardname
        },
        success: function (t) {
          t = JSON.parse(t.data);
          var imgarr = a.data.tempFilePath;
          imgarr.push('https://procuratorate.fengsh.cn' + t.data.name);
          a.setData({
            tempFilePath: imgarr.slice(0, 5)
          })
          wx.hideLoading();
        },
        fail: function (e) {
          wx.hideLoading(), wx.showToast({
            title: '上传失败',
          })
        }
      });
    })) : (wx.stopRecord(), wx.showToast({
      title: "录音结束",
      icon: "success"
    }));
  },
  play: function (e) {
    var a = this;
    wx.getRecorderManager ? (n.autoplay = !0, n.src = a.data.tempFilePath[e.currentTarget.dataset.fileindex],
      n.onPlay(function () {
        wx.showToast({
          title: "开始播放",
          icon: "success"
        }), a.setData({
          play_fileIndex: e.currentTarget.dataset.fileindex
        });
      }), n.onError(function (e) {
        console.log(e);
      }), n.onEnded(function (e) {
        a.setData({
          play_fileIndex: ""
        });
      })) : (wx.showToast({
        title: "开始播放",
        icon: "success"
      }), a.setData({
        play_fileIndex: e.currentTarget.dataset.fileindex
      }), wx.playVoice({
        filePath: a.data.tempFilePath[e.currentTarget.dataset.fileindex],
        complete: function (e) { }
      }));
  },
  bindVoiceStart: function () {
    var e = this;
    e.data.canVoice && (e.start(), e.setData({
      voiceState: 0
    }));
  },
  bindVoiceEnd: function () {
    if (1 == this.data.voiceState) return !1;
    this.stop();
  },
  openSet: function () {
    wx.openSetting({
      success: function (e) { }
    });
  },
  getLocation: function () {
    var e = this;
    wx.chooseLocation({
      success: function (a) {
        var t = {
          latitude: a.latitude,
          longitude: a.longitude
        };
        e.getLocationName(t);
      }
    });
  },
  getLocationName: function (e) {
    var t = this;
    a.reverseGeocoder({
      location: {
        latitude: e.latitude,
        longitude: e.longitude
      },
      success: function (e) {
        t.setData({
          address: e.result.formatted_addresses.recommend
        });
      }
    });
  },
  bindUploadImg: function (a) {
    var t = this;
    wx.chooseImage({
      count: 6,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (a) {
        var n = t.data.uploadImg;
        wx.showLoading({
          title: "图片上传中"
        });
        for (var o = a.tempFilePaths.length, i = 0; i < a.tempFilePaths.length; i++) !function (i) {
          wx.uploadFile({
            url: 'upload/index',
            file: a.tempFilePaths[i],
            // name: "file",
            formData: {
              token: wx.getStorageSync("member").token,
              yard_name: e.yardname
            },
            success: function (a) {
              i == o - 1 && wx.hideLoading(), n.push(e.rootdomain + a.data), n.length > 6 && (n = n.slice(0, 6)),
                t.setData({
                  uploadImg: n
                });
            },
            fail: function (e) {
              i == o - 1 && wx.hideLoading(), t.$wuxToast.show({
                type: "cancel",
                timer: 1500,
                color: "#fff",
                text: "上传失败"
              });
            }
          });
        }(i);
      }
    });
  },
  bindDelImg: function (e) {
    var a = this.data.uploadImg;
    a.splice(a.indexOf(e.currentTarget.dataset.url), 1), this.setData({
      uploadImg: a
    });
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: this.data.uploadImg
    });
  },
  agreeExplain: function (e) {
    wx.navigateTo({
      url: "/pages/agreenReport/agreenReport"
    });
  },
  reportCubmit: function (a) {
    var t = a.detail.value, n = a.detail.formId;
    e.request("/api/formid", "post", {
      formid: n,
      token: wx.getStorageSync("member").token
    }, function (e) { });
    var o = this, i = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (!t.reportText) return o.$wuxToast.show({
      type: "text",
      timer: 1500,
      color: "#fff",
      text: "请说明举报的事由"
    }), !1;
    t.reportPhone && i.test(t.reportPhone) ? o.data.address ? (wx.showLoading({
      title: "提交中"
    }), o.submitData(t)) : this.$wuxToast.show({
      type: "text",
      timer: 1500,
      color: "#fff",
      text: "位置信息不能为空"
    }) : this.$wuxToast.show({
      type: "text",
      timer: 1500,
      color: "#fff",
      text: "请输入正确的手机号码"
    });
  },
  // submitData: function (a) {
  //   var t = this, n = t.data.category_name ? t.data.category_name.value : t.data.categoryList[t.data.category].value;
  //   e.request("/api/addar", "post", {
  //     category_parent_name: n.split("_")[0],
  //     category_children_name: n.split("_")[1],
  //     token: wx.getStorageSync("member").token,
  //     report_voice_path: t.data.tempFilePath,
  //     report_img_path: t.data.uploadImg,
  //     report_content: a.reportText,
  //     report_phone: a.reportPhone,
  //     report_location: t.data.address
  //   }, function (e) {
  //     wx.hideLoading(), e.data.state ? t.$wuxToast.show({
  //       type: "text",
  //       timer: 2e3,
  //       color: "#fff",
  //       text: "提交成功",
  //       success: function () {
  //         wx.navigateBack();
  //       }
  //     }) : t.$wuxToast.show({
  //       type: "text",
  //       timer: 1500,
  //       color: "#fff",
  //       text: e.data.text
  //     });
  //   });
  // }
});