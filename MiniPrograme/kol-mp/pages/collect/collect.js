// pages/collect/collect.js
import * as api from '../../wxapi/main.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        collect_list: null,
        checked_arr: [],
        edit: false,
        all_checked: false,
        page: 1,
        has_more: false,
        is_loading: false,
        show_dialog: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getList()
    },
    goToDetail(e) {
        if(!this.data.edit) {
            wx.navigateTo({
                url: '/pages/goodsdetail/goodsdetail?id=' + e.currentTarget.dataset.id,
                success: (result) => {
                    
                },
                fail: () => {},
                complete: () => {}
            });
        }
    },
    getList() {
        api.collectList()
        .then((res) => {
            this.setData({
                collect_list: res.list,
                has_more: res.has_more
            })
        })
    },
    checkboxChange(e) {
        let checked_arr = e.detail.value
        let { collect_list } = this.data
        for(var item of collect_list) {
            if(checked_arr.includes(item.goods_id + '')) {
                item.checked = true
            } else {
                item.checked = false
            }
        }
        this.setData({
            checked_arr,
            collect_list
        })
    },
    checkAllChange(e) {
        let {checked_arr, all_checked, collect_list} = this.data
        let arr = e.detail.value
        checked_arr = []
        if(arr.length > 0) {
            all_checked = true
            for(var item of collect_list) {
                item.checked = true
                checked_arr.push(item.goods_id)
            }
        } else {
            all_checked = false
            for(var item of collect_list) {
                item.checked = false
            }
        }
        this.setData({
            all_checked,
            collect_list,
            checked_arr
        })
    },
    edit() {
        let {checked_arr, all_checked, edit, collect_list} = this.data
        if(edit) {
            checked_arr = []
            all_checked = false
            for(var item of collect_list) {
                item.checked = false
            }
        }
        this.setData({
            edit: !edit,
            all_checked,
            collect_list,
            checked_arr
        })
    },
    
    cancelCollect() {
        this.setData({
            show_dialog: true
        })
    },
    confirm() {
        api.calcelCollect({
            goods_ids: this.data.checked_arr
        })
        .then((res) => {
            this.setData({
                show_dialog: false
            })
            this.edit()
            this.getList()
        })
    },
    closeDialog() {
        this.setData({
            show_dialog: false
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
        let { has_more, page, collect_list, edit } = this.data
        if(has_more && !edit) {
            page = page + 1
            this.setData({
                is_loading: true,
            })
            api.collectList({page})
            .then((res) => {
                this.setData({
                    has_more: res.has_more,
                    is_loading: false,
                    collect_list: collect_list.concat(res.list),
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