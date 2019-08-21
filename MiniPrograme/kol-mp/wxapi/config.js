import CONFIG from '../config.js'
const request = (url, method, data, loading) => {
    let _url = CONFIG.API_BASE_URL + url
    if(loading) {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000,
            mask: true
        })
    }
    return new Promise((resolve, reject) => {
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
                    case -1:
                        wx.navigateTo({
                            url: '/pages/login/login',
                            success: (result) => {
                                
                            },
                            fail: () => {},
                            complete: () => {}
                        });
                        reject(request.data);
                        break;
                      
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
                    title: error.errMsg ? error.errMsg : '网络异常',
                    icon: 'none',
                    duration: 2000
                })
                console.log(error)
                reject(error)
            },
            complete(res) {

            }
        })
    })
}

export default request
