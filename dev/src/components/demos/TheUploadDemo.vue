<template>
  <div>
    <p>Finally, <i>vue-qrcode-reader</i> comes with another component which
    allows image scanning via classic file upload. If you are on mobile and your
    browser supports it, your camera automatically starts to take the picture to
    be uploaded.</p>

    <p class="one-line">Last result: <b>{{ result }}</b></p>

    <qrcode-capture @decode="onDecode" />
  </div>
</template>

<script>
import { QrcodeCapture } from 'vue-qrcode-reader'

export default {
  components: { QrcodeCapture },

  data () {
    return {
      result: ''
    }
  },

  methods: {
    onDecode (result) {
      this.result = result
    }
  }
}
</script>
