import React from 'react';
import SkeletonContent from '@marstankev/react-native-skeleton-content';
import { StyleSheet, View } from 'react-native';
import { theme } from 'galio-framework';

const firstLayout = [
  {
    width: 280,
    height: 215,
    marginBottom: 10,
  },
  {
    width: 260,
    height: 20,
    marginBottom: 5,
  },
  {
    width: 260,
    height: 10,
    marginBottom: 5,
  },
  {
    width: 260,
    height: 10,
    marginBottom: 5,
  },
  {
    width: 260,
    height: 10,
    marginBottom: 5,
  },
  {
    width: 260,
    height: 10,
    marginBottom: 5,
  },
];
const News = () => {
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
    minHeight: 114,
    width: '100%',
    marginHorizontal: 5,

    shadowColor: '#8898AA',
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 2,
  },
});
export default News;
