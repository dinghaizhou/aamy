// pages/region/region.js
import * as api from '../../wxapi/main.js'
let app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
    data: {
        region: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let region = this.data.region
        let information = app.globalData.userInfo
        region[0] = information.province ? information.province : ''
        region[1] = information.city ? information.city : ''
        this.setData({
            region
        })
    },
    bindRegionChange: function (e) {
        this.setData({
            region: e.detail
        })
    },
    save() {
        let {region} = this.data
        api.updateKolUser({
            province: region[0],
            city: region[1],
            district: region[2]
        })
        .then((res) => {
            wx.navigateBack({
                delta: 1
            });
              
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