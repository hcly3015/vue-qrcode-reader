<template>
  <div id="app">
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-3">Vue QR code reader</h1>
        <p class="lead">
          A Vue.js 2 component which detects and decodes QR codes from a camera stream. No need for native apps.
        </p>
        <hr />
        <p class="lead">
          <a
            class="btn btn-primary btn-lg"
            href="https://github.com/gruhn/vue-qrcode-reader"
            role="button">
            <i class="fa fa-github"></i> View on GitHub
          </a>
        </p>
      </div>
    </div>

    <div class="container">

      <div class="form-row align-items-center">
        <label for="demo-select" class="col-form-label">Choose demo:</label>

        <div class="col">
          <select v-model="selectedDemo" class="form-control" id="demo-select">
            <option
              v-for="demo in demos"
              :value="demo.component">
              {{ demo.title }}
            </option>
          </select>
        </div>

        <div class="col-auto">
          <a
            href="https://github.com/gruhn/vue-qrcode-reader/tree/gh-pages/dev/src/components/demos"
            class="btn btn-outline-primary">
            Sources
          </a>
        </div>
      </div>

      <hr />

      <div v-for="error in errors" class="alert alert-danger" role="alert">
        {{ error }}

        <button type="button" class="close" aria-label="Close" @click="closeError(error)">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <component :is="selectedDemo" @init="onInit" />

      <loading-indicator v-show="loading" />
    </div>
  </div>
</template>

<script>
import TheCustomTrackingDemo from '@/components/demos/TheCustomTrackingDemo'
import TheDecodeAllDemo from '@/components/demos/TheDecodeAllDemo'
import TheValidateHardDemo from '@/components/demos/TheValidateHardDemo'
import TheValidateSoftDemo from '@/components/demos/TheValidateSoftDemo'
import TheSwitchCameraDemo from '@/components/demos/TheSwitchCameraDemo'
import TheNoTrackingDemo from '@/components/demos/TheNoTrackingDemo'
import TheDragDropDemo from '@/components/demos/TheDragDropDemo'
import TheUploadDemo from '@/components/demos/TheUploadDemo'
import TheFallbackDemo from '@/components/demos/TheFallbackDemo'

import LoadingIndicator from '@/components/LoadingIndicator'

export default {

  components: {
    LoadingIndicator,

    TheCustomTrackingDemo,
    TheDecodeAllDemo,
    TheValidateHardDemo,
    TheValidateSoftDemo,
    TheSwitchCameraDemo,
    TheNoTrackingDemo,
    TheDragDropDemo,
    TheUploadDemo,
    TheFallbackDemo
  },

  data () {
    const demos = [
      {
        title: 'decode all',
        component: 'TheDecodeAllDemo'
      }, {
        title: 'no location tracking',
        component: 'TheNoTrackingDemo'
      }, {
        title: 'custom location tracking',
        component: 'TheCustomTrackingDemo'
      }, {
        title: 'validation (soft)',
        component: 'TheValidateSoftDemo'
      }, {
        title: 'validation (hard)',
        component: 'TheValidateHardDemo'
      }, {
        title: 'switch camera',
        component: 'TheSwitchCameraDemo'
      }, {
        title: 'drap and drop',
        component: 'TheDragDropDemo'
      }, {
        title: 'upload and capture',
        component: 'TheUploadDemo'
      }, {
        title: 'fallbacks',
        component: 'TheFallbackDemo'
      }
    ]

    return {
      selectedDemo: demos[0].component,
      demos,
      errors: [],
      loading: false
    }
  },

  watch: {
    'selectedDemo': 'clearErrors'
  },

  methods: {
    log: console.log,

    async onInit (promise) {
      this.loading = true

      try {
        await promise

        this.clearErrors()
      } catch (error) {
        this.openError(error)
      } finally {
        this.loading = false
      }
    },

    openError (error) {
      if (error.name === 'NotAllowedError') {
        this.errors.push('To detect and decode QR codes this page needs access to your camera')
      } else if (error.name === 'NotFoundError') {
        this.errors.push('Seems like you have no suitable camera on your device.')
      } else if (error.name === 'NotSupportedError') {
        this.errors.push('Seems like this page is served in non-secure context. Your browser doesn\'t support that')
      } else if (error.name === 'NotReadableError') {
        this.errors.push('Couldn\'t access your camera. Is it already in use?')
      } else if (error.name === 'OverconstrainedError') {
        this.errors.push('Constraints don\'t match any installed camera. Did you asked for the front camera although there is none?')
      } else {
        this.errors.push('UNKNOWN ERROR: ' + error.message)

        console.error(error)
      }
    },

    closeError (error) {
      const index = this.errors.indexOf(error)

      this.errors.splice(index, 1)
    },

    clearErrors () {
      this.errors = []
    }
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap.scss";

#app {
  padding-bottom: 15px;
}

.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
