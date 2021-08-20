import React from 'react';
import SkeletonContent from 'react-native-skeleton-content';
import {View} from 'react-native'

const firstLayout = [
  {
    width: 200,
    height: 20,
    marginBottom: 10,
  },
  {
    width: 120,
    height: 20,
    marginBottom: 10,
  },
  {
    width: 200,
    height: 20,
    marginBottom: 10,
  },
  {
    marginTop: 20,
    width: 350,
    height: 20,
    marginBottom: 10,
  },
  {
    width: 200,
    height: 20,
    marginBottom: 10,
  },
  {
    width: 200,
    height: 20,
    marginBottom: 10,
  },
  {
    marginTop: 20,
    width: 200,
    height: 20,
    marginBottom: 10,
  },
  {
    width: 360,
    height: 20,
    marginBottom: 10,
  },
  {
    marginTop: 20,
    width: 200,
    height: 20,
    marginBottom: 10,
  },
  {
    width: 360,
    height: 20,
    marginBottom: 10,
  },

  {
    marginTop: 20,
    width: 360,
    height: 20,
    marginBottom: 10,
  },
  {
    width: 360,
    height: 20,
    marginBottom: 10,
  },
  {
    width: 360,
    height: 20,
    marginBottom: 10,
  },
  {
    width: 360,
    height: 20,
    marginBottom: 10,
  },
  {
    width: 360,
    height: 20,
    marginBottom: 10,
  },
];
const Invoices = () => {

  return (
    <View style={{padding: 10}}>
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

export default Invoices;
