import { AlertService } from './alert.service';

export class ProductCart {
  static instance;

  constructor(listProductsCart) {
    this.cartProducts = listProductsCart;
    this.alertService = new AlertService();
  }

  static getInstance(products) {
    ProductCart.instance = undefined;
    ProductCart.instance = new ProductCart(products);

    return ProductCart.instance;
  }

  addCart(addProduct, action) {
    const index = this.cartProducts.findIndex((item) => item.id === addProduct.id);

    if (index === -1) {
      action && action([...this.cartProducts, addProduct]);
      return;
    }

    this.alertService.show('Alert!', `Product with SKU: ${addProduct.sku} is already added.`);
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
    return newArrayProducts;
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

  totalOrder() {
    if(!this.cartProducts || this.cartProducts.length === 0){
      return
    } else {
      const prices = this.cartProducts?.map((product) => {
        const priceProduct = product.myPrice ? product.rrp : product.cost_price;
        return parseFloat(priceProduct) * parseFloat(product.quantity);
      });
      const reducer = (accumulator, curr) => accumulator + curr;
      return prices.reduce(reducer);
    }
  }
}
