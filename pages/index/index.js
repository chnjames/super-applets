// 获取应用实例
const app = getApp()
var convertChs = require('../../utils/simp_trad_chs.js');

Page({
  data: {
    // 页面切换
    isToggled: false,
    harmonyOS: 'HarmonyOS是一款面向万物互联时代的、全新的分布式操作系统。\n在传统的单设备系统能力基础上，HarmonyOS提出了基于同一套系统能力、适配多种终端形态的分布式理念，能够支持手机、平板、智能穿戴、智慧屏、车机、PC、智能音箱、耳机、AR/VR眼镜等多种终端设备，提供全场景（移动办公、运动健康、社交通信、媒体娱乐等）业务能力。'
  },
  // 切换简繁
  switchTab: function (e) {
    const index = e.currentTarget.dataset.index;
    const isTraditional = app.globalData.isTraditional;
    if ((index === 0 && !isTraditional) || (index === 1 && isTraditional)) {
      return;
    }
    app.globalData.isTraditional = !isTraditional;
    wx.setStorageSync('isTraditional', app.globalData.isTraditional);
    this.setData({
      isTraditional: app.globalData.isTraditional
    });
    this.configTitle();
  },
  // 修改标题
  configTitle() {
    wx.setNavigationBarTitle({
      title: convertChs.convert("笔记", app.globalData.isTraditional)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var that = this
    that.setData({
      isTraditional: app.globalData.isTraditional
    })
    that.configTitle()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this
    if (that.data.isToggled) {
      that.onLoad()
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isToggled: true
    })
  }
})