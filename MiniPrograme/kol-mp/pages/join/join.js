// pages/join/join.js
import * as api from '../../wxapi/main.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: '1',
        fans_count_arr: [],
        dsp_arr: [] ,
        gender_arr: [
            {id: '1', name: '男'},
            {id: '2', name: '女'},
        ],
        fans_count_index: '',
        dsp_index: '0',
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
        let {gender_index, phone, region, home_url, dsp_list, fans_count_arr, dsp_arr, fans_count_index, dsp_index} = this.data
        api.getDspCondition()
        .then((res) => {
            // 获取选择条件
            dsp_arr = res.dsp_list,
            fans_count_arr = res.fans_count_list
            wx.setStorageSync('dsp_arr', res.dsp_list);
            wx.setStorageSync('fans_count_arr', res.fans_count_list);

            // 获取已经填写的值，并赋值
            api.getKolUserInfo()
            .then((r) => {
                if(r.gender && r.gender != 0) {
                    gender_index = r.gender - 1
                }
                if(r.phone) phone = r.phone
                if(r.province) region[0] = r.province
                if(r.city) region[1] = r.city

                if(r.dsp_list.length > 0) {
                    let dsp = r.dsp_list[0]
                    home_url = dsp.home_url
                    for(var i in dsp_arr) {
                        if(dsp_arr[i].id == dsp.dsp_id) {
                            dsp_index = i
                            break
                        }
                    }
                    for(var i in fans_count_arr) {
                        if(fans_count_arr[i].id == dsp.fans_count) {
                            fans_count_index = i
                            break 
                        }
                    }
                    if(r.dsp_list.length > 1) {
                        let list = JSON.parse(JSON.stringify(r.dsp_list))
                        list.splice(0,1)
                        dsp_list = list
                    }
                }

                this.setData({
                    dsp_arr,
                    fans_count_arr,
                    gender_index,
                    phone,
                    region,
                    home_url,
                    dsp_index,
                    fans_count_index,
                    dsp_list
                })
            })
        })

        
    },
    addDsp() {
        let {fans_count_index, dsp_index, home_url, fans_count_arr, dsp_arr, dsp_list, phone, apply_note} = this.data
        if(!fans_count_index || !dsp_index ) {
            wx.showToast({
                title: '请先选择平台和粉丝量',
                icon: 'none',
                duration: 1000,
                mask: true
            })
            return 
        }
        if( !/^(http:\/\/|https:\/\/)/.test(home_url)) {
            wx.showToast({
                title: '请填写正确的主页链接',
                icon: 'none',
                duration: 1000,
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
            home_url: e.detail.value.trim()
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
        let {gender_index, region, fans_count_index, dsp_index, home_url, phone, apply_note, is_agree, dsp_list, fans_count_arr, dsp_arr, gender_arr} = this.data
        if(!fans_count_index || !dsp_index ) {
            wx.showToast({
                title: '请先选择平台和粉丝量',
                icon: 'none',
                duration: 1000,
                mask: true
            })
            return 
        }

        if( !/^(http:\/\/|https:\/\/)/.test(home_url)) {
            wx.showToast({
                title: '请填写正确的主页链接',
                icon: 'none',
                duration: 1000,
                mask: true
            })
            return 
        }
        if(!gender_index) {
            wx.showToast({
                title: '请选择性别',
                icon: 'none',
                duration: 1000,
                mask: true
            })
            return 
        }
        if(region.length == 0) {
            wx.showToast({
                title: '请选择地区',
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
        let list = JSON.parse(JSON.stringify(dsp_list))
        list.push({
            home_url,
            fans_count: fans_count_arr[fans_count_index].id,
            dsp_id: dsp_arr[dsp_index].id,
            fans_count_name: fans_count_arr[fans_count_index].name,
            dsp_name: dsp_arr[dsp_index].name
        })
        
        let has_same = false
        for(var i = 0;i < list.length - 1; i++) {
            if(has_same) break
            for(var j = i + 1; j < list.length; j++) {
                if(list[i].home_url == list[j].home_url) {
                    has_same = true
                    break;
                }
            }
        }
        if(has_same) {
            wx.showToast({
                title: '所填平台的主页链接不能完全相同',
                icon: 'none',
                duration: 1500,
                mask: true
            })
            return
        }
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
            dsp_list: list,
            gender: gender_arr[gender_index].id,
            province: region[0],
            city: region[1]
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
        wx.removeStorageSync('dsp_arr')
        wx.removeStorageSync('fans_count_arr')
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