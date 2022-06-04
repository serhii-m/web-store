const addToCart = (item: any): void => {
  const cart = JSON.parse(localStorage.getItem('storeCart')!)
  localStorage.setItem('storeCart', JSON.stringify([...cart,  item]))
}

export default addToCart;