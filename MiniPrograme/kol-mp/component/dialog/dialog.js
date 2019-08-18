// component/dialog/dialog.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        istrue: {
            type: Boolean,
            value: false,
        },
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的初始数据
     */
    data: {
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        openDialog: function () {
            this.setData({
                istrue: true
            })
        },
        closeDialog: function () {
            console.log(33333)
            this.setData({
                istrue: false
            })
        }
    }
})
