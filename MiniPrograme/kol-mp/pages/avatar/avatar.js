// pages/avatar/avatar.js
import CONFIG from '../../config.js'
import * as api from '../../wxapi/main.js'
let app =  getApp();
  
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url:'',
        img: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let information = app.globalData.userInfo
        this.setData({
            url: information.avatar_url
        })
        wx.setNavigationBarTitle({
            title: '头像'
        })
    },
    changeAvatar() {
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (result) => {
                wx.showToast({
                    title: '上传中',
                    icon: 'none',
                    duration: 10000,
                    mask: false,
                });
                this.uploadImg(result.tempFilePaths[0])
                .then((res) => {
                    this.setData({
                        url: res.url,
                        img: res
                    })
                    wx.hideToast();
                })
                .catch(() => {
                    wx.hideToast();
                    wx.showToast({
                        title: '上传图片失败',
                        icon: 'none',
                        duration: 1500,
                        mask: false,
                    });   
                })
                
            },
            fail: () => {
                wx.showToast({
                    title: '选择图片失败',
                    icon: 'none',
                    duration: 1500,
                    mask: false,
                });
            },
            complete: () => {}
        });
    },
    save() {
        let { img } = this.data
        api.updateKolUser({
            avatar_id: img.id
        })
        .then((res) => {
            wx.navigateBack({
                delta: 1
            });
              
        })
    },
    preview() {
        let { url } = this.data
        wx.previewImage({
            current: url,
            urls: [url],
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
    uploadImg(filePath) {
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: CONFIG.API_BASE_URL + '/file/uploadOne',
                filePath,
                header: {
                    'miniprogram-api-token': wx.getStorageSync('token')
                },
                name: 'file',
                success: function(res){
                    var data = JSON.parse(res.data).data
                    resolve(data)
                },
                fail(res) {
                    reject(res)
                },
                complete() {
                    
                }
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