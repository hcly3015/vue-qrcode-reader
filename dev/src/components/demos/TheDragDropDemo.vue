<template>
  <div>
    <p><i>vue-qrcode-reader</i> also provides a component that allows you to
    drag-and-drop images that should be scanned. Use it as a standalone
    feature or as a fallback for desktop users.</p>

    <p class="one-line">Last result: <b>{{ result }}</b></p>

    <p v-if="error !== null" class="drop-error">
      {{ error }}
    </p>

    <qrcode-drop-zone @detect="onDetect">
      <div class="drop-area">
        DROP SOME IMAGES HERE
      </div>
    </qrcode-drop-zone>
  </div>
</template>

<script>
import { QrcodeDropZone } from 'vue-qrcode-reader'

export default {
  components: { QrcodeDropZone },

  data () {
    return {
      result: null,
      error: null
    }
  },

  methods: {
    async onDetect (promise) {
      try {
        const { content } = await promise

        this.result = content
        this.error = null
      } catch (error) {
        if (error.name === 'DropImageFetchError') {
          this.error = 'Sorry, you can\'t load cross-origin images :/'
        } else if (error.name === 'DropImageDecodeError') {
          this.error = 'Ok, that\'s not an image. That can\'t be decoded.'
        } else {
          this.error = 'Ups, what kind of error is this?! ' + error.message
        }
      }
    }
  }
}
</script>

<style>
.drop-area {
  height: 300px;
  color: #fff;
  text-align: center;
  font-weight: bold;
  padding: 10px;

  background-color: rgba(0,0,0,.5);
}

.drop-error {
  color: red;
  font-weight: bold;
}
</style>
