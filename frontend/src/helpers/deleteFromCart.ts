const deleteFromCart = (item: any): void => {
  const cart = JSON.parse(localStorage.getItem('storeCart')!)

  if(cart.length > 0) {
    localStorage.setItem('storeCart', JSON.stringify(cart.filter((el: any) => el._id !== item._id)))
  }
}

export default deleteFromCart;