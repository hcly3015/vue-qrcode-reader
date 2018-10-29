<template>
  <div>
    <p>This demo combines all <i>vue-qrcode-reader</i> components to provide
    fallbacks for both desktop users without a camera and legacy mobile users
    without Stream API support.</p>

    <p class="one-line">Last result: <b>{{ result }}</b></p>

    <qrcode-drop-zone @decode="onDecode">
      <qrcode-stream @decode="onDecode" @init="onInit" />
    </qrcode-drop-zone>

    <qrcode-capture v-if="noStreamApiSupport" @decode="onDecode" />
  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

export default {
  components: { QrcodeStream, QrcodeDropZone, QrcodeCapture },

  data () {
    return {
      result: '',
      noStreamApiSupport: false
    }
  },

  methods: {
    onDecode (result) {
      this.result = result
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'StreamApiNotSupportedError') {
          this.noStreamApiSupport = true
        }
      }
    }
  }
}
</script>
