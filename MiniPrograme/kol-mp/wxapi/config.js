const API_BASE_URL = 'http://kol.com/miniprogram'

const request = (url, method, data, loading) => {
    let _url = API_BASE_URL + url
    if(loading) {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000,
            mask: true
        })
    }
    return new Promise((resolve, reject) => {
        console.log(data)
        wx.request({
            url: _url,
            method: method,
            data: data,
            header: {
                'miniprogram-api-token': wx.getStorageSync('token')
            },
            success(request) {
                if(loading){
                    wx.hideToast({
                        title: '加载中',
                        icon: 'loading',
                        duration: 10000,
                        mask: true
                    })
                }
                let code = request.data.code
                switch (code) {
                    case 0: resolve(request.data.data);break;
                    default: 
                        wx.showToast({
                            title: request.data.msg?request.data.msg:'网络异常',
                            icon: 'none',
                            duration: 2000
                        })
                        reject(request.data)
                }
            },
            fail(error) {
                wx.showToast({
                    title: '网络异常',
                    icon: 'none',
                    duration: 2000
                })
                reject(error)
            },
            complete(res) {

            }
        })
    })
}

export default request
