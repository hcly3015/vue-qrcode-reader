<template>
  <div>
    <p>QR-codes are not visually tracked in this demo. Do you notice better
    performance on your device?</p>

    <p class="one-line">Last result: <b>{{ result }}</b></p>

    <qrcode-stream :track="false" @decode="onDecode" @init="$emit('init', $event)" />
  </div>
</template>

<script>
import { QrcodeReader } from 'vue-qrcode-reader'

export default {
  components: { QrcodeReader },

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
