// pages/projectdetail/projectdetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prodet:{},
    huicir:"/images/huicir.png",
    bluecir: "/images/bluecir.png",
    gou: "/images/gou.png",
    progressone:'',
    progresstwo:'',
    progressthree:'',
    progressfour:'',
    status:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var status = options.status;
    this.setData({
      id:id,
      status:status
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  jindu:function(){
    var status = this.data.status;
    var progressone, progresstwo, progressthree, progressfour;
    var hui = this.data.huicir,
        blue = this.data.bluecir,
        gou = this.data.gou;
    if (status == 1){
      this.setData({
        progressone: gou,
        progresstwo: hui,
        progressthree: hui,
        progressfour: hui,
        lineo:false,
        linet: false,
        liner: false
      });
    }
    if (status == 2) {
      this.setData({
        progressone: blue,
        progresstwo: gou,
        progressthree:hui,
        progressfour: hui,
        lineo: true,
        linet: false,
        liner: false
      });
    }
    if (status == 3) {
      this.setData({
        progressone: blue,
        progresstwo: blue,
        progressthree:gou,
        progressfour: hui,
        lineo: true,
        linet: true,
        liner: false
      });
    }
    if (status == 4) {
      this.setData({
        progressone: blue,
        progresstwo:blue,
        progressthree: blue,
        progressfour: gou,
        lineo: true,
        linet: true,
        liner: true
      });
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.prodetail();
    this.jindu();
  },
  prodetail: function () {
    var shopid = wx.getStorageSync('shopid');
    var openid = wx.getStorageSync('openid');
    var id =this.data.id;
    var that = this;
    wx.request({
      url: app.globalData.url + '/yj/project/detail',
      method: 'post',
      data: {
        shopid: shopid,
        openid: openid,
        id: id
      },
      success: function (res) {
        var results = res.data.results;
        that.setData({ prodet: results });
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