// pages/auth/auth.js
import * as api from '../../wxapi/main.js'
let app =  getApp();
  
Page({
    /**
     * 页面的初始数据
     */
    data: {
            canIUse: wx.canIUse('button.open-type.getUserInfo'),

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    setInformation(userInfo) {
        let params = {}
        params.avatar_url = userInfo.avatarUrl
        params.nick_name = userInfo.nickName
        app.globalData.userInfo.avatar_url = userInfo.avatarUrl
        app.globalData.userInfo.nick_name = userInfo.nickName
        
        api.updateKolUser(params, true)
        .then(() => {
            wx.redirectTo({
                url: '/pages/join/join',
                success: (result) => {
                    
                },
                fail: () => {},
                complete: () => {}
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