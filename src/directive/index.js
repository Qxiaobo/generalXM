import throttle from './throttle.js'
import copyDirective from './copyDirective'



const install = function(Vue) {
    Vue.directive('throttle', throttle)
    Vue.directive('copyDirective', copyDirective)
  }

export default install
