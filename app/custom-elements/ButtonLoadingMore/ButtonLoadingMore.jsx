import React from 'react';
import {View} from 'react-native';
import {Button} from '@components';
import {makeStyles} from './ButtonLoadingMore.styles';

export const ButtonLoadingMore = ({loading, handleLoadMore}) => {
  const styles = makeStyles();

  return (
    <View style={styles.contentButton}>
      <Button
        onPress={() => handleLoadMore?.()}
        color="info"
        textStyle={{fontFamily: 'montserrat-bold', fontSize: 16}}
        style={styles.button}
        loading={loading}
        disabled={loading}>
        Load More...
      </Button>
    </View>
  );
};
