import {
  ALL_PRODUCTS_FILTER,
  PRODUCT_CATEGORY
} from '@shared/dictionaries/typeDataSerialize'

export const serializeData = {
  [ALL_PRODUCTS_FILTER]: (data) => serializeProductsAll(data),
  [PRODUCT_CATEGORY]: (data) => serializeProducts(data)
}

const serializeProductsAll = (data) => {
  return data
}
const serializeProducts = (data) => {
  let newData = []

  data?.forEach((dataProduct) => {
    if (dataProduct.products?.length > 0) {
      newData = [...dataProduct.products]
    }
  });

  return newData;
}