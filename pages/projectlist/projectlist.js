// pages/projectlist/projectlist.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '',
    prolist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var status = options.status;
    if (status != undefined) {
      this.setData({ status: status });
    } else {
      this.setData({ status: '' });
    }

    

  },
  changestatus:function(e){
    var status = e.currentTarget.dataset.status;
    this.setData({ status: status});
    this.getprojectlist();
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
    this.getprojectlist();
  },
  turnid:function(e){
    var id = e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;
    wx.navigateTo({
      url: '/pages/projectdetail/projectdetail?id='+id+'&status='+status,
    })
  },
  getprojectlist:function(){
    var that = this;
    var openid = wx.getStorageSync('openid');
    var shopid = wx.getStorageSync('shopid');
    var status = this.data.status;
    var prolist = this.data.prolist;
    var page = 1;
    wx.request({
      url: app.globalData.url + '/yj/project',
      method: 'post',
      data: {
        'openid': openid,
        'shopid': shopid,
        'status': status,
        'page':page,
      },
      success: function (res) {
        if (res.data.errorCode == 0) {
          var rlist = res.data.results.data;
          var rlen = rlist.length;
          for (var i = 0; i < rlen; i++) {
            prolist.push(rlist[i]);
          }
          that.setData({ prolist: prolist })
        } else {
          wx.showToast(res.data.errorStr);
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