import React from 'react';
import { ScrollView } from 'react-native';
import { Block, Text } from 'galio-framework';
import { makeStyles } from './ListRadioButton.styles'
import { nowTheme } from '@constants';
import RadioGroup from 'react-native-radio-buttons-group';

export const ListRadioButton = ({
  onChange,
  options
}) => {
  const styles = makeStyles()

  if (!options || options.length === 0) {
    return (
      <Block style={styles.actionSheet}>
        <Text> No categories found </Text>
      </Block>
    )
  }

  return (
    <ScrollView style={styles.actionSheet}>
      <RadioGroup
        containerStyle={styles.listRadios}
        radioButtons={options}
        color={nowTheme.COLORS.INFO}
        onPress={pick => onChange(pick)}
      />
    </ScrollView>
  )
}