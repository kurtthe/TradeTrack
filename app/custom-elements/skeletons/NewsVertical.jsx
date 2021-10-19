import React from 'react';
import SkeletonContent from 'react-native-skeleton-content';
import { StyleSheet, View } from 'react-native';
import { theme } from 'galio-framework';

const firstLayout = [
  {
    width: 200,
    height: 145,
    marginRight: 10,
  },
];

const secondLayout = [
  {
    width: 170,
    height: 20,
    marginLeft: 10,
    marginTop: 5,
  },
  {
    width: 170,
    height: 12,
    marginLeft: 10,
    marginTop: 18,
  },
  {
    width: 170,
    height: 12,
    marginLeft: 10,
    marginTop: 5,
  },
  {
    width: 170,
    height: 12,
    marginLeft: 10,
    marginTop: 5,
  },
  {
    width: 50,
    height: 15,
    marginLeft: 10,
    marginTop: 25,
  },
];
const News = () => {
  return (
    <View style={styles.container}>
      <SkeletonContent
        containerStyle={{ flex: 1, width: 30 }}
        animationDirection="horizontalLeft"
        boneColor="#ECECEC"
        layout={firstLayout}
        isLoading={true}
      />
      <SkeletonContent
        containerStyle={{ flex: 1, width: 30 }}
        animationDirection="horizontalLeft"
        boneColor="#ECECEC"
        layout={secondLayout}
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
    height: 145,
    width: '95%',
    marginHorizontal: 5,

    shadowColor: '#8898AA',
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 2,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default News;
