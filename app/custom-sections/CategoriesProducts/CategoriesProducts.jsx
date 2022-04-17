import React from 'react'
import { FlatList } from 'react-native'
import { Block, theme } from 'galio-framework';
import { makeStyles } from './CategoriesProducts.styles'
import { categories, cardInfo } from './CategoriesProducts.model'
import { CategoryItem } from './components'

const CategoriesProducts = ({ navigation }) => {

  const styles = makeStyles(theme)

  const renderCategory = ({ item }) => (
    <CategoryItem
      title={item.name}
      image={item.image}
    />
  )

  return (
    <Block flex style={styles.group}>
      <CategoryItem
        title={cardInfo.name}
        image={cardInfo.image}
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