// pages/percenter/percenter.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    member: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  present:function(){
    wx.showModal({
      title: '提示',
      content: '此功能暂未开放，敬请期待',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
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
    var openid = wx.getStorageSync('openid');
    if (openid == undefined || openid == '' || openid == null) {
      return;
    }
    var openid = wx.getStorageSync('openid');
    var shopid = wx.getStorageSync('shopid');
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        openid = res.data;
        wx.request({
          url: app.globalData.url + '/yj/member/center',
          method: 'post',
          data: {
            openid: openid,
            shopid: shopid
          },
          success: function (res) {
            if (res.data.errorCode == 0) {
              that.setData({ member: res.data.results })
            } else {
              wx.showToast(res.data.errorStr);
            }
          }
        })
      },
    });
  },
  // toMap: function () {
  //   var shopinfo = wx.getStorageSync('shopinfo');
  //   wx.openLocation({ latitude: latitude, longitude: longitude, name: shopinfo.name, address: shopinfo.address });
  // },
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
// 用户点击右上角分享
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
      imageUrl:'/images/huanbao.jpg',
      success: function (res) {
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})