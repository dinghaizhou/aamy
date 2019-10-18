// component/cutdown/cutdown.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        deadline: {
            type: String,
            value: ''
        }
    },
    options: {
        addGlobalClass: true
    },
    lifetimes: {
        attached: function() {
            this.showTime()
            // 在组件实例进入页面节点树时执行
        },
        detached: function() {
            // 在组件实例被从页面节点树移除时执行
        }
        // observers: {
        //     'deadline': function(numberA, numberB) {
        //         // 在 numberA 或者 numberB 被设置时，执行这个函数
        //         this.setData({
        //         sum: numberA + numberB
        //         })
        //     }
        // }
    },

    /**
     * 组件的初始数据
     */
    data: {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showTime() {
            var _this = this
            let time_left = this.data.deadline*1

            var set = setInterval(setTime, 1000)
            function setTime() {
                if(time_left >= 0) {
                    let day = parseInt(time_left/24/60/60)
                    var hour = parseInt(time_left/60/60%24);
                    var minute = parseInt(time_left/60%60);
                    var second = parseInt(time_left%60);
                    _this.setData({
                        day,
                        hour: _this.addZero(hour,2,0),
                        minute: _this.addZero(minute,2,0),
                        second: _this.addZero(second,2,0),
                    })
                } else {
                    clearInterval(set)
                    _this.setData({
                        beyond_deadline: true
                    })
                }
                time_left = time_left - 1
            }
        },  
        addZero(str, len, ch) {
            str = String(str);
            var i = -1;
            if (!ch && ch !== 0) ch = ' ';
            len = len - str.length;
            while (++i < len) {
                str = ch + str;
            }
            return str;
        }
    }
})
