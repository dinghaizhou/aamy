//app.js
import * as api from './wxapi/main.js'
App({
    globalData: {
        userInfo: null
    },
    onLaunch: function () {
        
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
    },
    getUserInfo() {
        return new Promise((reslove, reject) => {
            api.getKolUserInfo()
            .then((res) => {
                this.globalData.userInfo = res
                reslove(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    onShow() {

    }
})