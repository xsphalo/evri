// pages/letsnote/letsnote.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    // var shopinfo = wx.getStorageSync('shopinfo');
    // console.log(shopinfo.notice);
    // if (shopinfo.notice == '' || shopinfo.notice == undefined){
    //   wx.navigateTo({
    //     url: '/pages/myproject/myproject',
    //   })
    // }
    this.aboutus();
  },
  aboutus: function () {
    var shopinfo = wx.getStorageSync('shopinfo');
    var that = this;
    console.log(shopinfo);
    var WxParse = require('../../wxParse/wxParse.js');
    WxParse.wxParse('content', 'html', shopinfo.notice, that, 5);
  },
  tomyproject:function(){
    wx.navigateTo({
      url: '/pages/myproject/myproject',
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