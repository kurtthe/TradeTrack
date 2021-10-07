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
      if (item.id !== addProduct.id) {
        return item;
      }

      let newCant = item.quantity + 1;

      if (addProduct.cantSend) {
        newCant = addProduct.quantity;
      }

      return {
        ...item,
        quantity: newCant,
      };
    });

    action && action(newArrayProducts);
  }

  updateCant(IdProduct, newCant, action) {
    const newArrayProducts = this.cartProducts.map((item) => {
      if (item.id !== IdProduct) {
        return item;
      }

      return {
        ...item,
        quantity: newCant,
      };
    });

    action && action(newArrayProducts);
  }

  changePrice(myPrice = false, action) {

    if (!this.cartProducts || this.cartProducts.length === 0) {
      return;
    }

    const newArrayProducts = this.cartProducts.map((product) => {
      return {
        ...product,
        myPrice,
      };
    });

    action && action(newArrayProducts);
  }
}
