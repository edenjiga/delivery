<template>
  <div>
    <p>{{ status }}</p>
    <img :src="qr" width="500" height="500">
  </div>
</template>

<script>
import { getQr, getWhatsappBotStatus } from '@/api/whatsapp'

export default {
  name: 'Whatsapp',
  data() {
    return {
      qr: ''
    }
  },
  async mounted() {
    try {
      this.qr = await getQr()
      this.status = await getWhatsappBotStatus()
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
