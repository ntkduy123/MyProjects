export const isLogin = () => {

  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('Authorization')
  if (token) {
    const tokenMsg = token.split('.')

    if (tokenMsg.length > 2) {
      const userData = JSON.parse(window.atob(token.split('.')[1]))

      if (userData) {
        console.log(Date.now() / 1000, userData.exp)
        const now = Math.floor(Date.now() / 1000)
        return now < userData.exp
      }
    }
  }

  return false
}