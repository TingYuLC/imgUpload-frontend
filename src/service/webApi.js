
let base = location.protocol + '//' + location.hostname + ':3040/upload/'

const frontendDomain = {
  dev: 'upload.luojc.cn'
}

const accessDomain = {
  dev: 'https://uploadaccess.luojc.cn',
}

for (let key in frontendDomain) {
  let domain = frontendDomain[key]
  if (domain === window.location.host) {
    base = accessDomain[key] + '/upload/'
  }
}

const urlList = {
  demo: {
    saveImgBase: base + 'saveImgBase',
    saveImgServer: base + 'saveImgServer',
    saveImgStorage: base + 'saveImgStorage'
  }
}

export default { base, urlList }
