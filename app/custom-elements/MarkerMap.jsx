import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Marker, Callout, CalloutSubview } from 'react-native-maps';
import CustomCallout from '@components/CustomCallout';
import { Block, Text } from 'galio-framework';
import { nowTheme } from '@constants';
import { MaterialIcons } from '@expo/vector-icons';

const MarkerMap = (props) => {
  const getCoordinates = () => {
    const valueCoordinate = props.marker.lat_lng;
    const coordinates = valueCoordinate.split(',');

    return {
      latitude: parseFloat(coordinates[0]),
      longitude: parseFloat(coordinates[1]),
    };
  };

  const dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <Marker coordinate={()=>getCoordinates()}>
      <Callout alphaHitTest tooltip style={styles.customView}>
        <CustomCallout>
          <Block>
            <Block row style={styles.row_info}>
              <MaterialIcons name="store" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
                {props.marker.name}
              </Text>
            </Block>

            <Block row style={styles.row_info}>
              <MaterialIcons name="phone" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <CalloutSubview
                onPress={() => {
                  dialCall(props.marker.phone_number);
                }}
              >
                <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
                  {props.marker.phone_number}
                </Text>
              </CalloutSubview>
            </Block>

            <Block row style={styles.row_info}>
              <MaterialIcons name="email" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <CalloutSubview
                onPress={() =>
                  Linking.openURL(
                    `mailto: ${props.marker.email}?subject= Burdens App &body=Hi There`,
                  )
                }
              >
                <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
                  {props.marker.email}
                </Text>
              </CalloutSubview>
            </Block>

            <Block row style={styles.row_info}>
              <MaterialIcons name="person" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
                {props.marker.manager}
              </Text>
            </Block>

            <Block row style={styles.row_info}>
              <CalloutSubview
                onPress={() => Linking.openURL(`http://maps.google.com/?q=${props.marker.address}`)}
                style={styles.buttonOrder}
              >
                <Text color={'white'} style={{ top: 7 }}>
                  Navigate
                </Text>
              </CalloutSubview>
            </Block>
          </Block>
        </CustomCallout>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  buttonOrder: {
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

export default MarkerMap;
