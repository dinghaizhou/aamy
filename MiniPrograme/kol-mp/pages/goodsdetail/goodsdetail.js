// pages/goodsdetail/goodsdetail.js
import * as api from '../../wxapi/main.js'
import CONFIG from '../../config.js'
let app =  getApp();
  
Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        detail: null,
        collect_url: '../../images/shoucang_01@3x.png',
        has_collect: false,
        apply_dialog: false,
        show_auth_dialog: false,
        reason_dialog: false, 
        content: '',
        contentCount: 0,
        phone: '',
        price: '',
        priceCount: 0,
        phoneCount: 0,
        files: [],
        share_type: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.id = options.id
        this.order_id = options.order_id ? options.order_id : ''
        let share_type = options.type ? options.type  : ''
        if(!wx.getStorageSync('token') && share_type == 'goods') {
            wx.login({
                success: res => {
                    api.login({code: res.code}, true)
                    .then((res) => {
                        wx.setStorageSync('token', res['miniprogram-api-token'])
                        app.getUserInfo()
                        this.getDetails()
                    })
                }
            })
        } else {
            this.getDetails()
            if(share_type == 'goods') {app.getUserInfo()}
        }

        this.setData({
            share_type,
            selectFile: this.selectFile.bind(this),
            uplaodFile: this.uplaodFile.bind(this)
        })
    },
    goToIndex() {
        wx.switchTab({
            url: '/pages/index/index',
            success: (result) => {
                
            },
            fail: () => {},
            complete: () => {}
        });
          
    },
    getDetails() {
        let params = {}
        params.id = this.id
        if(this.order_id) {
            params.order_id = this.order_id
        }
        api.getResourceDetail(params, true)
        .then((res) => {
            let title = res.type == 1 ? '商品详情' : '活动详情'
            wx.setNavigationBarTitle({
                title
            })
            this.setData({
                detail: res,
                has_collect: res.has_collect
            })
        })
    },
    collect() {
        let param, url;
        if(this.data.has_collect) {
            param = {goods_ids: [this.id]}
            url = 'calcelCollect'
        } else {
            param = {goods_id: this.id}
            url = 'addCollect'
        }
        api[url](param,true)
        .then((res) => {
            if(url == 'addCollect') {
                wx.showToast({
                    title: '收藏成功',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: true
                });
            } else {
                wx.showToast({
                    title: '取消收藏',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: true
                });
            }
            this.setData({
                has_collect: !this.data.has_collect
            })
        })
        .catch((res) => {
              
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
    handlePriceInput(e) {
        const value = e.detail.value
        let price = value
        let priceCount = value.length  //计算已输入的正文字数
        this.setData({
            price,
            priceCount
        })
    },
    handlePhoneInput(e) {
        const value = e.detail.value
        let phone = value
        let phoneCount = value.length  //计算已输入的正文字数
        this.setData({
            phone,
            phoneCount
        })
    },
    
    applyOrder() {
        let auth_status = this.data.detail.auth_status 
        if(auth_status == 3) {
            this.setData({
                apply_dialog: true
            })
        } else {
            this.setData({
                show_auth_dialog: true
            })
        }
    },

    // 图片上传
    selectFile(files) {
    },
    uplaodFile(files) {
        return new Promise((resolve, reject) => {
            var promises = files.tempFilePaths.map((path) => {
                return  this.uploadImg(path)
            })
            Promise.all(promises)
            .then((res) => {
                resolve({urls: res.map(_=>_.url), data: res})
            })
            .catch((error) => {
                reject('upload fail', error)
            })
        })
    },
    uploadError(e) {
    },
    uploadSuccess(e) {
        this.setData({
            files: this.data.files.concat(e.detail.data)
        })
    },
    deleteFile(e) {
        let files = this.data.files
        files.splice(e.detail.index,1)
        this.setData({
            files
        })
    },
    uploadImg(file) {
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: CONFIG.API_BASE_URL + '/file/uploadOne',
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
        let {files, content, detail, phone, price} = this.data
        if(!price) {
            wx.showToast({
                title: '请填写报价',
                icon: 'none',
                duration: 1000,
                mask: true
            })
            return 
        }
        if(!(/^1[3456789]\d{9}$/.test(phone))){ 
            wx.showToast({
                title: '请填写正确的电话号码',
                icon: 'none',
                duration: 1500,
                mask: true
            })
            return false; 
        } 
        api.applyOrder({
            price,
            phone,
            goods_id: this.id,
            note: content,
            img_ids: files.map(_ => _.id)
        }, true)
        .then((res) => {
            // 改变上个页面的商品状态
            let currentPages =  getCurrentPages();
            if(currentPages.length > 1) {
                let prevPage = currentPages[currentPages.length - 2];    // 上一个页面
                if(prevPage.route == 'pages/index/index') {
                    let list =  prevPage.data.list
                    for(let item of list) {
                        if(item.id == this.id) {
                            item.order_status = 1
                        }
                    }
                    prevPage.setData({
                        list                     
                    })
                }
            }   

            //  
            wx.showToast({
                title: '您的申请已提交',
                icon: 'success',
                duration: 1500,
                mask: true
            })
            detail.order_status = 1
            this.setData({
                apply_dialog: false,
                detail
            })
        })
        .catch(() => {

        })
    },
    toJoin() {
        console.log(app.globalData.userInfo)
        if(app.globalData.userInfo && app.globalData.userInfo.avatar_url){
            wx.navigateTo({
                url: '/pages/join/join',
                success: (result) => {
                    
                },
                fail: () => {},
                complete: () => {}
            });
        } else {
            wx.navigateTo({
                url: '/pages/auth/auth',
                success: (result) => {
                    
                },
                fail: () => {},
                complete: () => {}
            });
        }
    },
    showReason() {
        this.setData({
            reason_dialog: true
        })
    },
    applyAgain() {
        this.setData({
            reason_dialog: false,
            apply_dialog: true
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
        return {
            title: '你的好友给您KOL资源',
            path: '/pages/goodsdetail/goodsdetail?id=' + this.id + '&type=goods'
        }
    }
})