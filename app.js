// app.js
var app = getApp();
App({
  onLaunch() {
    let that = this
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // wx.request({
        //   url: this.globalData.baseUrl + '/weixin/openId?code=' + res.code,
        //   method: 'GET',
        //   success: function (res) {
        //     wx.hideNavigationBarLoading()
        //     wx.hideLoading()
        //     console.log(res);
        //     wx.setStorageSync('openid', res.data.data.openid)
        //     wx.setStorageSync('session_key', res.data.data.session_key)
        //   },
        //   fail: function (res) {
        //     wx.hideNavigationBarLoading()
        //     wx.hideLoading()
        //     console.log("请求异常")
        //   }
        // })
      }
    })
  },
  globalData: {
    userInfo: null,
    // baseUrl: 'http://127.0.0.1:7077/applets',
    baseUrl: 'https://byfile.disscode.cn/by10/open',
  }
})
