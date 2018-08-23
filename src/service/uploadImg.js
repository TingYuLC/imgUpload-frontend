import axios from 'axios'
import webApi from './webApi'

const imp = {}

imp.saveImgServer = (obj) => {
  const url = webApi.urlList.demo.saveImgServer
  return axios.post(url, obj, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

imp.saveImgStorage = (obj) => {
  const url = webApi.urlList.demo.saveImgStorage
  return axios.post(url, obj, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export default imp