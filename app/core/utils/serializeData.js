import {
  ALL_PRODUCTS_FILTER,
  PRODUCT_CATEGORY,
  STATEMENTS,
  INVOICES,
  ORDERS,
  DEFAULT
} from '@shared/dictionaries/typeDataSerialize'

export const serializeData = {
  [ALL_PRODUCTS_FILTER]: (data) => serializeProductsAll(data),
  [PRODUCT_CATEGORY]: (data) => serializeProducts(data),
  [STATEMENTS]: (data) => serializeProductsAll(data),
  [INVOICES]: (data) => serializeProductsAll(data),
  [ORDERS]: (data) => serializeProductsAll(data),
  [DEFAULT]: (data) => serializeProductsAll(data),
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