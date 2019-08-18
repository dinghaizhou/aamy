// component/productCard/productCard.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        product: {
            type: Object,
            value: {}
        }
    },
    options: {
        addGlobalClass: true
    },

    /**
     * 组件的初始数据
     */
    data: {
        
        beyond_deadline: false
    },
    /**
     * 组件的方法列表
     */
    lifetimes: {
        attached: function() {
            // 在组件实例进入页面节点树时执行
        },
        detached: function() {
            console.log('detached')
            // 在组件实例被从页面节点树移除时执行
        },
    },
    methods: {
        goToDetails() {
            console.log(3)
            wx.navigateTo({
                url: '/pages/goodsdetail/goodsdetail?id=' + this.data.product.id,
                success: (result) => {
                    
                },
                fail: () => {},
                complete: () => {}
            });
              
        }
    }
})
