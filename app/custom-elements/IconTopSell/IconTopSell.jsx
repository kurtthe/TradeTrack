import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import nowTheme from '@constants/Theme';

export const IconTopSell = ({ product }) => {

  return (
    product.top_seller ? (<Ionicons name="trending-up" size={30} color={nowTheme.COLORS.INFO} />) : null
  )
}
