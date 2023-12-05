export const checkPassword = (password) => {
  return password.length >= 8
}
export const checkEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true)
  }
  return (false)
}

export const checkMatchPassword = (password) => {
  return function(repeatPassword) {
    return password === repeatPassword
  }
}

export const getWindowSize = () => {
  const {innerWidth, innerHeight} = window
  return innerWidth
}

export const getUser = () => {
  if (typeof Storage !== 'undefined') {
    const userObj = JSON.parse(localStorage.getItem('user'))
    return userObj?.username
  }
}

export const setUserAccessToken = (accessToken) => {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('accToken', accessToken)
  }
}

export const getUserAccessToken = () => {
  if (typeof Storage !== 'undefined') {
    return localStorage.getItem('accToken')
  }
}

export const deleteUserAccessToken = () => {
  if (typeof Storage !== 'undefined') {
    localStorage.removeItem('accToken')
  }
}

export const setUserID = (id) => {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('user', id)
  }
}

export const getUserId = () => {
  if (typeof Storage !== 'undefined') {
    return localStorage.getItem('user')
  }
}

export const deleteUser = () => {
  if (typeof Storage !== 'undefined') {
    localStorage.removeItem('user')
  }
}

export const setUserRole = (role) => {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('userRole', role)
  }
}

export const getUserRole = () => {
  if (typeof Storage !== 'undefined') {
    return localStorage.getItem('userRole')
  }
}

export const deleteUserRole = () => {
  if (typeof Storage !== 'undefined') {
    localStorage.removeItem('userRole')
  }
}

export const getWidth = (width) => {
  const scale = window.devicePixelRatio;
  return Math.floor(width*scale)
}

export const setStorageValue = (key, value) => {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem(key, value)
  }
}
export const getStorageValue = (key) => {
  if (typeof Storage !== 'undefined') {
    return localStorage.getItem(key)
  }
}
export const removeStorageValue = (key) => {
  if (typeof Storage !== 'undefined') {
    localStorage.removeItem(key)
  }
}