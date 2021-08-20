import React from 'react';
import { Card } from '@components';


const News = (props)=>{
  return (
    <Card
    item={props.item}
    style={{ width: 250, marginLeft: 15 }}
    ctaColor={'#B6584E'}
  />
  )
};

export default News;
