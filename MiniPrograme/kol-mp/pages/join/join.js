// pages/join/join.js
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
        fans_count_index: '',
        dsp_index: '',
        is_agree: true
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
  
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