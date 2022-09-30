import React, { Component } from 'react';
import {StyleSheet, View, Dimensions, Linking, Platform, Modal, TouchableOpacity, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';
import MarkMap from '@custom-elements/MarkMap';
import Loading from '@custom-elements/Loading';
import Restricted from '@custom-elements/Restricted';

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
      modalVisible: false,
      markSelected: [],
      restricted: false,
    };

    this.generalRequest = GeneralRequestService.getInstance();
  }

  async componentDidMount() {
    const getStores = await this.generalRequest.get(endPoints.stores);

    if( getStores.restricted ){
      this.setState({ restricted: true })
      return;
    }

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
      <Marker key={index} coordinate={mark.coordinate} onPress={() => this.setState({modalVisible: !this.state.modalVisible, markSelected: mark})} />
    ));

  render() {
    if (this.state.region === null && this.state.markers.length === 0 && !this.state.restricted) {
      return <Loading />;
    }

    if (this.state.restricted) {
      return (
        <View style={styles.container}>
          <Restricted />
        </View>
      )
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
        <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          this.setState({modalVisible: !this.state.modalVisible});
        }}
      >
        <TouchableOpacity style={styles.centeredView} onPress={() => this.setState({modalVisible: !this.state.modalVisible})}>
          <MarkMap 
            mark={this.state.markSelected} 
            actionCall={(numberCall) => this.dialCall(numberCall)} 
            onClose={() => {
              this.setState({modalVisible: !this.state.modalVisible});
            }}
          />
        </TouchableOpacity>
      </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});

export default TStores;
