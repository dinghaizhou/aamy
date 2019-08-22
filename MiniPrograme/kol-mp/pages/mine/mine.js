// pages/mine/mine.js
import * as api from '../../wxapi/main.js'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    data: {
        userInfo: {},
        hasUserInfo: false,
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
        // // 获取后台存储用户信息
        // api.getKolUserInfo()
        // .then((res) => {
        //     this.setData({
        //         information: res
        //     })
        // })

        // 调微信接口获取用户信息
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
                })
            }
        } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function(e) {
        if(e.detail.userInfo) {
            app.globalData.userInfo = e.detail.userInfo
            this.setInformation()
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            })
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
    setInformation() {
        let { information } = this.data
        let params = {}
        if(!information.avatar_url) {
            params.avatar_url = app.globalData.userInfo.avatarUrl
        }
        if(!information.nick_name) {
            params.nick_name = app.globalData.userInfo.nickName
        }
        api.updateKolUser(params, true)
        .then((res) => {
            information.avatar_url = app.globalData.userInfo.avatarUrl
            information.nick_name = app.globalData.userInfo.nickName

            this.setData({
                information
            })
        })
    },
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
        api.getKolUserInfo()
        .then((res) => {
            this.setData({
                information: res
            })
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