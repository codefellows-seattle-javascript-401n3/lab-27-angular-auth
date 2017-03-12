'use strict'

module.exports = function () {
  return function (array, search) {
    search = search || ''
    let regex = new RegExp('.*' + search.split('').join('.*') + '.*')
    return array.filter((item) => {
      return regex.test(item.name, 'i') || regex.test(item.desc, 'i')
    })
  }
}
