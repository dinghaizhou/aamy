import request from './config'
// 登陆
export const login = (data,loading = false) => request('/kol_user/login', 'post', data, loading)
// 资源列表
export const getResourceList = (data, loading =false) => request('/goods/index', 'get', data, loading)
// 资源详情
export const getResourceDetail = (data, loading =false) => request('/goods/info', 'get', data, loading)



/**
 * 收藏
 *  */ 
// 列表
export const collectList = (data, loading =false) => request('/collect/index', 'get', data, loading)
// 添加
export const addCollect = (data, loading =false) => request('/collect/add', 'post', data, loading)
// 取消
export const calcelCollect = (data, loading =false) => request('/collect/cancel', 'post', data, loading)


/**
 * 订单
 */
// 申请订单
export const applyOrder = (data, loading =false) => request('/order/apply', 'post', data, loading)
// 订单劣币啊
export const orderList = (data, loading =false) => request('/order/index', 'get', data, loading)
