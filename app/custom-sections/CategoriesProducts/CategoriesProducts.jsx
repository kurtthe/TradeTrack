import React from 'react'
import { FlatList } from 'react-native'
import { Block, theme } from 'galio-framework';
import { makeStyles } from './CategoriesProducts.styles'
import { categories, cardInfo } from './CategoriesProducts.model'
import { CategoryItem } from './components'
import { withNavigation } from '@react-navigation/compat';

const CategoriesProducts = (props) => {

  const styles = makeStyles(theme)

  const handleCategory = (item) => {
    props.navigation.navigate('Category', {
      headerTitle: `${item.name}`,
      allProducts: item.name === cardInfo.name,
      category: item
    })
  }

  const renderCategory = ({ item }) => (
    <CategoryItem
      title={item.name}
      image={item.image}
      onPress={() => handleCategory(item)}
    />
  )

  return (
    <Block flex style={styles.group}>
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

export default withNavigation(CategoriesProducts)