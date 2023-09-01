import React from 'react'
import { FlatList } from 'react-native'
import { Block } from 'galio-framework';
import { categories, cardInfo } from './CategoriesProducts.model'
import { CategoryItem } from './components'
import { useDispatch } from 'react-redux';
import {
  selectedCategory,
} from '@core/module/store/filter/filter';
import { useNavigation } from '@react-navigation/native';

const CategoriesProducts = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();

  const handleCategory = (item) => {
    setTimeout(() => {
      dispatch(selectedCategory(item.id))
      navigation.navigate('Category', {
        nameRouteGoing: 'Products',
      });
    }, 1000)
  }

  const renderCategory = ({ item }) => (
    <CategoryItem
      title={item.name}
      image={item.image}
      onPress={() => handleCategory(item)}
    />
  )

  return (
    <Block flex >
      <CategoryItem
        title={cardInfo.name}
        image={cardInfo.image}
        onPress={() => handleCategory(cardInfo)}
      />
      <FlatList
        data={categories}
        renderItem={renderCategory}
        numColumns={2}
        keyExtractor={(item, index) => `${index}-${item.title}`}
        scrollEnabled={false}
      />
    </Block>
  )
}

export default CategoriesProducts
