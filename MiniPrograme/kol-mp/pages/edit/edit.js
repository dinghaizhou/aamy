// pages/edit/edit.js
import * as api from '../../wxapi/main.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value:'',
        type: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let type = options.type ? options.type : ''
        let information = wx.getStorageSync('information');
        let title, value;
        value = information[type] ? information[type]:''
        if(type == 'phone') {
            title = '联系方式'
        }
        if(type == 'nick_name') {
            title = '昵称'
        }
        this.setData({
            value,
            type
        })

        wx.setNavigationBarTitle({
            title
        })
    },
    save() {
        let {value, type} = this.data
        if(type == 'phone') {
            if(!(/^1[3456789]\d{9}$/.test(value))){ 
                wx.showToast({
                    title: '请填写正确的电话号码',
                    icon: 'none',
                    duration: 1500,
                    mask: true
                })
                return false; 
            }
        }

        api.updateKolUser({
            [type]: value
        })
        .then((res) => {
            wx.navigateBack({
                delta: 1
            });
              
        })
    },
    inputChange(e) {
        this.setData({
            value: e.detail.value
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