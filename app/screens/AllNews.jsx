import React from 'react';
import { endPoints } from '@shared/dictionaries/end-points';

import ListData from '@custom-sections/ListData';
import News from '@custom-elements/News';
import { DEFAULT } from '@shared/dictionaries/typeDataSerialize'

const AllNews = () => {

  const renderItems = ({ item }) => (
    <News news={item} vertical={true} />
  )

  return <ListData
    endpoint={endPoints.news}
    renderItems={renderItems}
    typeData={DEFAULT}
  />;
}

export default AllNews;
