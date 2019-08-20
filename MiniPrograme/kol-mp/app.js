//app.js
import * as api from './wxapi/main.js'
App({
    globalData: {
        userInfo: null
    },
    onLaunch: function () {
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        },
                        fail: res => {
                            console.log(res)
                        }
                    })
                }
            }
        })
    },
    getUnreadCount() {
        api.getUnreadCount()
        .then((res) => {
            wx.setStorageSync('msg_count', res.unread_count);
            if(res.unread_count > 0) {
                wx.setTabBarBadge({
                    index: 1,
                    text: res.unread_count + ''
                })
            }
        })
    }
})