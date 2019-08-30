// pages/search/search.js
import * as api from '../../wxapi/main.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        has_more: false,
        page: 1,
        has_searched: false,
        name: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.search = this.selectComponent('#search')
        this.search.showInput()
    },
    searchaa() {
        api.getResourceList({
            name: this.data.name,
            page: 1
        }, true)
        .then((res) => {
            this.setData({
                page: 1,
                list: res.list,
                has_more: res.has_more,
                has_searched: true
            })
        })
    },
    handleInput(e) {
        this.setData({
            name: e.detail,
            page: 1,
            list: [],
            has_more: false,
            has_searched: false
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
            api.getResourceList({
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