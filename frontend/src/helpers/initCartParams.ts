const initCartParams = () => {
  const cart = window.localStorage.getItem('storeCart')

  if (!cart) {
    window.localStorage.setItem('storeCart', JSON.stringify([]))
  }
}

export default initCartParams;