// pages/basics/home/home.js
const util = require('../../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [],
    datetimeTo: "2022/01/01 18:00:00", // 聚会开始时间
    timeLeft: "",    // 剩下的时间（天时分秒）
    cardCur: 0,
    swiperList: [],
    modalName: 'Image',
    iconList: [{
      icon: 'noticefill',
      color: 'olive',
      badge: 1,
      name: '公告'
    }, {
      icon: 'group',
      color: 'red',
      badge: 120,
      name: '同学'
    }, {
      icon: 'icloading',
      color: 'blue',
      badge: 0,
      name: '海报'
    }, {
      icon: 'link',
      color: 'cyan',
      badge: 0,
      name: '朋友圈'
    }],
    gridCol:4,
    nickName: '',
    avatarUrl: '',
    isCanDraw: false
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  goLink(e) {
    var iconStr = e.currentTarget.dataset.icon
    if ('noticefill' == iconStr) {
      wx.navigateTo({
        url: '/pages/basics/about/about'
      })
    }
    if ('group' == iconStr) {
      wx.navigateTo({
        url: '/pages/basics/verticalnav/verticalnav'
      })
    }
    if ('link' == iconStr) {
      // this.setData({
      //   modalName: 'Image'
      // })
      if (!wx.getStorageSync('hasUserInfo')){
        wx.getUserProfile({
          desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            console.log(res)
            wx.setStorageSync('userInfo', res.userInfo)
            wx.setStorageSync('nickName', res.userInfo.nickName)
            wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
            wx.setStorageSync('hasUserInfo', true)
            this.setData({
              nickName: res.userInfo.nickName,
              avatarUrl: res.userInfo.avatarUrl,
              isCanDraw: !this.data.isCanDraw
            })
          }
        })
      } else {
        this.setData({
          nickName: wx.getStorageSync('nickName'),
          avatarUrl: wx.getStorageSync('avatarUrl'),
          isCanDraw: !this.data.isCanDraw
        })
      }
    }
    if ('icloading' == iconStr) {
      wx.navigateTo({
        url: '/pages/basics/poster/poster'
      })
    }
  },
  handleClose(e){
    this.setData({
      isCanDraw: !this.data.isCanDraw
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      // url: app.globalData.baseUrl + '/banner/list',
      url: app.globalData.baseUrl + '/banner/banneropen.json',
      // method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          swiperList: res.data.data
        })
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        console.log("请求异常")
      }
    })
    wx.request({
      // url: app.globalData.baseUrl + '/notice/list',
      url: app.globalData.baseUrl + '/noticeopen.json',
      // method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          msgList: res.data.data
        })
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        console.log("请求异常")
      }
    })
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
    this.data.timer = setInterval(() =>{ //注意箭头函数！！
      this.setData({
        timeLeft: util.getTimeLeft(this.data.datetimeTo)//使用了util.getTimeLeft
      });
      if (this.data.timeLeft == "0天0时0分0秒") {
        clearInterval(this.data.timer);
      }
    }, 1000);
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