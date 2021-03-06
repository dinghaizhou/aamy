// pages/login/login.js
import * as api from '../../wxapi/main.js'
let app =  getApp();
  
Page({
    /**
     * 页面的初始数据
     */
    data: {
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(wx.getStorageSync('token')) {
            app.getUserInfo()
            .then(() => {
                wx.switchTab({
                    url: '/pages/index/index'
                })
            })
        } else {
            wx.login({
                success: res => {
                    api.login({code: res.code}, true)
                    .then((res) => {
                        wx.setStorageSync('token', res['miniprogram-api-token'])
                        app.getUserInfo({},false)
                        .then(() => {
                            wx.switchTab({
                                url: '/pages/index/index'
                            })
                        })
                    })
                }
            })
        }
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