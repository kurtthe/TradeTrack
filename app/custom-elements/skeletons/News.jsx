import React from 'react';
import { Block } from 'galio-framework';
import { Skeleton } from 'moti/skeleton';

const News = () => {
  return (
    <Block style={{marginHorizontal: 8}}>
      <Skeleton show={true} colorMode='light' radius="square" height={250} width={200} />
    </Block>
    );
};

export default News;
