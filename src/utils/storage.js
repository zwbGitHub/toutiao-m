// 封装本地存储模块

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  // data 有可能不是json字符串 使用一下代码进行判断
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
