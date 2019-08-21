
import * as api from '../../wxapi/main.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
        fans_count_index: '',
        dsp_index: '',
        home_url: ''
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.index = options.index

        if(this.index) {
            let information = wx.getStorageSync('information');

            let dsp = information.dsp_list[this.index]
            this.id = dsp.id

            let {fans_count_index, dsp_index, home_url, dsp_arr, fans_count_arr} = this.data
            home_url = dsp.home_url
            for(var i in dsp_arr) {
                if(dsp_arr[i].value == dsp.dsp_id) {
                    dsp_index = i
                    break
                }
            }
            for(var i in fans_count_arr) {
                if(fans_count_arr[i].value == dsp.fans_count) {
                    fans_count_index = i
                    break 
                }
            }
            this.setData({
                dsp,
                fans_count_index,
                dsp_index,
                home_url
            })
        }
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
    save() {
        let { home_url,fans_count_index,dsp_index,fans_count_arr,dsp_arr} = this.data
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

        if(this.index) {
            api.updateKolDsp({
                id: this.id,
                home_url,
                fans_count: fans_count_arr[fans_count_index].value,
                dsp_id: dsp_arr[dsp_index].value,
                fans_count_name: fans_count_arr[fans_count_index].name,
                dsp_name: dsp_arr[dsp_index].name
            })
            .then((res) => {
                wx.navigateBack({
                    delta: 1
                });
            })
        } else {
            api.saveKolDsp({
                home_url,
                fans_count: fans_count_arr[fans_count_index].value,
                dsp_id: dsp_arr[dsp_index].value,
                fans_count_name: fans_count_arr[fans_count_index].name,
                dsp_name: dsp_arr[dsp_index].name
            }) 
            .then(() => {
                wx.navigateBack({
                    delta: 1
                });
            })
        }
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
        wx.removeStorageSync('dsp');
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        wx.removeStorageSync('dsp');
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