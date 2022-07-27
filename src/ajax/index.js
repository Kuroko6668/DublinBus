import myAxios from './myAxios';

export const reqAllStops = () => myAxios.get('/api/stops')
export const reqRouteById = (routeName) => myAxios.get(`/route/`+routeName)
export const reqStopById = (StopId) => myAxios.get(`/stop/`+StopId)
export const reqPrediction = (arrId,depId,time,routeName, stops_num) => myAxios.get(`/prediction/`+arrId+`/`+depId+`/`+time+`/`+routeName)
export const reqCurWeather = () => myAxios.get('/cur_weather')
