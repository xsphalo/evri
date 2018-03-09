// pages/consult/consult.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cates: [],
    domains: [],
    cases: [],
    casescate: [],
    imgurl: app.globalData.url2,
    showhide: true,
    status: 1,
    cid: '',
    did: '',
    nomore: false,
    nomorel:false,
    page:1,
    pages:1,
    mainrush:true,
    cashrush:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var status = options.status;
    this.setData({
      status: status
    })
    if (status == 2){
      this.setData({
        status: status,
        showhide: false,
        mainrush: false,
        cashrush: true
      });
      this.getcase();
      this.getcasecate();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getclasscid: function (e) {
    var cid = e.currentTarget.dataset.cid;
    this.setData({ cid: cid, page: 1, domains:[],nomore:false});
    var btnslist = true;
    this.getdomain(btnslist);
  },
  getcid: function (e) {
    var did = e.currentTarget.dataset.did;
    this.setData({ did: did, page: 1, cases: [], nomorel: false });
    var btnslist = true;
    this.getcase(btnslist);
  },
  getstatus: function (e) {
    var status = e.currentTarget.dataset.status;
    this.setData({ 
      status: status, showhide: true ,
      mainrush: true,
      cashrush: false
    });
  },
  getanli: function (e) {
    var status = e.currentTarget.dataset.status;
    this.setData({
      status: status,
      showhide: false,
      mainrush: false,
      cashrush: true
    });
    this.getcase();
    this.getcasecate();
  },
  todetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/xundetail/xundetail?id=' + id,
    })
  },
  todetailclass: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/classic/classic?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getcate();
    this.getdomain();
  },
  getcase: function (btnslist) {
    var moreis = !this.data.nomorel;
    if (moreis || btnslist) {
      var page = this.data.pages;
      var shopid = wx.getStorageSync('shopid');
      var cid = this.data.did;
      var that = this;
      wx.request({
        url: app.globalData.url + '/yj/case',
        method: 'post',
        data: {
          shopid: shopid,
          cid: cid,
          page: page
        },
        success: function (res) {
          if (res.data.errorCode == 0) {
            if (page >= res.data.results.last_page) {
              that.setData({ nomorel: true });

              var len = res.data.results.data.length;
              var rnew = res.data.results.data;
              var cases = that.data.cases;
              for (var i = 0; i < len; i++) {
                cases.push(rnew[i]);
              }
              that.setData({ cases: cases })
              that.setData({ page: page + 1 })
            }

          }
        }
      })
    }
    wx.hideNavigationBarLoading();
  },
  getcasecate: function () {
    var shopid = wx.getStorageSync('shopid');
    var that = this;
    wx.request({
      url: app.globalData.url + '/yj/case/cate',
      method: 'post',
      data: {
        shopid: shopid
      },
      success: function (res) {
        var results = res.data.results;
        that.setData({ casescate: results });
      }
    })
  },
  getdomain: function (btnslist) {
    var moreis = !this.data.nomore;
    if (moreis || btnslist) {
      var page = this.data.page;
      var shopid = wx.getStorageSync('shopid');
      var cid = this.data.cid;
      var that = this;
      wx.request({
        url: app.globalData.url + '/yj/domain',
        method: 'post',
        data: {
          shopid: shopid,
          cid: cid,
          page:page
        },
        success: function (res) {
          if (res.data.errorCode == 0) {
            if (page >= res.data.results.last_page) {
              that.setData({ nomore: true });
            
              var len = res.data.results.data.length;
              var rnews = res.data.results.data;
              var domains = that.data.domains;
              for (var i = 0; i < len; i++) {
                domains.push(rnews[i]);
              }
              that.setData({ domains: domains })
              that.setData({ page: page + 1 })
            }

          }
        }
      })
    }
    wx.hideNavigationBarLoading();
  },
  getcate: function () {
    var shopid = wx.getStorageSync('shopid');
    var that = this;
    wx.request({
      url: app.globalData.url + '/yj/domain/cate',
      method: 'post',
      data: {
        shopid: shopid
      },
      success: function (res) {
        var results = res.data.results;
        that.setData({ cates: results });
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
    wx.showNavigationBarLoading();
    var mainrush = this.data.mainrush;
    var cashrush = this.data.cashrush;
    if(mainrush){
      this.getdomain();
    }
    if(cashrush){
      this.getcase();
    }
    
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