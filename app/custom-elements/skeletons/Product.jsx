import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { theme } from 'galio-framework';
import LoadingComponent from '@custom-elements/Loading';

const { width } = Dimensions.get('window');

const cardWidth = (width / 2) * 0.87;

const Product = () => {
  return (
    <View style={styles.container}>
      <LoadingComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    width: cardWidth,
    marginHorizontal: 5,
    paddingBottom: 10,

    shadowColor: '#8898AA',
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 2,
  },
});
export default Product;
