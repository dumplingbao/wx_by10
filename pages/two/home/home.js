// pages/two/home/home.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    peopleArr: [],
    peopleData:[]
  },

  // 创建动画
  createAnim: function (peopleArr) {
    var windowHeight = wx.getSystemInfoSync().windowHeight
    var windowWidth = wx.getSystemInfoSync().windowWidth
    const random = (min, max) => Math.random() * (max - min) + min
    // console.log(windowHeight)
    // console.log(windowWidth)
     // 无限循环动画
    setInterval(function(){
      // 导出动画
      var peopleData = [];
      for (var i = 0; i < peopleArr.length; i++) {
        // console.log(random(10, windowHeight))
        // console.log(random(10, windowWidth))
        // 初始动画
        this.animation = wx.createAnimation();
        // 你要执行动画链(详见文档)
        this.animation.translateX(random(10, windowWidth)).translateY(random(10, windowHeight)).step({ duration: 3800, timingFunction: "ease-out" });
         
        var diceData = {};
        diceData.anim = this.animation.export();
        diceData.dots = peopleArr[i].url;
        diceData.name = peopleArr[i].name;
        diceData.gender = peopleArr[i].gender;
        peopleData.push(diceData);
      }
      this.setData({
        peopleData: peopleData
      })
   }.bind(this),4000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + '/oneopen.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          peopleArr: res.data.data
        })
        // 创建动画
        that.createAnim(res.data.data);
        that.loadModal()
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        console.log("请求异常")
      }
    })
  },

  loadModal () {
    this.setData({
      loadModal: true
    })
    setTimeout(()=> {
      this.setData({
        loadModal: false
      })
    }, 6000)
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
  onShareAppMessage: function () {

  }
})