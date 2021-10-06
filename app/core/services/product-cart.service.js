export class ProductCart {
  static instance;

  constructor(listProductsCart) {
    this.cartProducts = listProductsCart;
  }

  static getInstance() {
    if (!AddProductCart.instance) {
      AddProductCart.instance = new AddProductCart();
    }
    return AddProductCart.instance;
  }

  addCart(addProduct, action) {
    const index = this.cartProducts.findIndex((item) => item.id === addProduct.id);

    if (index === -1) {
      action && action([...this.cartProducts, addProduct]);
      return;
    }

    const newArrayProducts = this.cartProducts.map((item) => {
      if (item.id === addProduct.id) {
        const newCant = item.quantity + 1;
        return {
          ...item,
          quantity: newCant,
        };
      }
      return item;
    });

    action && action(newArrayProducts);
  }
}
