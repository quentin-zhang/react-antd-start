/**
 * Created by shilltr on 2018/5/23.
 */
function getQueryString(search, name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}
export {getQueryString};