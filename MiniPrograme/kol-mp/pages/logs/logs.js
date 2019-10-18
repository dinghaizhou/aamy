//logs.js
const util = require('../../utils/util.js')

Page({
    data: {
        region: ['辽宁', '沈阳']
    },
    onLoad: function () {
        
    },
    bindRegionChange(e) {
        console.log(e)
    }
})
