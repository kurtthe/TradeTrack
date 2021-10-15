import React from 'react';
import { Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from 'galio-framework';
import { nowTheme } from '@constants';
import { MaterialIcons } from '@expo/vector-icons';
import CustomCallout from './CustomCallout';

const MarkMap = (props) => {
  const actionCall = (numberPhone) => {
    props.actionCall && props.actionCall(numberPhone);
  };

  return (
    <CustomCallout>
      <Block>
        <Block row style={styles.row_info}>
          <MaterialIcons name="store" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

          <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
            {props.mark.name}
          </Text>
        </Block>

        <Block row style={styles.row_info}>
          <MaterialIcons name="phone" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

          <TouchableOpacity onPress={() => actionCall(props.mark.phone_number)}>
            <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {props.mark.phone_number}
            </Text>
          </TouchableOpacity>
        </Block>

        <Block row style={styles.row_info}>
          <MaterialIcons name="email" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`mailto: ${props.mark.email}?subject= Burdens App &body=Hi There`)
            }
          >
            <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {props.mark.email}
            </Text>
          </TouchableOpacity>
        </Block>

        <Block row style={styles.row_info}>
          <MaterialIcons name="person" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

          <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
            {props.mark.manager}
          </Text>
        </Block>

        <Block row center style={styles.row_info}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`http://maps.google.com/?q=${props.mark.address}`)}
            style={styles.buttoNavigate}
          >
            <Text color={'white'}>
              Navigate
            </Text>
          </TouchableOpacity>
        </Block>
      </Block>
    </CustomCallout>
  );
};

const styles = StyleSheet.create({
  buttoNavigate: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#0E3A90',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  },
  row_info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2
  },
  MapsText: {
    paddingLeft: 12,
    fontSize: 14,
    top: 4,
  },
  MapsText_: {
    paddingLeft: 12,
    fontSize: 14,
    top: 4,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

export default MarkMap;
