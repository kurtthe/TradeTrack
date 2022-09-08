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

  getProductData(product) {
    return this.cartProducts.find((item) => item.sku === product.sku);
  }

  addCart(addProduct, action) {
    const getProduct = this.getProductData(addProduct)

    if (!getProduct) {
      if (!addProduct.hasOwnProperty('quantity')) {
        addProduct['quantity'] = 1
      }

      this.cartProducts = [...this.cartProducts, addProduct]
    } else {
      const newCant = parseInt(getProduct.quantity) + 1
      this.cartProducts = this.updateCant(getProduct.sku, newCant)
    }
    action && action(this.cartProducts);
    return this.cartProducts
  }

  addMultipleCart(products) {
    products?.forEach((product) => {
      if (product.sku === null) {
        this.alertService.show("", "Product without SKU")
        return
      }

      return this.addCart(product)
    })
    return this.cartProducts
  }

  updateCant(skuProduct, newCant, action) {
    const newArrayProducts = this.cartProducts.map((item) => {
      if (item.sku !== skuProduct) {
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
    if (!this.cartProducts || this.cartProducts.length === 0) {
      return
    } else {
      const prices = this.cartProducts?.map((product) => {
        const priceProduct = product.myPrice ? product.rrp : product.cost_price;
        return parseFloat(priceProduct) * parseFloat(product.quantity);
      });
      const reducer = (accumulator, curr) => accumulator + curr;
      return prices.reduce(reducer).toFixed(2);
    }
  }
}
