import React from 'react'
import { Card } from '@components';
import { Block, theme } from 'galio-framework';

const CategoriesProducts = ()=> {
  return (
    <>
      <Block flex style={styles.group}>
        <Card
          categoryCard
          onPress={() =>
            this.props.navigation.navigate('Category', {
              headerTitle: 'All Products',
            })
          }
          item={cardInfo}
          style={{ marginRight: theme.SIZES.BASE }}
        />
      </Block>
    </>
  )
}

export default CategoriesProducts