export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)') // 因为el的className有可能是 'name1 name2 name3'这样的，所以每一个类名都要挨个去匹配。只要有一个匹配成功的就返回true，^表示开头，$表示结尾，\s表示空格
  return reg.test(el.className)
}

export function getElementAttribute(el, name, val) {
  let prefix = 'data-'
  let attr = prefix + name
  if (val) {
    return el.setAttribute(attr, val)
  } else {
    return el.getAttribute(attr)
  }
}