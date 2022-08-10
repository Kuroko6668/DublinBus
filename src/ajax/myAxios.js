import axios from 'axios'
import qs from 'querystring'
// import NProgress from 'nprogress'
const instance = axios.create({
  timeout: 1000 * 60 * 9999,//配置超时时间
});
instance.defaults.baseURL = 'http://34.242.44.49:8080'

instance.interceptors.request.use((config)=>{
  // NProgress.start()
  let {method,data} = config
  if(method.toLowerCase() === 'post' && data instanceof Object){
      config.data = qs.stringify(data)
  }
  return config
})

instance.interceptors.response.use(
  response => {
    // NProgress.done()
    return response
  },  
  error => {
    // NProgress.done()
    alert(error)
    return Promise.reject(error)
  }
)


export default instance