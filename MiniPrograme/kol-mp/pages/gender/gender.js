// pages/region/region.js
import * as api from '../../wxapi/main.js'
Page({

  /**
   * 页面的初始数据
   */
    data: {
        gender: '',
        items: [
            {name: '未知', value: '0'},
            {name: '男', value: '1'},
            {name: '女', value: '2'},
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let { items } = this.data
        let information = wx.getStorageSync('information');
        let gender = information.gender
        items[gender*1].checked = true
        this.setData({
            items
        })
    },
    radioChange: function (e) {
        this.setData({
            gender: e.detail.value
        })
    },
    save() {
        let {gender} = this.data
        api.updateKolUser({
            gender
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