import React, { useState, cloneElement, useEffect } from 'react';
import { View } from 'react-native';
import { Block, Text } from 'galio-framework';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { nowTheme } from '@constants';

const Tabs = (props) => {
  const [indexSelectedTab, setIndexSelectedTab] = useState(0);

  useEffect(() => {
    setIndexSelectedTab(props.tabIndexSelected);
  });

  getLabels = () => {
    return props.optionsTabsRender.map((item) => item.labelTab);
  };

  handleCustomIndexSelect = (index) => {
    setIndexSelectedTab(index);

    props.changeIndexSelected && props.changeIndexSelected(index);
  };

  getComponent = () => {
    return props.optionsTabsRender[indexSelectedTab].component;
  };

  if (props.optionsTabsRender.length === 0) {
    return <Text>Not found options render</Text>;
  }

  return (
    <View>
     
        <SegmentedControlTab
          values={getLabels()}
          selectedIndex={indexSelectedTab}
          onTabPress={handleCustomIndexSelect}
          borderRadius={0}
          tabsContainerStyle={{ height: 50, backgroundColor: '#F2F2F2' }}
          tabStyle={{
            backgroundColor: '#FFFFFF',
            borderWidth: 0,
            borderColor: 'transparent',
            borderBottomWidth: 2,
            borderBottomColor: '#D2D2D2',
          }}
          activeTabStyle={{
            backgroundColor: nowTheme.COLORS.BACKGROUND,
            marginTop: 2,
            borderBottomWidth: 2,
            borderBottomColor: nowTheme.COLORS.INFO,
          }}
          tabTextStyle={{ color: '#444444', fontWeight: 'bold' }}
          activeTabTextStyle={{ color: nowTheme.COLORS.INFO }}
        />
     
      {cloneElement(getComponent())}
    </View>
  );
};

export default Tabs;
