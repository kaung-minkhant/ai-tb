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

export const deleteUserAccessToken = () => {
  if (typeof Storage !== 'undefined') {
    localStorage.removeItem('accToken')
  }
}

export const deleteUser = () => {
  if (typeof Storage !== 'undefined') {
    localStorage.removeItem('user')
  }
}
