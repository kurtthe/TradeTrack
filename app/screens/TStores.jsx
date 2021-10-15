import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Linking, Platform } from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';
import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';
import MarkMap from '@custom-elements/MarkMap';
import Loading from '@custom-elements/Loading';
import CustomCallout from '@components/CustomCallout';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -37.81308016558449;
const LONGITUDE = 144.96438183271417;
const LATITUDE_DELTA = 3;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class TStores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cnt: 0,
      markers: [],
      region: null,
    };

    this.generalRequest = GeneralRequestService.getInstance();
  }

  async componentDidMount() {
    const getStores = await this.generalRequest.get(endPoints.stores);

    const newStores = this.setCoordinateStore(getStores.locations);

    this.setState({
      markers: newStores,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    });
  }

  setCoordinateStore = (stores = []) =>
    stores.map((store) => {
      return {
        ...store,
        ...this.separateLatLong(`${store.lat_lng}`),
      };
    });

  separateLatLong = (value = '') => {
    if (!value || value === '' || !value.includes(',')) {
      return value;
    }
    const arrarCor = value.split(',');

    
    
    return {
      coordinate: {
        latitude: parseFloat(arrarCor[0]),
        longitude: parseFloat(arrarCor[1]),
      },
    };
  };

  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  getMarkers = () =>
    this.state.markers.map((mark, index) => (
      <Marker key={index} coordinate={mark.coordinate}>
        <Callout alphaHitTest tooltip style={styles.customView}>
          <CustomCallout>
            <MarkMap mark={mark} actionCall={(numberCall) => this.dialCall(numberCall)} />
          </CustomCallout>
        </Callout>
      </Marker>
    ));

  render() {
    if (this.state.region === null && this.state.markers.length === 0) {
      return <Loading />;
    }

    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          zoomTapEnabled={true}
        >
          {this.getMarkers()}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  customView: {
    width: 140,
    height: 140,
  },
});

export default TStores;
