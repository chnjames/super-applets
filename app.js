// app.js
App({
  onLaunch() {
    if (wx.getStorageSync('isTraditional')) {
      console.log('已设置繁简 value=' + wx.getStorageSync('isTraditional'));
      this.globalData.isTraditional = wx.getStorageSync('isTraditional');
    } else {
      console.log('未设置繁简');
    }
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.windowWidth = res.windowWidth;
        that.globalData.windowHeight = res.windowHeight;
      }
    });
  },
  globalData: {
    userInfo: null,
    isTraditional: false,
    windowWidth: 0,
    windowHeight: 0
  }
})