import { toast } from "materialize-css"

export default{
    install(Vue, options){
        Vue.prototype.$addToast = (html, classes = '') => M.toast({html, classes});
    }
}