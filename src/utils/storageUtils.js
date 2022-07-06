import store from 'store'
const STOPS = {}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    saveStops(stops){
        store.set(STOPS,stops)
    },
    getStops(){
        return  store.get(STOPS) || {}
    },
    removeStops(){
        store.remove(STOPS)
    }
}