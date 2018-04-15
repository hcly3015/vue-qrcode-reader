<template>
  <QrcodeReader
    :paused="paused"
    @decode="onDecode"
    @init="onInit">
    <div v-show="paused" class="validation-layer">
      <div class="decode-result">
        <u>Decoded</u>: {{ content }}
      </div>

      <div class="validation-notice">
        <div v-if="validating">
          Long validation in progress...
        </div>

        <div v-else-if="isValid" class="text-success">
          This is a URL
        </div>

        <div v-else class="text-danger">
          This is NOT a URL!
        </div>
      </div>
    </div>

    <LoadingIndicator v-show="loading" />
  </QrcodeReader>
</template>

<script>
import { QrcodeReader } from 'vue-qrcode-reader'
import InitHandler from '@/mixins/InitHandler'

export default {
  components: { QrcodeReader },

  mixins: [ InitHandler ],

  data () {
    return {
      isValid: false,
      validating: false,
      paused: false,
      content: null
    }
  },

  methods: {
    onDecode (content) {
      this.content = content
      this.paused = true
      this.validating = true

      window.setTimeout(() => { // simulate long validation
        this.isValid = content.startsWith('http')
        this.validating = false

        window.setTimeout(() => {
          this.paused = false
        }, 2000)
      }, 3000)
    }
  }
}
</script>

<style scoped>
.validation-layer {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, .9);
  text-align: center;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.validation-notice {
  font-weight: bold;
  font-size: 1.4rem;
}

.decode-result {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: italic;
}
</style>
