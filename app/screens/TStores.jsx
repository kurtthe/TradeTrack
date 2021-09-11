import React from 'react';
import { StyleSheet, View, Dimensions, Linking, Platform } from 'react-native';
import MapView, { Marker, Callout, CalloutSubview, ProviderPropType } from 'react-native-maps';
import CustomCallout from '@components/CustomCallout';
import { Block, Text } from 'galio-framework';
import { nowTheme } from '@constants';
import { MaterialIcons } from '@expo/vector-icons';
import { GeneralRequestService } from '@core/services/general-request.service';
import { endPoints } from '@shared/dictionaries/end-points';
import MarkerMap from '@custom-elements/MarkerMap'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -37.81308016558449;
const LONGITUDE = 144.96438183271417;
const LATITUDE_DELTA = 3;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class Callouts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stores: [],
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };

    this.generalRequest = GeneralRequestService.getInstance();
  }

  async componentDidMount() {
    const {locations} = await this.generalRequest.get(endPoints.stores);

    this.setState({
      stores: locations,
      loading: false
    });
  }

  renderStore = () => {
    if(this.state.stores.length === 0 ){
      return;
    }

    return this.state.stores.map((item, index)=>(
        <MarkerMap 
          key={index}
          marker={item}
        />
    ))
  };

  renderContent = () => {
    const { region } = this.state;

    return (
      <MapView
        provider={this.props.provider}
        style={styles.map}
        initialRegion={region}
        zoomTapEnabled={false}
      >
        {this.renderStore()}
      </MapView>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? <Text>Loading...</Text> : <>{this.renderContent()}</>}
      </View>
    );
  }
}

Callouts.propTypes = {
  provider: ProviderPropType,
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

export default Callouts;
