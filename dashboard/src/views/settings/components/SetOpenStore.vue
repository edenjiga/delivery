
<template>
  <div>
    <p>Abrir Tienda:</p>
    <el-switch
      v-model="isStoreOpen"
      active-color="#13ce66"
      inactive-color="#ff4949"
      :disabled="disableSwitch"
    />
  </div>
</template>

<script>
import { getSettings, setIsStoreOpen } from '@/api/settings'
export default {
  name: 'SetOpenStore',
  data() {
    return {
      disableSwitch: true
    }
  },
  computed: {
    isStoreOpen: {
      get() {
        return this.$store.state.settings.isStoreOpen
      },
      async set(val) {
        try {
          this.disableSwitch = true

          await setIsStoreOpen(val)

          this.setIsStoreOpen(val)
        } catch (err) {
          alert('No se pudo cambiar el valor')
        } finally {
          this.disableSwitch = false
        }
      }
    }
  },
  async mounted() {
    console.log('mounted')
    try {
      const { isStoreOpen } = await getSettings()

      this.setIsStoreOpen(isStoreOpen)

      this.disableSwitch = false
    } catch (err) {
      alert('Error al cargar las configuraciones')
    }
  },
  methods: {
    setIsStoreOpen(value) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'isStoreOpen',
        value
      })
    }
  }
}
</script>

<style>
</style>
