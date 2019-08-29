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
// 订单列表
export const getOrderList = (data, loading =false) => request('/order/index', 'get', data, loading)
// 未读订单数
export const getUnreadCount = (data, loading =false) => request('/order/unreadCount', 'get', data, loading)


// 入驻
export const KolUserAuth = (data, loading =false) => request('/kol_user/auth', 'post', data, loading)
// 更新
export const updateKolUser = (data, loading =false) => request('/kol_user/update', 'post', data, loading)
// 详情
export const getKolUserInfo = (data, loading =false) => request('/kol_user/info', 'get', data, loading)
// 平台保存
export const saveKolDsp = (data, loading =false) => request('/kol_dsp/save', 'post', data, true)
// 平台更新
export const updateKolDsp = (data, loading =false) => request('/kol_dsp/update', 'post', data, true)


// 城市地址
export const getRegion = (data, loading =false) => request('/region/index', 'get', data, loading)
// 平台条件
export const getDspCondition = (data, loading =false) => request('/kol_dsp/condition', 'get', data, loading)



