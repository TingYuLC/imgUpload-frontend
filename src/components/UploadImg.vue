<template>
  <div class="upload-img">
    <div class="controller">
      <button @click="showBase = !showBase">切换1</button>
      <button @click="showCanvas = !showCanvas">切换2</button>
      <button @click="showServer = !showServer">切换3</button>
      <button @click="showStorage = !showStorage">切换4</button>
    </div>
    <div 
      v-show="showBase" 
      class="img-base">
      <a 
        class="img-wrap" 
        href="javascript:void(0)">
        <span>数据库存储</span>
        <img :src="uploadImg" >
        <form 
          ref="formBase" 
          class="form">
          <input 
            type="file" 
            @change="submitImgBase($event)" >
        </form> 
      </a>
      <div class="base-text">
        <p>{{ imgBase }}</p>
      </div>
      <div class="img">
        <img 
          ref="imgBase" 
          :src="imgBase" >
      </div>
    </div>
    <div 
      v-show="showCanvas" 
      class="img-canvas">
      <a 
        class="img-wrap" 
        href="javascript:void(0)">
        <span>canvas压缩</span>
        <img :src="uploadImg" >
        <form 
          ref="formCanvas" 
          class="form">
          <input 
            type="file" 
            @change="submitImgCanvas($event)" >
        </form> 
      </a>
      <div class="base-text">
        <p>{{ imgCanvas }}</p>
      </div>
      <div 
        ref="imgCanvas" 
        class="img">
        <img :src="imgCanvas" >
      </div>
    </div>
    <div 
      v-show="showServer" 
      class="img-server">
      <a 
        class="img-wrap" 
        href="javascript:void(0)">
        <span>服务器存储</span>
        <img :src="uploadImg" >
        <form 
          ref="formServer" 
          class="form">
          <input 
            type="file" 
            @change="submitImgServer($event)" >
        </form> 
      </a>
      <div class="img">
        <img :src="imgServer" >
      </div>
    </div>
    <div 
      v-show="showStorage" 
      class="img-storage">
      <a 
        class="img-wrap" 
        href="javascript:void(0)">
        <span>对象存储</span>
        <img :src="uploadImg" >
        <form ref="formStorage">
          <input 
            type="file" 
            @change="submitImgStorage($event)" >
        </form>
      </a>
      <div class="img">
        <img :src="imgStorage" >
      </div>
    </div>
  </div>
</template>
<script>
import service from '@/service/uploadImg'
import uploadImg from '@/assets/upload_box.svg'
export default {
  name: 'UploadingImg',
  data () {
    return {
      uploadImg: uploadImg,
      imgBase: '',
      imgCanvas: '',
      imgServer: '',
      imgStorage: '',
      showBase: true,
      showCanvas: false,
      showServer: false,
      showStorage: false
    }
  },
  methods: {
    submitImgBase (e) {
      const value = e.target.value
      if (!value) return
      const files = e.target.files[0]
      const reader = new FileReader()
      const that = this
      console.log('size', files.size / 1024 / 1024)
      reader.onload = function (e) {
        const base64 = e.target.result
        const obj = {
          base: base64
        }
        console.log('base64', base64.length)
        service.saveImgBase(obj)
          .then(res => {
            if (res.data.code === 0) {
              that.imgBase = base64
              that.$refs.formBase.reset()
            }
          })
          .catch(error => {
            that.$refs.formBase.reset()
            console.log(error)
          })
      }
      reader.readAsDataURL(files)
    },
    submitImgCanvas (e) {
      const value = e.target.value
      if (!value) return
      const files = e.target.files[0]
      const reader = new FileReader()
      const that = this
      reader.onload = function (e) {
        const base64 = e.target.result
        console.log('base64', base64.length)
        let img = document.createElement('img')
        img.src = base64
        img.onload = function () {
            let canvas = document.createElement('canvas')
          const width = 1024;
          const height = 1024;
          canvas.width = img.width
          canvas.height = img.height
          if (img.width > width || img.height > height) {
            if (img.width > img.height) {
              canvas.width = 1024
              canvas.height = canvas.width * img.height / img.width
            } else {
              canvas.height = 1024
              canvas.width = canvas.height * img.width / img.height
            }
          }
          let ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          const base64 = canvas.toDataURL('image/jpeg')
          console.log('canvas', base64.length)
          const obj = {
            base: base64
          }
          service.saveImgBase(obj)
            .then(res => {
              if (res.data.code === 0) {
                that.imgCanvas = base64
                that.$refs.formCanvas.reset()
              }
            })
            .catch(error => {
              that.$refs.formCanvas.reset()
              console.log(error)
            })
        }
      }
      reader.readAsDataURL(files)
    },
    submitImgServer (e) {
      const value = e.target.value
      if (!value) return
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
      const value = e.target.value
      if (!value) return
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
  display: flex;
  flex-direction: column;
}
.upload-img .controller, .upload-img .img-base, .upload-img .img-canvas, .upload-img .img-server, .upload-img .img-storage {
  display: flex;
  flex-direction: row;
  height: 450px;
  align-items: flex-start;
  position: relative;
}
.upload-img .controller {
  height: 50px;
  margin-bottom: 20px;
  direction: flex;
  flex-direction: row;
}
.upload-img .img-base p, .upload-img .img-canvas p {
  width: 330px;
  word-wrap: break-word;
  word-break: break-all;
}
.img-base .img-wrap span, .img-canvas .img-wrap span, .img-server .img-wrap span, .img-storage .img-wrap span {
  position: absolute;
  top: -30px;
  left: 0;
  color: #007AFF;
  text-decoration: none;
  cursor: default;
}
.img-base .img-wrap img, .img-canvas .img-wrap img, .img-server .img-wrap img, .img-storage .img-wrap img {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
}
.upload-img .img-base input, .upload-img .img-canvas input, .upload-img .img-server input, .upload-img .img-storage input {
  width: 100px;
  height: 100px;
  opacity: 0;
  z-index: 10000;
  cursor: pointer;
}
.upload-img .img-base .img, .upload-img .img-canvas .img, .upload-img .img-server .img, .upload-img .img-storage .img,
.upload-img .img-base .base-text, .upload-img .img-canvas .base-text {
  width: 350px;
  height: 350px;
  border: 1px solid #000;
  margin-left: 120px;
  overflow: auto;
}
.img-base .img img, .img-canvas .img img, .img-server .img img, .img-storage .img img {
  width: 350px;
}
.upload-img button {
  width: 50px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: none;
  color: #fff;
  background: #007AFF;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 20px;
}
</style>
