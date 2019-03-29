import Vue from 'vue'
import { Http } from './services'

Vue.prototype.$http = new Http()

export default Vue