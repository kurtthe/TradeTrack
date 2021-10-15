import React from 'react';
import { Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from 'galio-framework';
import { nowTheme } from '@constants';
import { MaterialIcons } from '@expo/vector-icons';

const MarkMap = (props) => {

  const actionCall = (numberPhone) => {
    props.actionCall && props.actionCall(numberPhone);
  };

  return (
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

      <Block row style={styles.row_info}>
        <TouchableOpacity
          onPress={() => Linking.openURL(`http://maps.google.com/?q=${props.mark.address}`)}
          style={styles.buttoNavigate}
        >
          <Text color={'white'} style={{ top: 7 }}>
            Navigate
          </Text>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  buttoNavigate: {
    width: '55%',
    height: 30,
    backgroundColor: '#0E3A90',
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 50,
    borderRadius: 5,
  },
  row_info: {
    paddingBottom: 7.5,
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
  customView: {
    width: 140,
    height: 140,
  },
  plainView: {
    width: 60,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  calloutButton: {
    width: 'auto',
    backgroundColor: '#0E3A90',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default MarkMap;
