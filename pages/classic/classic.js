// pages/classic/classic.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    newsdetails: {},
    imgurl: app.globalData.url2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id: id
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
    this.getnewdetail();
  },
  getnewdetail: function () {
    var id = this.data.id;
    var shopid = wx.getStorageSync('shopid');
    var that = this;
    wx.request({
      url: app.globalData.url + '/yj/case/detail',
      method: 'post',
      data: {
        shopid: shopid,
        id: id
      },
      success: function (res) {
        var results = res.data.results;
        var WxParse = require('../../wxParse/wxParse.js');
        WxParse.wxParse('content', 'html', results.content, that, 5);
        that.setData({ newsdetails: results });
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