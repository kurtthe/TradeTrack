import React from 'react';
import {
  ScrollView,
} from 'react-native';
import { Block } from 'galio-framework';

import News from '@custom-elements/News'

const ListNews = (props) => {
  const putNews = ()=>{
    return props.news.map((item)=>(
      <News item={item} />
    ))
  }

  return (
    <ScrollView horizontal={true} style={{ bottom: 10 }}>
      <Block flex row>
        {putNews()}
      </Block>
    </ScrollView>
  );
};

export default ListNews;
