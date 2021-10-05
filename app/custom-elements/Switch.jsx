import React, { useState } from 'react';
import { Block, theme, Text } from 'galio-framework';
import { Switch, Platform, StyleSheet } from 'react-native';
import { nowTheme } from '@constants';

const SwitchComponent = (props) => {
  const [isChecked, setIsChecked] = useState(true);

  const handleChange = () => {
    setIsChecked(!isChecked);
    props.onChange && props.onChange(isChecked);
  };

  const renderSwitch = () => (
    <Switch
      value={isChecked}
      onChange={() => handleChange()}
      ios_backgroundColor={'#D8D8D8'}
      trackColor={{
        true: nowTheme.COLORS.INFO,
        false: Platform.OS == 'ios' ? '#d3d3d3' : '#333',
      }}
    />
  );

  if (props.card) {
    return (
      <Block row flex style={(styles.group, styles.switchBlock)}>
        <Block style={styles.textBlock}>
          <Text size={16} style={styles.title}>
            {props.title}
          </Text>
          <Text style={{ fontFamily: 'montserrat-regular' }} size={14.5} color={'#848893'}>
            {props.description}
          </Text>
        </Block>
        <Block center style={{ width: '20%', alignItems: 'flex-end' }}>
          {renderSwitch()}
        </Block>
      </Block>
    );
  }

  return <>{renderSwitch()}</>;
};

const styles = StyleSheet.create({
  switchBlock: {
    paddingHorizontal: theme.SIZES.BASE * 0.7,
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 8,
  },
  textBlock: {
    width: '80%',
    paddingVertical: theme.SIZES.BASE * 1.3,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'montserrat-bold',
    color: nowTheme.COLORS.HEADER,
    paddingBottom: 5,
  },
  group: {
    padding: 14,
  },
});

export default SwitchComponent;
