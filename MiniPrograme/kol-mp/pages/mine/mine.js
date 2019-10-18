// pages/mine/mine.js
import * as api from '../../wxapi/main.js'
let app =  getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        information: null
    },
    goToCollect: function() {
        wx.navigateTo({
          url: '../collect/collect'
        })
    },
    goToInformation: function () {
        wx.navigateTo({
            url: '../information/information'
        })
    },
    onLoad: function () {
        
    },
    getUserInfo: function(e) {
        if(e.detail.userInfo) {
            this.setInformation(e.detail.userInfo)
        } else {
            wx.showToast({
                title: '需要获取您的昵称和头像用于展示',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {
                    
                },
                fail: () => {},
                complete: () => {}
            }); 
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    setInformation(userInfo) {
        let { information } = this.data
        let params = {}
        params.avatar_url = userInfo.avatarUrl
        params.nick_name = userInfo.nickName
        this.setData({
            information: {...information, ...params}
        })
        api.updateKolUser(params, true)
    },
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            information: app.globalData.userInfo
        })
    },
    imageError(e) {
        console.log(e)
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