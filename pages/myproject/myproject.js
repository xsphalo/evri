// pages/myproject/myproject.js
const app = getApp();
let Mcaptcha = require('../../dist/inifycode.js');
Page(Object.assign({}, Mcaptcha.Mcaptcha,{

  /**
   * 页面的初始数据
   */
  data: {
    charge_name:'',
    charge_mobile: '',
    title: '',
    commit_wx: '',
    commit_name: '',
    commit_mobile: '',
    address: '',
    cid:'',
    projectsall:[],
    tfont:true,
    bgstyle:false,
    country:'',
    mende:true,
    clears:'',
    codes:'',
    codex:'',
    description:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  
  // refresh:function(){
  //   var codes = this.mcaptcha.randomNum(1000,9999);
  //   this.mcaptcha.refresh(codes);
  //   this.mcaptcha.randomColor(180,240);
  //   this.setData({
  //     codes: codes
  //   })
  // },
  
  regist:function(){
    var codes = Math.floor(Math.random() * (9999 - 1000) + 1000);
    this.setData({
      codes: codes
    })
    this.mcaptcha = new Mcaptcha({
      el: 'canvas',
      width: 120,
      height: 45,
      code: codes
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.regist();
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var projectsall = this.data.projectsall;
    var index = e.detail.value;
    var cid = projectsall[index].id;
    this.setData({
      index: e.detail.value,
      tfont:false,
      cid:cid
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getprojectcate();
    this.regist();
    var remarks = wx.getStorageSync('remarks');
    if (remarks.replace(/(^s*)|(s*$)/g, "").length !== 0){
      this.setData({
        mende: false,
        description: remarks
      })
    }
   

    // var page = getCurrentPages().pop();
    // if (page == undefined || page == null) return;
    // page.onLoad();
  },
  getprojectcate:function(){
    var openid = wx.getStorageSync('openid');
    var shopid = wx.getStorageSync('shopid');
    var that = this;
    wx.request({
      url: app.globalData.url + '/yj/project/cate',
      method: 'post',
      data: {
        shopid: shopid,
        openid: openid,
      },
      success: function (res) {
        if (res.data.errorCode == 0) {
          var results = res.data.results;
          that.setData({ projectsall: results });
        }
      }
    })
  },
  chargename: function (e) {
    this.setData({ charge_name: e.detail.value });
    this.buttonbg();
  },
  chargemobile: function (e) {
    this.setData({ charge_mobile: e.detail.value });
    this.buttonbg();
  },
  title: function (e) {
    this.setData({ title: e.detail.value });
    this.buttonbg();
  },
  commitwx: function (e) {
    this.setData({ commit_wx: e.detail.value });
    this.buttonbg();
  },
  commitname: function (e) {
    this.setData({ commit_name: e.detail.value });
    this.buttonbg();
  },
  commitmobile: function (e) {
    this.setData({ commit_mobile: e.detail.value });
    this.buttonbg();
  },
  address: function (e) {
    this.setData({ address: e.detail.value });
    this.buttonbg();
  },
  codes:function(e){
    this.setData({ codex: e.detail.value });
    this.buttonbg();
  },
  buttonbg:function(){
    var codex = this.data.codex;
    var ch_name = this.data.charge_name;
    var ch_mobile = this.data.charge_mobile;
    var co_name = this.data.commit_name;
    var co_mobile = this.data.commit_mobile;
    // var co_wx = this.data.commit_wx;
    var title = this.data.title;
    var address = this.data.address;
    var cid = this.data.cid;
    var remarks = wx.getStorageSync('remarks');
    if (ch_name == undefined || ch_name == '' || ch_mobile == undefined || ch_mobile == '' || co_name == undefined || co_name == '' || co_mobile == undefined || co_mobile == '' || title == undefined || title == '' || address == undefined || address == '' || codex == undefined || codex == ''){
      // console.log('0');
      this.setData({
        bgstyle:false
      });
    }else{
      // console.log('1');
      this.setData({
        bgstyle: true
      });
    }
  },
  chooseLocation: function (e) {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        // success
        // console.log(res)
        that.setData({
          hasLocation: true,
          location: {
            longitude: res.longitude,
            latitude: res.latitude
          },
          country: res.address,
          address: res.address
        })
        that.buttonbg();
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  formSubmit: function (e) {
    var code = this.data.codes;
    var codex = this.data.codex;
    // console.log(code);
    // console.log(codex);
    if (parseInt(code) !== parseInt(codex)){
      wx.showToast({
        title: '验证码错误',
        duration: 2000
      })
      return false
    }
    var that = this;
    var openid = wx.getStorageSync("openid");
    var shopid = wx.getStorageSync("shopid");
    var charge_name = this.data.charge_name;
    var charge_mobile = this.data.charge_mobile;
    var commit_name = this.data.commit_name;
    var commit_mobile = this.data.commit_mobile;
    // var commit_wx = this.data.commit_wx;
    var title = this.data.title;
    var address = this.data.address;
    var cid = this.data.cid;
    var remarks = wx.getStorageSync('remarks');
    // console.log(remarks);
    wx.request({
      method: 'post',
      url: app.globalData.url + '/yj/project/post',
      data: {
        'openid': openid,
        'shopid': shopid,
        'commit_name': commit_name,
        'commit_mobile': commit_mobile,
        // 'commit_wx': commit_wx,
        // 'charge_wx': charge_wx,
        'charge_name': charge_name,
        'charge_mobile': charge_mobile,
        'cid': cid,
        'title': title,
        'address': address,
        'remarks': remarks,
      },
      success: function (res) {
        if (res.data.errorCode == 0) {
          wx.removeStorageSync('remarks');
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/projectlist/projectlist',
            });
          }, 1500);
          that.setData({
            clears:"",
            country:'',
          })
          
        
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
    // var page = getCurrentPages().pop();
    // if (page == undefined || page == null) return;
    // page.onLoad();
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
}))