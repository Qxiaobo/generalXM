import throttle from './throttle.js'
import copyDirective from './copyDirective'
import waterMarker from './waterMarker'




const install = function(Vue) {
    Vue.directive('throttle', throttle)
    Vue.directive('copyDirective', copyDirective)
    Vue.directive('waterMarker', waterMarker)


  }

export default install
