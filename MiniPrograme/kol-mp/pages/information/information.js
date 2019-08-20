// pages/information/information.js
import * as api from '../../wxapi/main.js'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        information: null,
        fans_count_arr: [
            {value: '1', name: '10万以内'},
            {value: '2', name: '10万~50万'},
            {value: '3', name: '50万以上'},
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    changeDsp(e) {
        let index = e.currentTarget.dataset.index
        var dsp = this.data.information.dsp_list[index]
        wx.setStorageSync('dsp', dsp);
        wx.navigateTo({
            url: '/pages/dspinfo/dspinfo?id=' + dsp.id,
            success: (result) => {
                
            },
            fail: () => {},
            complete: () => {}
        });
    },
    addDsp() {
        wx.navigateTo({
            url: '/pages/dspinfo/dspinfo',
            success: (result) => {
                
            },
            fail: () => {},
            complete: () => {}
        });
    },
    goToEdit(e) {
        let type = e.currentTarget.dataset.type
        wx.navigateTo({
            url: '/pages/edit/edit?type=' + type,
            success: (result) => {
                
            },
            fail: () => {},
            complete: () => {}
        });
    },
    goToRegion() {
        wx.navigateTo({
            url: '/pages/region/region',
            success: (result) => {
                
            },
            fail: () => {},
            complete: () => {}
        });
    },
    goToGender() {
        wx.navigateTo({
            url: '/pages/gender/gender',
            success: (result) => {
                
            },
            fail: () => {},
            complete: () => {}
        });
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
        api.getKolUserInfo()
        .then((res) => {
            let userInfo = app.globalData.userInfo
            if(!res.avatar_url) {
                res.avatar_url = userInfo.avatarUrl
                res.nick_name = userInfo.nickName
            }
            this.setData({
                information: res
            })
            wx.setStorageSync('information', res)
        })
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