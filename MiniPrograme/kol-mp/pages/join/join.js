// pages/join/join.js
import * as api from '../../wxapi/main.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: '1',
        fans_count_arr: [
            {value: '1', name: '10万以内'},
            {value: '2', name: '10万~50万'},
            {value: '3', name: '50万以上'},
        ],
        dsp_arr: [
            {value: '1', name: '抖音'},
            {value: '2', name: '小红书'},
            {value: '3', name: '火山'},
            {value: '4', name: '微博'},
            {value: '5', name: '其他'},
        ],
        gender_arr: [
            {value: '1', name: '男'},
            {value: '2', name: '女'},
        ],
        fans_count_index: '',
        dsp_index: '',
        home_url: '',
        phone: '',
        apply_note: '',
        is_agree: false,
        show_dialog: false,
        dsp_list:[],
        region: [],
        gender_index: '',
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    addDsp() {
        let {fans_count_index, dsp_index, home_url, fans_count_arr, dsp_arr, dsp_list, phone, apply_note} = this.data
        if(!fans_count_index || !dsp_index ) {
            wx.showToast({
                title: '请先选择平台和粉丝量',
                icon: 'none',
                duration: 2000,
                mask: true
            })
            return 
        }
        if( !/^(http:\/\/|https:\/\/)/.test(home_url)) {
            wx.showToast({
                title: '请填写正确的主页链接',
                icon: 'none',
                duration: 2000,
                mask: true
            })
            return 
        }
        wx.setStorageSync('dsp_list', this.data.dsp_list);
        wx.navigateTo({
            url: '/pages/dsp/dsp',
            success: (result) => {
                
            },
            fail: () => {},
            complete: () => {}
        });
    },
    linkChange(e) {
        this.setData({
            home_url: e.detail.value
        })
    },
    bindCountChange(e) {
        this.setData({
            fans_count_index: e.detail.value
        })
    },
    bindDspChange(e) {
        this.setData({
            dsp_index: e.detail.value
        })
    },
    bindGenderChange(e) {
        this.setData({
            gender_index: e.detail.value
        })
    },
    bindRegionChange: function (e) {
        this.setData({
            region: e.detail
        })
    },
    checkboxChange(e) {
        let is_agree;
        if(e.detail.value.length > 0) {
            is_agree = true
        } else {
            is_agree = false
        }
        this.setData({
            is_agree
        })
    },
    showContract() {
        this.setData({
            show_dialog: true
        })
    },
    toDspDetail(e) {
        wx.setStorageSync('dsp_list', this.data.dsp_list);
        wx.navigateTo({
            url: '/pages/dsp/dsp?index=' + e.currentTarget.dataset.index,
            success: (result) => {
                
            },
            fail: () => {},
            complete: () => {}
        });
    },
    phoneChange(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    noteChange(e) {
        this.setData({
            apply_note: e.detail.value
        })
    },
    submit() {
        let {gender_index, region, fans_count_index, dsp_index, home_url, phone, apply_note, is_agree, dsp_list, fans_count_arr, dsp_arr} = this.data
        if(!fans_count_index || !dsp_index ) {
            wx.showToast({
                title: '请先选择平台和粉丝量',
                icon: 'none',
                duration: 2000,
                mask: true
            })
            return 
        }
        if( !/^(http:\/\/|https:\/\/)/.test(home_url)) {
            wx.showToast({
                title: '请填写正确的主页链接',
                icon: 'none',
                duration: 2000,
                mask: true
            })
            return 
        }
        if(!gender_index) {
            wx.showToast({
                title: '请选择性别',
                icon: 'none',
                duration: 2000,
                mask: true
            })
            return 
        }
        if(region.length == 0) {
            wx.showToast({
                title: '请选择地区',
                icon: 'none',
                duration: 2000,
                mask: true
            })
            return 
        }
        if(!(/^1[3456789]\d{9}$/.test(phone))){ 
            wx.showToast({
                title: '请填写正确的电话号码',
                icon: 'none',
                duration: 2000,
                mask: true
            })
            return false; 
        } 
        let list = JSON.parse(JSON.stringify(dsp_list))

        list.push({
            home_url,
            fans_count: fans_count_arr[fans_count_index].value,
            dsp_id: dsp_arr[dsp_index].value,
            fans_count_name: fans_count_arr[fans_count_index].name,
            dsp_name: dsp_arr[dsp_index].name
        })

        if(!is_agree) {
            wx.showToast({
                title: '请同意入驻协议',
                icon: 'none',
                duration: 2000,
                mask: true
            })
            return
        }
        api.KolUserAuth({
            phone,
            apply_note,
            dsp_list: list
        },true)
        .then((res) => {
            wx.switchTab({
                url: '/pages/index/index',
                success: (result) => {
                    
                },
                fail: () => {},
                complete: () => {}
            });
        })
        .catch((error) => {
            console.log(error)
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
        var dsp_list = wx.getStorageSync('dsp_list');
        if(dsp_list) {
            this.setData({
                dsp_list
            })
        }
        wx.removeStorageSync('dsp_list');
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