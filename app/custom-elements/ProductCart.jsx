import React from 'react';
import { StyleSheet, Dimensions, Image, Platform } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { nowTheme } from '@constants/index';

const { width } = Dimensions.get('screen');

const ProductCart = (props) => {
  return (
    <Block card shadow style={styles.product}>
      <Block flex row>
        <Image source={{ uri: props.product.image }} style={styles.imageHorizontal} />
        <Block flex style={styles.productDescription}>
          <Block row>
            <Text color={nowTheme.COLORS.LIGHTGRAY}>{`SKU `}</Text>
            <Text color={nowTheme.COLORS.INFO}>FIE228106B</Text>
          </Block>

          <Text size={14} style={styles.productTitle} color={nowTheme.COLORS.TEXT}>
            {props.product.title}
          </Text>
          <Block flex left row space="between">
            <Text
              style={{ fontWeight: 'bold', marginTop: 10 }}
              color={nowTheme.COLORS.ORANGE}
              size={20}
            >
              ${props.product.price * props.product.qty}
            </Text>
            <Button
              color="warning"
              textStyle={{ fontFamily: 'montserrat-bold', fontSize: 14, color: '#0E3A90' }}
              style={styles.buttonOrder}
            >
              Re-Order
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  product: {
    width: width * 0.92,
    borderWidth: 0,
    marginVertical: theme.SIZES.BASE * 0.5,
    marginHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: theme.SIZES.BASE / 4,
    shadowOpacity: 0.1,
    elevation: 2,
    borderRadius: 3,
  },
  productTitle: {
    fontFamily: 'montserrat-regular',
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 10,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
    paddingBottom: 0,
  },
  imageHorizontal: {
    height: nowTheme.SIZES.BASE * 5,
    width: nowTheme.SIZES.BASE * 5,
    margin: nowTheme.SIZES.BASE / 2,
  },

  buttonOrder: {
    width: '35%',
    height: 30,
  },
});

export default ProductCart;
