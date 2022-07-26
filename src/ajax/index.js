import myAxios from './myAxios';

export const reqAllStops = () => myAxios.get('/api/stops')
export const reqRouteById = (routeName) => myAxios.get(`/route/`+routeName)
export const reqStopById = (StopId) => myAxios.get(`/stop/`+StopId)
export const reqPrediction = (arrId,depId,time,routeName) => myAxios.get(`/prediction/`+arrId+`/`+depId+`/`+time+`/`+routeName)
// export const reqLogin = (username, password) => (myAxios.post('/login',{username,password}))
// export const reqCategoryList = () => myAxios.get('/manage/category/list')
// export const reqWeather = ()=>{
//     return new Promise((resolve,reject)=>{
//       //输入函数体
//       jsonp('https://api.openweathermap.org/data/2.5/weather?lat=53.3053444&lon=-6.2208028&appid=2150ca8b3c3f0f799010b1403ca77a5d',(err,data)=>{
//         if(err){
//           Alert.error('Error in requesting weather information, contact us')
//           return new Promise(()=>{})
//         }else{
//           let picURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
//           let temperature = data.main.temp
//           let weather = data.weather[0].description
//           let weatherObj = {picURL, temperature, weather}
//           resolve(weatherObj)
//           //   console.log(data);
//           //   console.log(data.weather[0].description);
//           //   console.log(data.weather[0].icon);
//           //   console.log("http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
//           //   console.log(data.main.temp);
//           //   let weatherObj = {
//           //       picURL:'',
//           //       temperature:'',
//           //       weather:''
//           //   }
            
//         }
//       })
//     })



// }
// export const reqAddCategory = (categoryName)=>myAxios.post('/manage/category/add',{categoryName})
// export const reqUpdateCategory = (categoryId,categoryName)=>myAxios.post('/manage/category/update',{categoryId,categoryName})
// export const reqProductList = (pageNum,pageSize)=> myAxios.get('/manage/product/list',{params:{pageNum,pageSize}})
// export const reqChangeProdStatus = (productId,status)=> myAxios.post('/manage/product/updateStatus',{productId,status})
// export const reqSearchProduct = (searchType,keyWord,pageNum,pageSize) => myAxios.get('/manage/product/search',{params:{[searchType]:keyWord,pageNum,pageSize}})
// export const reqProductInfoById = (productId) => myAxios.get('/manage/product/info',{params:{productId}})
