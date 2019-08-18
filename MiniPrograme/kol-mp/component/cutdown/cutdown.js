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
            console.log(this.data)
            console.log(this.data.deadline,1)
            this.showTime()
            // 在组件实例进入页面节点树时执行
        },
        detached: function() {
            console.log('detached')
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
            let deadline = new Date(this.data.deadline.replace(/-/g,'/')).getTime();
            let set = setInterval(setTime, 1000)
            var _this = this
            function setTime() {
                let now = new Date().getTime()
                let time_left = parseInt((deadline - now)/1000)
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
