//index.js
//获取应用实例
const app = getApp()
var Zan = require('../../dist/index');
Page(Object.assign({},Zan.Shake,{
  data: {
    imgurl: app.globalData.url2,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    shopinfo:{},
    banners:[],
    news:[],
    shakeInfo: { gravityModalHidden: true, enable: false },
    shakeData: { x: 0, y: 0, z: 0 },
  },
  tomore:function(){
    wx.switchTab({
      url: '/pages/consult/consult',
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    if (options.mid != undefined && options.mid != '') {
      wx.setStorageSync('inviter', options.mid);
    }
    var shopinfo = wx.getStorageSync('shopinfo');
    if (shopinfo == undefined || shopinfo == '') {
      app.login('/pages/index/index');
    }
    var icode = wx.getStorageSync('inviter');
    if (icode != undefined && icode != '' && icode != null) {
      app.bindInviter();
    }
    wx.setNavigationBarTitle({
      title: shopinfo.name,
    })
    app.getShopInfo('');
    // .................
    // var query = wx.createSelectorQuery();
    // //选择id
    // query.select('#allpage').boundingClientRect()
    // query.exec(function (res) {
    //   //res就是 所有标签为mjltest的元素的信息 的数组
    //   console.log(res);
    //   //取高度
    //   console.log(res[0].height);
    // })
  },
  comenic:function(){
    wx.navigateTo({
      url: '/pages/aptitude/aptitude',
    })
  },
  getbanner:function(){
    var shopid = wx.getStorageSync('shopid');
    var that = this;
    wx.request({
      url: app.globalData.url + '/yj/banner',
      method: 'post',
      data: {
        shopid: shopid
      },
      success: function (res) {
        var results = res.data.results;
        that.setData({ banners: results });
      }
    })
  },
  /**
   * 获取首页新闻
   */
  getNews: function () {
    var shopid = wx.getStorageSync('shopid');
    var that = this;
    wx.request({
      url: app.globalData.url + '/yj/news',
      method: 'post',
      data: {
        shopid: shopid
      },
      success: function (res) {
        var results = res.data.results.data;
        that.setData({ news: results });
      }
    })
  },
  getShopInfo: function () {
    var shopinfo = wx.getStorageSync('shopinfo');
    this.setData({ shopinfo: shopinfo });
  },
  toimport:function(){
    wx.reLaunch({
      url: '/pages/consult/consult?status=1',
    })
  },
  toclassical: function () {
    wx.reLaunch({
      url: '/pages/consult/consult?status=2',
    })
  },
  onShow: function () {
    var openid = wx.getStorageSync('openid');
    if (openid == undefined || openid == '' || openid == null) {
      return;
    }
    this.getShopInfo();
    this.getbanner();
    this.getNews();
    this.getMemberCard();
  },
  tonewsdetail:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/consultdetails/consultdetails?id='+id,
    })
  },
  onShareAppMessage: function (res) {
    var pages = getCurrentPages()    //获取加载的页面

    var currentPage = pages[pages.length - 1]    //获取当前页面的对象

    var url = currentPage.route    //当前页面url
    var shopinfo = wx.getStorageSync('shopinfo');
    var shopname = shopinfo.name
    var icode = wx.getStorageSync('icode');
    return {
      title: shopname,
      // path: url + '?mid=' + icode,
      path: 'pages/index/index' + '?mid=' + icode,
      imageUrl: '/images/huanbao.jpg',
      success: function (res) {
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  //获取会员卡信息
  getMemberCard: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var shopid = wx.getStorageSync('shopid');
    wx.request({
      url: app.globalData.url + '/yj/coupon/mcard',
      method: 'post',
      data: {
        shopid: shopid,
        openid: openid
      },
      success: function (res) {
        // console.log(res.data);
        if (res.data.errorCode == 0) {
          var result = res.data.results;
          if (result.length == 0) {

          } else {
            that.setData({ cardInfo: result })
            that.setData({ shakeInfo: { gravityModalHidden: false, enable: true } })
          }
        }
      }
    })
  },
  //摇一摇成功后的操作
  shakesuccess() {
    var that = this;
    wx.playBackgroundAudio({
      dataUrl: 'http://7xqnxu.com1.z0.glb.clouddn.com/wx_app_shake.mp3',

    })
    wx.onBackgroundAudioStop(function () {
      var openid = wx.getStorageSync('openid');
      var shopid = wx.getStorageSync('shopid');
      wx.addCard({
        cardList: that.data.cardInfo,
        success: function (res) {
          var calist = res.cardList;
          var clen = calist.length;
          var items = [];
          for (var i = 0; i < clen; i++) {
            if (calist[i].isSuccess === true) {
              items.push({ cardid: calist[i].cardId, code: calist[i].code });
            }
          }
          // console.log(items);
          if (items.length > 0) {
            wx.request({
              url: app.globalData.url + '/yj/coupon/add',
              method: 'post',
              data: {
                shopid: shopid,
                openid: openid,
                items: items
              },
              success: function (res) {
                if (res.data.errorCode == 0) {
                  wx.openCard({
                    cardList: res.data.results,
                  })
                } else {
                  wx.showToast({
                    title: res.data.errorStr,
                  });
                  var shakeinfo = that.data.shakeInfo;
                  shakeinfo = { enable: true, gravityModalHidden: false };
                  that.setData({ shakeInfo: shakeinfo });
                }
              }
            })
          }
        }
      });
    })
  },
}))
