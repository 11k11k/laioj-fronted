import ACCESS_ENUM from './accessEnum'
const checkAccess = (
  LoginUser: any,
  needAccess = ACCESS_ENUM.NOT_LOGIN
) => {
  //获取用户当前具有的权限 admin
  const loginUserAccess = LoginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true
  }
  //如果用户当前权限为USER
  if (needAccess === ACCESS_ENUM.USER) {
    //判断是否已经登陆
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false
    }
  }
  //如果用户当前状态为管理员ADMIN
  if (needAccess === ACCESS_ENUM.ADMIN) {
    //判断是否是管理员
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false
    }
  }
  return true
}
export default checkAccess
