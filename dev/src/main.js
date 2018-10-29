import Vue from 'vue'
import App from './App'
import VueQrcodeReader from 'vue-qrcode-reader'

Vue.use(VueQrcodeReader)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
