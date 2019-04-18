import Vue from 'vue'
import { Http } from './services'
import { delayInput } from './directives'
import { format } from './filters'

Vue.prototype.$http = new Http()
Vue.directive('delay-input', delayInput)
Vue.filter('format', format)

export default Vue