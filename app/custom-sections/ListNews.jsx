import React from 'react';
import {
  ScrollView,Text
} from 'react-native';
import { Block } from 'galio-framework';

import News from '@custom-elements/News'
import SkeletonNews from '@custom-sections/skeletons/News'

const ListNews = (props) => {
  const putNews = ()=>{
    if(props.news.length === 0){
      return(
        <>
          <SkeletonNews />
          <SkeletonNews />
          <SkeletonNews />
        </>
      )
    }
    
    return props.news.map((item, index)=>(
      <News key={index} news={item} />
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
