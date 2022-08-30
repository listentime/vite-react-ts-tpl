const API = {
  // 查询首页图标
  queryIconModelList: "/mall/iconModel/queryIconModelList",
  // 通过token获取剩余积分
  queryIntegralBalance: "/mall/user/queryIntegralBalance",
  // 临时token 换取长期token
  getTokenByTempToken: "/mall/front/user/tokenCodeAuth",
}

export default API
