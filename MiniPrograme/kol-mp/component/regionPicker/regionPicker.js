// component/regionPicker/regionPicker.js
import * as api from '../../wxapi/main.js'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: {
            type: Array,
            value: [],
            observer: function observer(newVal) {
                if(this.data.first_time) {
                    clearTimeout(this.time)
                    this.time = setTimeout(() => {
                        this.bindValueChange(newVal)
                    }, 500)
                }
            }
        }
    },
    

    /**
     * 组件的初始数据
     */
    data: {
        multiArray: [[],[]],
        multiIndex: [0, 0],
        resultArray: [[],[]],
        resultIndex: [0, 0],
        province_data: null,
        city_data: {},
        first_time: true
    },
    lifetimes: {
        attached: function() {
            
        },
        detached: function() {

        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        bindMultiPickerColumnChange: function (e) {
            let {multiArray,multiIndex, city_data, province_data } = this.data
            multiIndex[e.detail.column] = e.detail.value;
            if(e.detail.column == 0) {
                let index = e.detail.value
                if(city_data[index]) {
                    multiArray[1] = city_data[index].map(item => item.name)
                    multiIndex[1] = 0;
                    this.setData({
                        multiArray,
                        multiIndex
                    });
    
                } else {
                    api.getRegion({pid: province_data[index].id})
                    .then((res) => {
                        multiIndex[1] = 0;
                        multiArray[1] = res.map(item => item.name)
                        city_data[index] = res
                        this.setData({
                            multiArray, multiIndex, city_data
                        })
                    })
                }
            } else {
                this.setData({
                    multiArray,
                    multiIndex
                });
            }
        },
        bindMultiPickerChange(e) {
            let {multiArray ,multiIndex } = this.data
            let value = e.detail.value
            this.setData({
                resultIndex: [...multiIndex],
                resultArray: [...multiArray],
                first_time: false
            })
            this.triggerEvent('regionChange', [multiArray[0][value[0]], multiArray[1][value[1]]])
        },
        bindPickerCancel(e) {
            let { resultArray ,resultIndex} = this.data
            this.setData({
                multiIndex: [...resultIndex],
                multiArray: [...resultArray]
            })
        },
        bindValueChange(value) {
            let { multiArray, city_data, multiIndex} = this.data
            if(value.length > 0 && value[0] && value[1]) {
                api.getRegion()
                .then((res_1) => {
                    var idx_1 = res_1.findIndex(item => value[0].includes(item.name))
                    var pid = res_1[idx_1].id
                    api.getRegion({pid}) 
                    .then((res_2) => {
                        var idx_2 = res_2.findIndex(item => value[1].includes(item.name))
                        city_data[pid] = res_2
                        multiArray[0] = res_1.map(item => item.name)
                        multiArray[1] = res_2.map(item => item.name)
                        multiIndex = [idx_1, idx_2]
                        this.setData({
                            province_data: res_1,
                            city_data,
                            multiArray,
                            multiIndex,
                            resultArray: [...multiArray],
                            resultIndex: [...multiIndex],
                        })
                    })
                })
            } else {
                Promise.all([api.getRegion(), api.getRegion({pid: 11})])
                .then((res) => {
                    multiArray[0] = res[0].map(item => item.name)
                    multiArray[1] = res[1].map(item => item.name)
                    city_data[0] =  res[1]
                    this.setData({
                        province_data: res[0],
                        city_data,
                        multiArray,
                        resultArray: [...multiArray]
                    })
                })
            }
        }
    }
})
