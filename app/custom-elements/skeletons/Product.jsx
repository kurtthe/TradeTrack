import React from 'react';
import SkeletonContent from 'react-native-skeleton-content';
import { StyleSheet, Dimensions, View } from 'react-native';
import { theme } from 'galio-framework';

const { width } = Dimensions.get('window');

const cardWidth = (width / 2) * 0.87;

const firstLayout = [
  {
    width: cardWidth,
    height: 215,
    marginBottom: 10,
  },
  {
    width: cardWidth,
    height: 20,
    marginBottom: 5,
  },
  {
    width: cardWidth,
    height: 10,
    marginBottom: 5,
  },
  {
    width: cardWidth,
    height: 10,
    marginBottom: 5,
  },
  {
    width: cardWidth,
    height: 40,
    marginTop: 50,
  },
];
const Product = () => {
  return (
    <View style={styles.container}>
      <SkeletonContent
        containerStyle={{ flex: 1, width: 300 }}
        animationDirection="horizontalLeft"
        boneColor="#ECECEC"
        layout={firstLayout}
        isLoading={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
