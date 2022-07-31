function setParams(options={}, _data) {
  if (options.method === "get") {
    options.params = {
      data: _data
    }
  }
  if (options.method === "post") {
    options.data  = _data;
  }
  return options;
}

export function setHeader(options={}, resource={}, data={}) {
  switch (resource.type) {
    default:
      options.headers = {
        'content-type': 'application/json'
      }
      // options.withCredentials = true
      setParams(options, data);
      break;
  }
  return options;
}

if(typeof window !== "undefined"){
//添加请求拦截器
  window.axios.interceptors.request.use(config => {
    return config;
  }, error => {
    //请求错误时做些事
    return Promise.reject(error);
  });
//添加响应拦截器
 window.axios.interceptors.response.use(response => {
    // debug
    // if (window.felogsdk && window.felogsdk.report) {
    //   typeof window !== undefined && window.felogsdk.report('FE_AJAX', response)
    // }
    return response;
  }, error => {
    return Promise.reject(error);
  });
}

export default function innerRequest(resource, data = { }, method = "post"){
  let options = {
    method: method,
    url: resource.url,
    timeout: 7000
  };
  options = setHeader(options, resource, data);
  return new Promise((resolve, reject) => {
    (async () => {
      if(typeof window !== "undefined"){
        await window.axios(options).then(function (result) {
          resolve(result.data);
        }).catch(function (err) {
          reject(err);
        });
      }
    })();
  });
}
