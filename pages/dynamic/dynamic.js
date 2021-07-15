// pages/dynamic/dynamic.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCard: true,
    articleList: [],
    pagenumber: 1,
    pagesize: 10,
    hasMoreData: true,
    isView: false // 是否是预览图片
  },

  ViewImage(e) {
    this.setData({
      isView: true
    })
    let urls = []
    e.currentTarget.dataset.picitem.map(item => {
      urls.push(item.url)
    })
    wx.previewImage({
      urls: urls,
      current: e.currentTarget.dataset.url
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this
    if (!that.data.isView) {
      that.setData({
        pagenumber: 1,
        hasMoreData: true
      })
      let param = {
        'pagenumber': that.data.pagenumber,
        'pagesize': that.data.pagesize,
        'userId': wx.getStorageSync('openid')
      }
      wx.request({
        // url: app.globalData.baseUrl + '/article/findAll',
        url: app.globalData.baseUrl + '/articleopen.json',
        // method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: param,
        success: function (res) {
          that.setData({
            articleList: res.data.data.content
          })
        },
        fail: function (res) {
          wx.hideNavigationBarLoading()
          wx.hideLoading()
          console.log("请求异常")
        }
      })
    } else {
      that.setData({
        isView: false
      })
    }
  },

  ooclick: function(e) {
    var likeFlag = false; //标志，避免多次发请求
    //避免多次点击
    if (likeFlag === true) {
      return false;
    }
    var that = this;
    var articleId = e.currentTarget.dataset.id; //点击当前项的id
    var index = e.currentTarget.dataset.dex;
    var param = {
      userId: wx.getStorageSync('openid'),
      articleId: articleId,
      status: 1
    }
    // wx.request({
    //   url: app.globalData.baseUrl + '/oo', //oo接口
    //   data: param,
    //   method: 'POST',
    //   success: function(res) {
    //     // if判断一下就正常，不加会报错（undefined）
    //     if (that.data.articleList[index].ooIs == 0) {
    //       that.data.articleList[index].ooIs = 1
    //       that.data.articleList[index].ooNum = parseInt(that.data.articleList[index].ooNum) + 1
    //     }
    //     that.setData({
    //       articleList: that.data.articleList
    //     })
    //     console.log("oo成功", res);
    //   },
    //   complete: function(res) {
    //     likeFlag = false;
    //   }
    // })
  },
  xxclick: function(e) {
    var likeFlag = false; //标志，避免多次发请求
    //避免多次点击
    if (likeFlag === true) {
      return false;
    }
    var that = this;
    var articleId = e.currentTarget.dataset.id; //点击当前项的id
    var index = e.currentTarget.dataset.dex;
    var param = {
      userId: wx.getStorageSync('openid'),
      articleId: articleId,
      status: 1
    }
    // wx.request({
    //   url: app.globalData.baseUrl + '/xx', //oo接口
    //   data: param,
    //   method: 'POST',
    //   success: function(res) {
    //     // if判断一下就正常，不加会报错（undefined）
    //     if (that.data.articleList[index].ooIs == 0) {
    //       that.data.articleList[index].xxIs = 1
    //       that.data.articleList[index].xxNum = parseInt(that.data.articleList[index].ooNum) + 1
    //     }
    //     that.setData({
    //       articleList: that.data.articleList
    //     })
    //     console.log("oo成功", res);
    //   },
    //   complete: function(res) {
    //     likeFlag = false;
    //   }
    // })
  },

  loadMore: function() {
    let that = this
    if (that.data.hasMoreData) {
      that.setData({
        pagenumber: that.data.pagenumber + 1
      })
      let param = {
        'pagenumber': that.data.pagenumber,
        'pagesize': that.data.pagesize,
        'userId': wx.getStorageSync('openid')
      }
      wx.request({
        // url: app.globalData.baseUrl + '/article/findAll',
        url: app.globalData.baseUrl + '/articleopen.json',
        // method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: param,
        success: function (res) {
          var data = res.data.data.content
          if (data.length >= 1) {
            that.setData({
              articleList: that.data.articleList.concat(data)
            })
          } else {
            that.setData({
              hasMoreData: false
            })
          }
          
        },
        fail: function (res) {
          wx.hideNavigationBarLoading()
          wx.hideLoading()
          console.log("请求异常")
        }
      })
    }
  },

  loadNew: function() {
    let that = this
    that.setData({
      pagenumber: 1,
      hasMoreData: true
    })
    let param = {
      'pagenumber': that.data.pagenumber,
      'pagesize': that.data.pagesize,
      'userId': wx.getStorageSync('openid')
    }
    wx.request({
      // url: app.globalData.baseUrl + '/article/findAll',
      url: app.globalData.baseUrl + '/articleopen.json',
      // method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: param,
      success: function (res) {
        that.setData({
          articleList: res.data.data.content
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
  onShareAppMessage: function (options) {
    // 来自页面内的按钮的转发
　　if( options.from == 'button' ){
　　　 var data = options.target.dataset;
　　　 console.log( data.pic );     // shareBtn
　　　 return {
        title: '数十年Lite（动态）',
        path: '/pages/dynamic/dynamic',
        imageUrl: data.pic[0].url,
        success(e) {
          wx.showShareMenu({
            withShareTicket: true
          })
        }
      }
  　}
    
  }
})