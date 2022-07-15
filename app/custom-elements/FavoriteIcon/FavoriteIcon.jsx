import React, { useState, useCallback } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { makeStyles } from './FavoriteIcon.styles'
import nowTheme from '@constants/Theme';
import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';
import Loading from '../Loading';

export const FavoriteIcon = ({ product, updateProduct }) => {

  const [isFavorite, setIsFavorite] = useState(product.favourite)
  const [isLoading, setIsLoading] = useState(false)
  const styles = makeStyles()

  const generalRequestService = GeneralRequestService.getInstance();

  const updateProductFavorite = useCallback(async () => {
    const urlPetition = endPoints.setFavorite.replace(":id", product.id)
    const response = await generalRequestService.post(urlPetition, {})
    updateProduct && updateProduct({ ...product, ...response })
    setIsFavorite(!isFavorite)
    setIsLoading(false)
  }, [isFavorite, product, isLoading])

  const handleOnPress = () => {
    setIsLoading(true)
    updateProductFavorite()
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    )
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
