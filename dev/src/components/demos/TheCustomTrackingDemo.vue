<template>
  <div>
    <p>You can completely customize how visual tracking should look like!
    Check this out for demo...</p>

    <qrcode-stream :track="repaint" @init="$emit('init', $event)" />
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  components: { QrcodeStream },

  methods: {
    repaint (location, ctx) {
      if (location !== null) {
        const {
          topLeftFinderPattern,
          topRightFinderPattern,
          bottomLeftFinderPattern
        } = location

        const pointArray = [
          topLeftFinderPattern,
          topRightFinderPattern,
          bottomLeftFinderPattern
        ]

        ctx.fillStyle = '#007bff'

        pointArray.forEach(({ x, y }) => {
          ctx.fillRect(x - 5, y - 5, 10, 10)
        })
      }
    }
  }
}
</script>
