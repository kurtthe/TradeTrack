import React from 'react';
import { ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';

import News from '@custom-elements/News';
import SkeletonNews from '@custom-elements/skeletons/NewsVertical';

const ListNews = (props) => {
  const putNews = () => {
    if (props.data.length === 0) {
      return (
        <>
          <SkeletonNews />
          <SkeletonNews />
          <SkeletonNews />
        </>
      );
    }

    return props.data.map((item, index) => <News key={index} news={item} vertical={true} />);
  };

  return (
    <ScrollView horizontal={false} style={{ bottom: 10 }}>
      <Block style={{ left: theme.SIZES.BASE / 2 }}>{putNews()}</Block>
    </ScrollView>
  );
};

export default ListNews;
