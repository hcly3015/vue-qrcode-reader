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

      <Component :is="selectedDemo" @error="openError" @success="clearErrors" />
    </div>
  </div>
</template>

<script>
import TheCustomTrackingDemo from '@/components/demos/TheCustomTrackingDemo'
import TheDecodeAllDemo from '@/components/demos/TheDecodeAllDemo'
import TheFirstResultDemo from '@/components/demos/TheFirstResultDemo'
import TheValidateDemo from '@/components/demos/TheValidateDemo'
import TheSwitchCameraDemo from '@/components/demos/TheSwitchCameraDemo'
import TheNoTrackingDemo from '@/components/demos/TheNoTrackingDemo'

export default {
  name: 'app',

  data () {
    const demos = [
      {
        title: 'Decode all',
        component: 'TheDecodeAllDemo'
      }, {
        title: 'No Tracking',
        component: 'TheNoTrackingDemo'
      }, {
        title: 'First result only',
        component: 'TheFirstResultDemo'
      }, {
        title: 'Custom location tracking',
        component: 'TheCustomTrackingDemo'
      }, {
        title: 'Validate',
        component: 'TheValidateDemo'
      }, {
        title: 'Switch Camera',
        component: 'TheSwitchCameraDemo'
      }
    ]

    return {
      selectedDemo: demos[0].component,
      demos,
      errors: []
    }
  },

  components: {
    TheCustomTrackingDemo,
    TheDecodeAllDemo,
    TheFirstResultDemo,
    TheValidateDemo,
    TheSwitchCameraDemo,
    TheNoTrackingDemo
  },

  watch: {
    'selectedDemo': 'clearErrors'
  },

  methods: {
    openError (error) {
      this.errors.push(error)
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
</style>
