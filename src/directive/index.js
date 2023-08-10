import throttle from './throttle.js'
import copyDirective from './copyDirective'
import waterMarker from './waterMarker'
import waves from "./waves";
import lazyload from "./lazyload";
import clickOutside from "./clickOutside/index.js";
import  Ellipsis_lab from "./ellipsis.js";
import debounce from './debounce.js'
import Hotkey from 'v-hotkey';
// import validateInput from './validate-input.js';

const install = function(Vue) {
    Vue.directive('throttle', throttle)
    Vue.directive('copyDirective', copyDirective)
    Vue.directive('waterMarker', waterMarker)
    Vue.directive('waves', waves)
    Vue.directive('lazyload', lazyload)
    Vue.directive('lazy', lazyload)
    Vue.directive('clickOutside', clickOutside)
    Vue.directive('ellipsis', Ellipsis_lab)
    Vue.directive('debounce', debounce)
    // Vue.directive('validateInput', validateInput)
    Vue.use(Hotkey)
  }

export default install
