// pages/charge/charge.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist:[],
    nomore:false,
    page:0,
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
  tocharge:function(e){
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var prolist = this.data.prolist;
    var title = prolist[index].project.title;
    var amount = prolist[index].amount;
    // wx.setStorageSync('title', title);
    wx.navigateTo({
      url: "/pages/projectcharge/projectcharge?title="+title+"&amount="+amount+"&id="+id,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getprojectcash();
  },
  getprojectcash:function(){
    if (!this.data.nomore) {
    var shopid = wx.getStorageSync('shopid');
    var openid = wx.getStorageSync('openid');
    var page = this.data.page;
    var that = this;
    wx.request({
      url: app.globalData.url + '/yj/logs/project',
      method: 'post',
      data: {
        shopid: shopid,
        openid:openid,
        page:page
      },
      success: function (res) {
        if (res.data.errorCode == 0) {
          if (page >= res.data.results.last_page) {
            that.setData({ nomore: true });
          } else {
            var len = res.data.results.data.length;
            var proer = res.data.results.data;
            var prolist = that.data.prolist;
            for (var i = 0; i < len; i++) {
              prolist.push(proer[i]);
            }
            that.setData({ prolist: prolist })
            that.setData({ page: page + 1 })
          }
        }
      }
    })
    }
    wx.hideNavigationBarLoading();
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
    wx.showNavigationBarLoading();
    this.getprojectcash();
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