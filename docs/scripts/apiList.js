import request from './axiosUtil'
const API = 'https://www.tobetter.org.cn/apife/'
// const API = 'http://localhost:3000/'
/**
 * 获取share link list
 * @param data
 * @returns { token }
 */
export function getShareLinkList(data) {
  let opt = {
    url: API + 'api/share/link/query'
  };
  return request(opt, data, 'post');
}

export function addShareLink(data) {
  let opt = {
    url: API + 'api/share/link/add'
  };
  return request(opt, data, 'post');
}


