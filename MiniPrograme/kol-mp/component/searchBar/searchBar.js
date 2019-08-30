// component/searchBar.js
Component({
    /**
     * 组件的属性列表
     */
    options: {
        addGlobalClass: true
    },
    properties: {
        fix: {
            type: Boolean,
            value: false,
            first: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        inputShowed: false,
        inputVal: ""
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showInput: function () {
            if(!this.data.fix) {
                this.setData({
                    inputShowed: true
                });
            }
        },
        hideInput: function () {
            this.setData({
                inputVal: "",
                inputShowed: false
            });
        },
        clearInput: function () {
            this.setData({
                inputVal: ""
            });
            this.triggerEvent('input', '')
        },
        inputTyping: function (e) {
            this.setData({
                inputVal: e.detail.value
            });
            this.triggerEvent('input', e.detail.value)
        },
        search() {
            this.triggerEvent('search')
        }
    }
})
