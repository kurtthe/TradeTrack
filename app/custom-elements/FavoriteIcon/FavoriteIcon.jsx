import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { makeStyles } from './FavoriteIcon.styles'
import nowTheme from '@constants/Theme';
import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';

export const FavoriteIcon = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(product.favourite || false)
  const styles = makeStyles()

  const generalRequestService = GeneralRequestService.getInstance();

  useEffect(() => {
    const updateProduct = async () => {
      const urlPetition = endPoints.setFavorite.replace(":id", product.id)
      await generalRequestService.post(urlPetition, {
        data: {
          sku: product.sku,
          cost_price: product.cost_price,
          favourite: isFavorite
        }
      })
    }
    updateProduct()
  }, [isFavorite])

  const handleOnPress = async () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      {
        isFavorite ? (<AntDesign name="star" size={30} color={nowTheme.COLORS.INFO} />) : (
          <AntDesign name="staro" size={30} color={nowTheme.COLORS.INFO} />
        )
      }
    </TouchableOpacity>
  )
}
