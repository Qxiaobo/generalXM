import throttle from './throttle.js'
import copyDirective from './copyDirective'
import waterMarker from './waterMarker'
import waves from "./waves";





const install = function(Vue) {
    Vue.directive('throttle', throttle)
    Vue.directive('copyDirective', copyDirective)
    Vue.directive('waterMarker', waterMarker)
    Vue.directive('waves', waves)


  }

export default install
