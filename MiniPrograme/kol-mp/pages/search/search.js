// pages/search/search.js
import * as api from '../../wxapi/main.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        has_more: false,
        page: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.search = this.selectComponent('#search')
        this.search.showInput()
    },
    searchaa(e) {
        api.getResourceList({
            name: e.detail,
            page: 1
        })
        .then((res) => {
            this.setData({
                page: 1,
                list: res.list,
                has_more: res.has_more,
                name: e.detail
            })
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
        let { has_more, page, list, name } = this.data
        if(has_more) {
            page = page + 1
            this.setData({
                is_loading: true,
            })
            api.collectList({
                page,
                name
            })
            .then((res) => {
                this.setData({
                    has_more: res.has_more,
                    is_loading: false,
                    list: list.concat(res.list),
                    page
                })
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})