import React from 'react';
import {
  ScrollView,Text
} from 'react-native';
import { Block, theme } from 'galio-framework';

import News from '@custom-elements/NewsVertical'
import SkeletonNews from '@custom-sections/skeletons/NewsVertical'


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
    <ScrollView horizontal={false} style={{ bottom: 10 }}>
      <Block style={{left: theme.SIZES.BASE / 2}}> 
        {putNews()}
      </Block>
    </ScrollView>
  );
};

export default ListNews;