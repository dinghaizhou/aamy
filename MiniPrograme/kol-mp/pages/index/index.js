// pages/mine/mine.js
import * as api from '../../wxapi/main.js'
let app =  getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        index: 1,
        type: 'online',
        fetch_type: 1,
        scrollTop: 0,
        list: [],
        page: 1,
        has_more: 0,

        type_1: null,
        type_2: null,
        type_3: null,
        is_loading: false      
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.getUnreadCount()
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.initList()
    },
    goToSearch() {
        wx.navigateTo({
            url: '/pages/search/search',
            success: (result) => {
                
            },
            fail: () => {},
            complete: () => {}
        });
    },
    search(e) {
        console.log(e,'out')
    },
    switchIndex(e) {
        let index = e.target.dataset.index 
        let list,has_more,fetch_type;
        if(index == 1) {
            list = this.data.type_1.list
            has_more = this.data.type_1.has_more
            fetch_type = 1
        } else {
            list = this.data.type_2.list
            has_more = this.data.type_2.has_more
            fetch_type = 2
        }
        this.setData({
            index,
            type: 'online',
            fetch_type,
            list,
            has_more
        })
    },
    switchType(e) {
        let type = e.target.dataset.type;
        let list,has_more,fetch_type;
        if(type == 'online') {
            list = this.data.type_2.list
            has_more = this.data.type_2.has_more
            fetch_type = 2
        } else {
            list = this.data.type_3.list
            has_more = this.data.type_3.has_more
            fetch_type = 3
        }
        this.setData({
            type,
            fetch_type,
            list,
            has_more
        })
    },
    initList() {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
        })
        Promise.all([api.getResourceList({type: 1}),api.getResourceList({type: 2}),api.getResourceList({type: 3})])
        .then((res) => {
            wx.hideToast({
                title: '加载中',
                icon: 'loading',
                duration: 10000
            })
            this.setData({
                type_1: {
                    page: 1,
                    ...res[0]
                },
                type_2: {
                    page: 1,
                    ...res[1]
                },
                type_3: {
                    page: 1,
                    ...res[2]
                },
                list: res[0].list,
                has_more: res[0].has_more
            })
        })
        .catch((res) => {
            
        })
    },
    getMore() {
        let { fetch_type } = this.data
        let item = this.data['type_' + fetch_type]
        item.page = item.page + 1 
        api.getResourceList({type: fetch_type, page: item.page})
        .then((res) => {
            this.setData({
                ['type_' + fetch_type]: {
                    page: item.page,
                    list: item.list.concat(res.list),
                    has_more: res.has_more,
                },
                is_loading: false,
                list: item.list.concat(res.list),
                has_more: res.has_more, 
            })
        })
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
        let { fetch_type } = this.data
        let item = this.data['type_' + fetch_type]
        item.page = 1 
        api.getResourceList({type: fetch_type, page: item.page}, true)
        .then((res) => {
            wx.stopPullDownRefresh()
            this.setData({
                ['type_' + fetch_type]: {
                    page: item.page,
                    list: res.list,
                    has_more: res.has_more,
                },
                list: res.list,
                has_more: res.has_more, 
            })
        })
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let {has_more, fetch_type} = this.data
        let item = this.data['type_' + fetch_type]
        if(has_more) {
            item.page = item.page++
            this.setData({
                is_loading: true,
                ['type_' + fetch_type]: item
            })
            this.getMore()
        }
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    }
  })