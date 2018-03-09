// pages/projectcharge/projectcharge.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount:'',
    title:'',
    info:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var title = wx.getStorageSync('title');
    var title = options.title;
    var amount = options.amount;
    var id = options.id;
    this.setData({
      title: title,
      amount:amount,
      id:id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  gettimoney: function () {
    var openid = wx.getStorageSync('openid');
    var shopid = wx.getStorageSync('shopid');
    var that = this;
    console.log('1');
    wx.request({
      url: app.globalData.url + '/util/mdx/withdraw',
      method: 'post',
      data: {
        shopid: shopid,
        openid: openid,
      },
      success: function (res) {
        if (res.data.errorCode == 0) {
          var monnumb = res.data.results;
          that.setData({
            monnumb: monnumb,
          });
        }
      }
    })
  },
  getname:function(e){
    var acct_name = e.detail.value;
    this.setData({
      acct_name: acct_name
    })
  },
  getmobile: function (e) {
    var mobile = e.detail.value;
    this.setData({
      mobile: mobile
    })
  },
  getbankno: function (e) {
    var bankno = e.detail.value;
    this.setData({
      bankno: bankno
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getinfo();
    this.gettimoney();
  },
  getinfo: function () {
    var openid = wx.getStorageSync('openid');
    var shopid = wx.getStorageSync('shopid');
    var that = this;
    wx.request({
      url: app.globalData.url + '/yj/withdraw/info',
      method: 'post',
      data: {
        shopid: shopid,
        openid: openid,
      },
      success: function (res) {
        if (res.data.errorCode == 0) {
          var info = res.data.results;
          that.setData({info: info,});
        }
      }
    })
  },
  formSubmit: function (e) {
    var info = this.data.info;
    // console.log(e);
    if (info == undefined || info == null || info == {}) {
      var mobile = this.data.mobile;
      var bankno = this.data.bankno;
      var acct_name = this.data.acct_name;
    } else {
      var mobile = e.detail.value.mobile;
      var bankno = e.detail.value.bankno;
      var acct_name = e.detail.value.acct_name;
      mobile == info.mobile ? info.mobile : mobile;
      bankno == info.bankno ? info.bankno : bankno;
      acct_name == info.acct_name ? info.acct_name : acct_name;
    }
    var that = this;
    var openid = wx.getStorageSync("openid");
    var shopid = wx.getStorageSync("shopid");
    var id = this.data.id;
    wx.request({
      method: 'post',
      url: app.globalData.url + '/yj/project/withdraw',
      data: {
        'openid': openid,
        'shopid': shopid,
        'mobile':mobile,
        'bankno': bankno,
        'acct_name': acct_name,
        'id': id,
      },
      success: function (res) {
        if (res.data.errorCode == 0) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/charge/charge',
            });
          }, 1500);

        } else {
          wx.showToast({
            title: res.data.errorStr,
          })
        }
      }
    })
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
})