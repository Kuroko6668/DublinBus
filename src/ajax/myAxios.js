import axios from 'axios'
import qs from 'querystring'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


const instance = axios.create({
  timeout: 20000,//配置超时时间
});
instance.defaults.baseURL = 'http://127.0.0.1:8000'

instance.interceptors.request.use((config)=>{
  NProgress.start()
  let {method,data} = config
  if(method.toLowerCase() === 'post' && data instanceof Object){
      config.data = qs.stringify(data)
  }
  return config
})

instance.interceptors.response.use(
  response => {
    NProgress.done()
    return response
  },  
  error => {
    NProgress.done()
    alert(error)
    return new Promise(()=>{})
  }
)


export default instance