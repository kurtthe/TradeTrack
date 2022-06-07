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

    dispatch(selectedCategory(item.id))
    setTimeout(() => navigation.navigate('Category'), 500)
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
      />
    </Block>
  )
}

export default CategoriesProducts