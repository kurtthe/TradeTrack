import React from 'react';
import { endPoints } from '@shared/dictionaries/end-points';

import ListNews from '@custom-sections/ListNewsVertical';
import ListData from '@custom-sections/ListData';

class AllNews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ListData endpoint={endPoints.news} children={<ListNews/>} />;
  }
}

export default AllNews;
