/**
   * 摇一摇
   */
var Shake = {
  shake() {
    
    var that = this;
    this.gravityModalConfirm(true);
    wx.onAccelerometerChange(function (res) {
      var x = res.x.toFixed(4),
        y = res.y.toFixed(4),
        z = res.z.toFixed(4);
      var flagX = that.getDelFlag(x, that.data.shakeData.x),
        flagY = that.getDelFlag(y, that.data.shakeData.y),
        flagZ = that.getDelFlag(z, that.data.shakeData.z);
      var shakeData = { x: x, y: y, z: z };
      that.setData({ shakeData: shakeData });
      if ((flagX && flagY) || (flagX && flagZ) || (flagY && flagZ)) {
        //幅度足够大，摇一摇成功
        if (that.data.shakeInfo.enable) {
          that.data.shakeInfo.enable = false;
          that.shakesuccess();
        }
      }
    });
  },
  //启用或停用摇一摇功能
  gravityModalConfirm(flag) {

    if (flag !== true) {
      flag = false;
    }
    var shakeInfo = { gravityModalHidden: !this.data.shakeInfo.gravityModalHidden, enable: flag };
    this.setData({ shakeInfo: shakeInfo });
  },
  //计算摇一摇的偏移量
  getDelFlag(val1, val2) {
    return (Math.abs(val1 - val2) >= 1);
  },
  
}
module.exports = Shake;
