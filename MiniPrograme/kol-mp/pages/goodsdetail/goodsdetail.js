// pages/goodsdetail/goodsdetail.js
import * as api from '../../wxapi/main.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        detail: null,
        collect_url: '../../images/shoucang_01@3x.png',
        has_collect: true,
        show_dialog: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = 20
        // let id = options.id
        api.getResourceDetail({id}, true)
        .then((res) => {
            this.setData({
                detail: res,
                id,
                has_collect: res.has_collect
            })
        })
    },
    collect() {
        let param, url;
        if(this.data.has_collect) {
            param = {goods_ids: [this.data.id]}
            url = 'calcelCollect'
        } else {
            param = {goods_id: this.data.id}
            url = 'addCollect'
        }
        api[url](param,true)
        .then((res) => {
            this.setData({
                has_collect: !this.data.has_collect
            })
        })
        .catch((res) => {
            console.log(res)
        })
        
    },
    applyOrder() {
        this.setData({
            show_dialog: true
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