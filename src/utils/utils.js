// `扁平化数组或对象方法封装`
import { flatMapDeep, isPlainObject, isArray, upperFirst,get } from 'lodash'
// import { get } from 'lodash'

window.$GET = (object, path, defaultValue) => {
  return get(object, path, defaultValue) || defaultValue
}

// `* 对数组进行深度扁平化，并提取指定的属性路径值。`
// `* @param {Array} data - 要扁平化的数组。`
// `* @param {Array} mapArr - 属性路径数组。`
// `* @param {Array} mapKeyArr - 需要填充的属性路径数组。`
// `* @param {boolean} needFill - 是否需要填充属性值。`
// `* @returns {Array} - 扁平化后的数组。`
export function flatMapDeepByArray(data, mapArr = [], mapKeyArr = [], needFill = false) {
  let flatMapArr = []
  if (!mapArr.length) return []
  if (isPlainObject(data)) {
    const shiftData = data[mapArr.shift()]
    flatMapArr = isArray(shiftData) ? shiftData : [shiftData]
  } else flatMapArr = data

  mapKeyArr = mapKeyArr.slice(0, mapArr.length)
  mapArr.map((item, ind) => {
    flatMapArr = flatMapDeep(flatMapArr, (n) => {
      let arr = $GET(n, `${[mapArr[ind]]}`, [])
      if (!isArray(arr)) arr = [arr]
      const sliceKeyArr = mapKeyArr.slice(0, ind + 1)
      const sliceMapArr = mapArr.slice(0, ind + 1)
      sliceKeyArr.map((key, k) => {
        arr.map((nItem, index) => {
          nItem.$index = index
          if (k == sliceMapArr.length - 1) {
            return (nItem[`$${key}`] = n)
          }
          nItem[`$${key}`] = n[`$${key}`]
        })
      })
      return arr
    })
  })

  if (needFill) flatMapArr.map((item) => fillProps(item, mapKeyArr))
  return flatMapArr
}

// `* 填充对象的属性值。`
// `* @param {Object} obj - 要填充属性值的对象。`
// `* @param {Array} props - 属性路径数组。`
export function fillProps(obj, props) {
  if (!isArray(props)) props = [props]
  props = props.map((prop) => `$${prop}`)
  props.map((prop) => {
    const val = obj[prop]
    if (!isPlainObject(val)) return
    for (let key in val) {
      const valKey = obj[key] ? `${prop}${upperFirst(key)}` : key
      obj[valKey] = val[key]
    }
  })
}
