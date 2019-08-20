// component/orderCard/orderCard.js
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
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        goToDetail() {
            let product = this.data.product
            if(product.msg_status == 1) {
                let msg_count = wx.getStorageSync('msg_count');
                msg_count = msg_count - 1
                wx.setStorageSync('msg_count', msg_count);
                if(msg_count == 0) {
                    wx.removeTabBarBadge({
                        index: 1,
                    })
                } else {
                    wx.setTabBarBadge({
                        index: 1,
                        text: msg_count + ''
                    })
                }
                product.msg_status = 0
                this.setData({
                    product
                })
            }
            wx.navigateTo({
                url: '/pages/goodsdetail/goodsdetail?order_id=' + product.id + '&id=' + product.goods_id,
            });
        }
    }
})
