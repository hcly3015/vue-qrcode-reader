<template>
  <QrcodeReader
    @locate="onLocate"
    @init="onInit">
    <canvas ref="canvas" class="points"></canvas>

    <LoadingIndicator v-show="loading" />
  </QrcodeReader>
</template>

<script>
import { QrcodeReader } from 'vue-qrcode-reader'
import InitHandler from '@/mixins/InitHandler'
import debounce from 'lodash/debounce'

export default {
  components: { QrcodeReader },

  mixins: [ InitHandler ],

  data () {
    return {
      points: []
    }
  },

  watch: {
    points (newPoints, oldPoints) {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')

      window.requestAnimationFrame(() => {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

        oldPoints.forEach(({ x, y }) => {
          ctx.clearRect(x - 5, y - 5, 10, 10)
        })

        ctx.fillStyle = '#007bff'

        newPoints.forEach(({ x, y }) => {
          ctx.fillRect(x - 5, y - 5, 10, 10)
        })
      })
    }
  },

  methods: {
    onLocate (points) {
      if (points.length > 0) {
        this.points = points
      } else {
        this.clearPoints()
      }
    },

    // avoid flickering when value changes quickly
    clearPoints: debounce(function () {
      this.points = []
    }, 100)
  }
}
</script>

<style scoped>
.points {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
