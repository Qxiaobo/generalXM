import throttle from './throttle.js'
import copyDirective from './copyDirective'
import waterMarker from './waterMarker'
import waves from "./waves";
import lazyload from "./lazyload";




const install = function(Vue) {
    Vue.directive('throttle', throttle)
    Vue.directive('copyDirective', copyDirective)
    Vue.directive('waterMarker', waterMarker)
    Vue.directive('waves', waves)
    Vue.directive('lazyload', lazyload)
    Vue.directive('lazy', lazyload)


  }

export default install
