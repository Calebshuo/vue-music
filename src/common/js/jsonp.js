import originJSONP from 'jsonp'

/**
 * Promise化jsonp函数
 * @param {纯净的地址} url
 * @param {query字段} data
 * @param {jsonp的配置选项} option
 */
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => { // 回调函数（这个回调函数是这个第三方库提供的而不是jsonp的那个callback（jsonp的是option（函数名）））为什么是这个？因为是库支持的，err是none的话是代表成功的，data代表取到的数据
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

/**
 * 输入对象,提供query字段
 * @param {query字段} data
 */
function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}