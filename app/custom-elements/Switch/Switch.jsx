import React, { useState } from 'react';
import { Block, Text } from 'galio-framework';
import { Switch, Platform } from 'react-native';
import { nowTheme } from '@constants';
import { makeStyles } from './Switch.styles'

const SwitchComponent = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const styles = makeStyles()
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
      <Block row flex style={styles.switchBlock}>
        <Text size={16} style={styles.title}>
          {props.title}
        </Text>
        {props.description && (
          <Text style={{ fontFamily: 'montserrat-regular' }} size={14.5} color={'#848893'}>
            {props.description}
          </Text>)}

        <Block center style={{ width: '20%', alignItems: 'flex-end' }}>
          {renderSwitch()}
        </Block>
      </Block>
    );
  }

  return <>{renderSwitch()}</>;
};



export default SwitchComponent;
