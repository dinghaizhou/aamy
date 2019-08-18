// pages/order/order.js
import * as api from '../../wxapi/main.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        left_value: '98rpx',
        left_value: '12.5%',
        index: '1',
        list_1: null,
        list_2: null,
        list_3: null,
        list_4: null,
        list: [],
        has_more: false
    },
    switchIndex(e) {
        let index = e.target.dataset.index 
        let left_value = 12.5 + (index*1 - 1)*25 + '%'
        let list = this.data['list_' + index].list
        let has_more = this.data['list_' + index].has_more
        this.setData({
            index,
            left_value,
            list,
            has_more
        })

        // if(index == 1) {
        //     list = this.data.type_1.list
        //     has_more = this.data.type_1.has_more
        //     status = 1
        // } else {
        //     list = this.data.type_2.list
        //     has_more = this.data.type_2.has_more
        //     status = 2
        // }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initList()
    },
    initList() {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
        })
        Promise.all([api.getOrderList({status: 1, page_size: 2}),api.getOrderList({status: 2,page_size: 2}),api.getOrderList({status: 3,page_size: 2}),api.getOrderList({status: 4,page_size: 2})])
        .then((res) => {
            wx.hideToast({
                title: '加载中',
                icon: 'loading',
                duration: 10000
            })
            this.setData({
                list_1: {
                    page: 1,
                    ...res[0]
                },
                list_2: {
                    page: 1,
                    ...res[1]
                },
                list_3: {
                    page: 1,
                    ...res[2]
                },
                list_4: {
                    page: 1,
                    ...res[3]
                },
                list: res[0].list,
                has_more: res[0].has_more
            })
        })
        .catch((res) => {
            
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
        let { index } = this.data
        api.getResourceList({status: index*1 - 1, page_size: 2, page: 1}, true)
        .then((res) => {
            wx.stopPullDownRefresh()
            this.setData({
                ['list_' + index]: {
                    page: 1,
                    list: res.list,
                    has_more: res.has_more,
                },
                list: res.list,
                has_more: res.has_more 
            })
        })
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