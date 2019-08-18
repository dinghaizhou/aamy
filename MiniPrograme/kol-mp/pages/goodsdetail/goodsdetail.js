// pages/goodsdetail/goodsdetail.js
import * as api from '../../wxapi/main.js'
import CONFIG from '../../config.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        detail: null,
        collect_url: '../../images/shoucang_01@3x.png',
        has_collect: false,
        show_dialog: false,
        content: '',
        contentCount: 0,
        files: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = 20
        // let id = options.id
        api.getResourceDetail({id}, true)
        .then((res) => {
            this.setData({
                detail: res,
                id,
                has_collect: res.has_collect
            })
        })
        this.setData({
            selectFile: this.selectFile.bind(this),
            uplaodFile: this.uplaodFile.bind(this)
        })
    },
    collect() {
        let param, url;
        if(this.data.has_collect) {
            param = {goods_ids: [this.data.id]}
            url = 'calcelCollect'
        } else {
            param = {goods_id: this.data.id}
            url = 'addCollect'
        }
        api[url](param,true)
        .then((res) => {
            this.setData({
                has_collect: !this.data.has_collect
            })
        })
        .catch((res) => {
            console.log(res)
        })
        
    },
    // 字体长度
    handleContentInput(e) {
        const value = e.detail.value
        let content = value
        let contentCount = value.length  //计算已输入的正文字数
        this.setData({
            content,
            contentCount
        })
    },
    applyOrder() {
        this.setData({
            show_dialog: true
        })
    },

    // 图片上传
    selectFile(files) {
        console.log('files', files)
    },
    uplaodFile(files) {
        return new Promise((resolve, reject) => {
            var promises = files.tempFilePaths.map((path) => {
                return  this.uploadImg(path)
            })
            Promise.all(promises)
            .then((res) => {
                console.log(res)
                resolve({urls: res.map(_=>_.url), data: res})
            })
            .catch((error) => {
                reject('upload fail', error)
            })
        })
    },
    uploadError(e) {
        console.log('upload error', e.detail)
    },
    uploadSuccess(e) {
        this.setData({
            files: this.data.files.concat(e.detail.data)
        })
    },
    deleteFile(e) {
        let files = this.data.files
        console.log(e.detail.index, files)
        files.splice(e.detail.index,1)
        this.setData({
            files
        })
    },
    uploadImg(file) {
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: CONFIG.API_BASE_URL + '/file/uploadOne', //仅为示例，非真实的接口地址
                filePath: file,
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
    
    confirmApply() {
        let {files, content, id} = this.data
        if(files.length == 0 || !content.trim()) {
            wx.showToast({
                title: '请完善信息',
                icon: 'none',
                duration: 2000
            })
            return 
        }
        api.applyOrder({
            goods_id: id,
            note: content,
            img_ids: files.map(_ => _.id)
        }, true)
        .then((res) => {
            console.log(res)
            this.setData({
                show_dialog: false
            })
        })
        .catch(() => {

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