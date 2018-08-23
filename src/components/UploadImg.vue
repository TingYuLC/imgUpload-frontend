<template>
  <div class="upload-img">
    <div class="img-server">
      <img :src="imgServer" width="500" />
      <form ref="formServer">
        <input type="file" @change="submitImgServer($event)" />
      </form> 
    </div>
    <div class="img-storage">
      <img :src="imgStorage" width="500" />
      <form ref="formStorage">
        <input type="file" @change="submitImgStorage($event)" />
      </form>
    </div>
  </div>
</template>
<script>
import service from '@/service/uploadImg'
export default {
  name: 'uploadingImg',
  data () {
    return {
      imgServer: '',
      imgStorage: ''
    }
  },
  methods: {
    submitImgServer (e) {
      const files = e.target.files[0]
      const formData = new FormData()
      formData.append('imgServer', files)
      service.saveImgServer(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.imgServer = res.data.data.imgServer
          }
          this.$refs.formServer.reset()
        })
        .catch(error => {
          console.log(error)
          this.$refs.formStorage.reset()
        })
    },
    submitImgStorage (e) {
      const files = e.target.files[0]
      const formData = new FormData()
      formData.append('imgStorage', files)
      service.saveImgStorage(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.imgStorage = res.data.data.imgStorage
          }
          this.$refs.formStorage.reset()
        })
        .catch(error => {
          console.log(error)
          this.$refs.formStorage.reset()
        })
    }
  }
}
</script>
<style scoped>
.upload-img {
  width: 100%;
}
</style>
