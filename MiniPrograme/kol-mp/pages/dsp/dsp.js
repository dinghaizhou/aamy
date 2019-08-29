// pages/join/join.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fans_count_arr: wx.getStorageSync('fans_count_arr') ? wx.getStorageSync('fans_count_arr'): [],
        dsp_arr: wx.getStorageSync('dsp_arr') ? wx.getStorageSync('dsp_arr'): [] ,
        fans_count_index: '',
        dsp_index: '0',
        home_url: '',
        dsp_list: [],
        index: ''
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let {fans_count_index, dsp_index, home_url, dsp_arr, fans_count_arr} = this.data
        let dsp_list = wx.getStorageSync('dsp_list');
        let index = options.index
        if(index) {
            let dsp = dsp_list[index*1]
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
        }
        this.setData({
            index,
            dsp_list,
            fans_count_index,
            dsp_index,
            home_url
        })
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
        let { home_url,fans_count_index,dsp_index, index, dsp_list,fans_count_arr,dsp_arr} = this.data
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

        if(index) {
            dsp_list[index*1] = {
                home_url,
                fans_count: fans_count_arr[fans_count_index].id,
                dsp_id: dsp_arr[dsp_index].id,
                fans_count_name: fans_count_arr[fans_count_index].name,
                dsp_name: dsp_arr[dsp_index].name
            }
        } else {
            dsp_list.push(
                {
                    home_url,
                    fans_count: fans_count_arr[fans_count_index].id,
                    dsp_id: dsp_arr[dsp_index].id,
                    fans_count_name: fans_count_arr[fans_count_index].name,
                    dsp_name: dsp_arr[dsp_index].name
                }
            )
        }
        wx.setStorageSync('dsp_list', dsp_list);
        wx.navigateBack({
            delta: 1
        });
    },
    del() {
        var _this = this
        wx.showModal({
            title: '确定删除？',
            success (res) {
                if (res.confirm) {
                    let { index, dsp_list } = _this.data
                    if(index) {
                        dsp_list.splice(index*1, 1)
                        wx.setStorageSync('dsp_list', dsp_list);
                    }
                    wx.navigateBack({
                        delta: 1
                    });
                } else if (res.cancel) {

                }
            }
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