import React from 'react';
import { Block } from 'galio-framework';
import { Skeleton } from 'moti/skeleton';

const News = () => {
  return (
    <Block style={{marginHorizontal: 8}}>
      <Skeleton show={true} colorMode='light' radius="square" height={280} width={300} />
    </Block>
    );
};

export default News;
