import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Linking,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import MapView, {
  Marker,
  Callout,
  CalloutSubview,
  ProviderPropType,
} from 'react-native-maps';
import CustomCallout from '@components/CustomCallout';
import { Block, theme, Text, Button } from 'galio-framework';
import { nowTheme } from '@constants';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -37.81308016558449;
const LONGITUDE = 144.96438183271417;
const LATITUDE_DELTA = 3;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class Callouts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cnt: 0,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },

      markers: [
        {
            id: 1,
            
            name: "Berwick VIC 3806",
            coordinate: {
                          latitude: "-38.0393841" ,
                          longitude: "145.3412336" ,
                      },
            address: "51 Clyde Rd Berwick, VIC Australia 3806",
            phone_number: "(03) 9707 4488",
            email: "berwick@burdens.com.au",
            manager: "Natalie Rumble",
            manager_email: "natalie.rumble@burdens.com.au",
            
        },
        {
            id: 2,
            
            name: "Thomastown VIC 3074",
            coordinate: {
              latitude: "-37.6912349" ,
              longitude: "145.0022803" ,
          },
            address: "1 Chaffey St Thomastown, VIC Australia 3074",
            phone_number: "(03) 9462 3490",
            email: "thomastown@burdens.com.au",
            manager: "Dylan Jacobsen",
            manager_email: "dylan.jacobsen@burdens.com.au",
        },
        {
            id: 3,
            
            name: "Warragul VIC 3820",
            coordinate: {
              latitude: "-38.161985" ,
              longitude: "145.938047" ,
          },
            address: "118 Albert St Warragul, VIC Australia 3820",
            phone_number: "(03) 5623 4511",
            email: "warragul@burdens.com.au",
            manager: "Jimmy Lambeth",
            manager_email: "jimmy.lambeth@burdens.com.au",
        },
        {
            id: 4,
            
            name: "Balwyn VIC 3103",
            coordinate: {
              latitude: "-37.8108037" ,
              longitude: "145.0643341" ,
          },
            address: "101 Whitehorse Rd Balwyn , VIC Australia 3103",
            phone_number: "(03) 9817 4521",
            email: "balwyn@burdens.com.au",
            manager: "Cal Peake",
            manager_email: "callan.peake@burdens.com.au",
        },
        {
            id: 5,
            
            name: "Lilydale VIC 3140",
            coordinate: {
              latitude: "-37.7569496" ,
              longitude: "145.3410173" ,
          },
            address: "3 John St Lilydale, VIC Australia 3140",
            phone_number: "(03) 9739 6900",
            email: "lilydale@burdens.com.au",
            manager: "Lyndall Parsons",
            manager_email: "lyndall.parsons@burdens.com.au",
            
        },
        {
            id: 6,
            name: "Ringwood VIC 3134",
            coordinate: {
              latitude: "-37.7967096" ,
              longitude: "145.2498949" ,
          },
            address: "13 Oban Rd Ringwood, VIC Australia 3134",
            phone_number: "(03) 9870 6422",
            email: "ringwood@burdens.com.au",
            manager: "Andrew Gunsser",
            manager_email: "andrew.gunsser@burdens.com.au",
        },
        {
            id: 7,
            name: "Glen Waverley VIC 3150",
            coordinate: {
              latitude: "-37.8876276" ,
              longitude: "145.1627565" ,
          },
            address: "350 Springvale Rd Glen Waverley, VIC Australia 3150",
            phone_number: "(03) 8562 3500",
            email: "glenwaverley@burdens.com.au",
            manager: "Chris Mifsud",
            manager_email: "chris.mifsud@burdens.com.au",
        },
        {
            id: 8,
            name: "Ferntree Gully VIC 3156",
            coordinate: {
              latitude: "--37.6912349" ,
              longitude: "145.0022803" ,
          },
            address: "1825 Ferntree Gully Rd Ferntree Gully, VIC Australia 3156",
            phone_number: "(03) 9730 5500",
            email: "ferntreegully@burdens.com.au",
            manager: "Matt Lazones",
            manager_email: "matt.lazones@burdens.com.au",
        },
        {
            id: 9,
            name: "Braeside VIC 3195",
            coordinate: {
              latitude: "-37.9865914" ,
              longitude: "145.1124195" ,
          },
            address: "407 Lower Dandenong Rd Braeside, VIC Australia 3195",
            phone_number: "(03) 9262 2111",
            email: "braeside@burdens.com.au",
            manager: "Paul Sheridan",
            manager_email: "paul.sheridan@burdens.com.au",
        },
        {
            id: 10,
            
            name: "Dandenong South VIC 3175",
            coordinate: {
              latitude: "-38.0199584" ,
              longitude: "145.2130819" ,
          },
            address: "203 Frankston - Dandenong Rd Dandenong South, VIC Australia 3175",
            phone_number: "(03) 9703 8484",
            email: "dandenong@burdens.com.au",
            manager: "Brent Murdoch",
            manager_email: "brent.murdoch@burdens.com.au",
        },
        {
            id: 11,
            name: "Pakenham VIC 3810",
            coordinate: {
              latitude: "-38.0864102" ,
              longitude: "145.4959953" ,
          },
            address: "Cnr Bald Hill Rd & Embrey Ct Pakenham, VIC Australia 3810",
            phone_number: "(03) 5945 6800",
            email: "pakenham@burdens.com.au",
            manager: "John Batty",
            manager_email: "johnbatty@burdens.com.au",
        },
        {
            id: 13,

            name: "Somerville VIC 3912",
            coordinate: {
              latitude: "-38.108242" ,
              longitude: "145.283722" ,
          },
            address: "89 Grant Rd Somerville VIC 3912",
            phone_number: "(03) 5973 6499",
            email: "somerville@burdens.com.au",
            manager: "Michael Ligocki",
            manager_email: "michael.ligocki@burdens.com.au",
        },
        {
            id: 14,
            name: "Cranbourne VIC 3977",
            coordinate: {
              latitude: "-38.218677" ,
              longitude: "145.177292" ,
          },
            address: "1/1441 South Gippsland Highway Cranbourne VIC 3977",
            phone_number: "(03) 5973 4510",
            email: "cranbourne@burdens.com.au",
            manager: "Steve Anderton",
            manager_email: "steve.anderton@burdens.com.au",
        }
    ]
    };
  }

  

  show() {
    this.marker1.showCallout();
  }

  hide() {
    this.marker1.hideCallout();
  }

  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
 };

 

  render() {
    const { region, markers } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={region}
          zoomTapEnabled={false}
        >
              <Marker
            coordinate={markers[0].coordinate}
           
            ref={ref => {
              this.marker2 = ref;
            }}
          >
            <Callout
              alphaHitTest
              tooltip
              style={styles.customView}
            >
              <CustomCallout>

                <Block>
                <Block row style={styles.row_info}>
             
                <MaterialIcons name="store" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
             
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[0].name}
              </Text>
              
              </Block>

              <Block row style={styles.row_info}>
             
                <MaterialIcons name="phone" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <CalloutSubview  onPress={()=>{this.dialCall(markers[0].phone_number)}}>
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[0].phone_number}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="email" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
           

              <CalloutSubview  onPress={() => Linking.openURL(`mailto: ${markers[0].email}?subject= Burdens App &body=Hi There`) } >
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[0].email}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="person" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[0].manager}
              </Text>
           
             </Block>

             <Block row style={styles.row_info}>
            
              <CalloutSubview  onPress={() =>    Linking.openURL(`http://maps.google.com/?q=${markers[0].address}`) } 


              style={styles.buttonOrder}
              >
               
              <Text color={'white'} style={{top:7}}>
                Navigate
              </Text>
             
              </CalloutSubview>
              </Block>


              </Block>

             
              </CustomCallout>
            </Callout>
          </Marker>


          <Marker
            coordinate={markers[1].coordinate}
           
            ref={ref => {
              this.marker2 = ref;
            }}
          >
            <Callout
              alphaHitTest
              tooltip
              style={styles.customView}
            >
              <CustomCallout>

                <Block>
                <Block row style={styles.row_info}>
             
                <MaterialIcons name="store" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
             
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[1].name}
              </Text>
              
              </Block>

              <Block row style={styles.row_info}>
             
                <MaterialIcons name="phone" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <CalloutSubview  onPress={()=>{this.dialCall(markers[1].phone_number)}}>
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[1].phone_number}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="email" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
           

              <CalloutSubview  onPress={() => Linking.openURL(`mailto: ${markers[1].email}?subject= Burdens App &body=Hi There`) } >
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[1].email}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="person" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[1].manager}
              </Text>
           
             </Block>

             <Block row style={styles.row_info}>
            
              <CalloutSubview  onPress={() =>    Linking.openURL(`http://maps.google.com/?q=${markers[1].address}`) } 


              style={styles.buttonOrder}
              >
               
              <Text color={'white'} style={{top:7}}>
                Navigate
              </Text>
             
              </CalloutSubview>
              </Block>


              </Block>

             
              </CustomCallout>
            </Callout>
          </Marker>
 

          <Marker
            coordinate={markers[2].coordinate}
           
            ref={ref => {
              this.marker2 = ref;
            }}
          >
            <Callout
              alphaHitTest
              tooltip
              style={styles.customView}
            >
              <CustomCallout>

                <Block>
                <Block row style={styles.row_info}>
             
                <MaterialIcons name="store" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
             
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[2].name}
              </Text>
              
              </Block>

              <Block row style={styles.row_info}>
             
                <MaterialIcons name="phone" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <CalloutSubview  onPress={()=>{this.dialCall(markers[2].phone_number)}}>
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[2].phone_number}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="email" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
           

              <CalloutSubview  onPress={() => Linking.openURL(`mailto: ${markers[2].email}?subject= Burdens App &body=Hi There`) } >
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[2].email}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="person" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[2].manager}
              </Text>
           
             </Block>

             <Block row style={styles.row_info}>
            
              <CalloutSubview  onPress={() =>    Linking.openURL(`http://maps.google.com/?q=${markers[2].address}`) } 


              style={styles.buttonOrder}
              >
               
              <Text color={'white'} style={{top:7}}>
                Navigate
              </Text>
             
              </CalloutSubview>
              </Block>


              </Block>

             
              </CustomCallout>
            </Callout>
          </Marker>


          <Marker
            coordinate={markers[3].coordinate}
           
            ref={ref => {
              this.marker2 = ref;
            }}
          >
            <Callout
              alphaHitTest
              tooltip
              style={styles.customView}
            >
              <CustomCallout>

                <Block>
                <Block row style={styles.row_info}>
             
                <MaterialIcons name="store" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
             
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[3].name}
              </Text>
              
              </Block>

              <Block row style={styles.row_info}>
             
                <MaterialIcons name="phone" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <CalloutSubview  onPress={()=>{this.dialCall(markers[3].phone_number)}}>
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[3].phone_number}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="email" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
           

              <CalloutSubview  onPress={() => Linking.openURL(`mailto: ${markers[3].email}?subject= Burdens App &body=Hi There`) } >
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[3].email}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="person" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[3].manager}
              </Text>
           
             </Block>

             <Block row style={styles.row_info}>
            
              <CalloutSubview  onPress={() =>    Linking.openURL(`http://maps.google.com/?q=${markers[3].address}`) } 


              style={styles.buttonOrder}
              >
               
              <Text color={'white'} style={{top:7}}>
                Navigate
              </Text>
             
              </CalloutSubview>
              </Block>


              </Block>

             
              </CustomCallout>
            </Callout>
          </Marker>

 
          <Marker
            coordinate={markers[4].coordinate}
           
            ref={ref => {
              this.marker2 = ref;
            }}
          >
            <Callout
              alphaHitTest
              tooltip
              style={styles.customView}
            >
              <CustomCallout>

                <Block>
                <Block row style={styles.row_info}>
             
                <MaterialIcons name="store" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
             
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[4].name}
              </Text>
              
              </Block>

              <Block row style={styles.row_info}>
             
                <MaterialIcons name="phone" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <CalloutSubview  onPress={()=>{this.dialCall(markers[4].phone_number)}}>
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[4].phone_number}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="email" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
           

              <CalloutSubview  onPress={() => Linking.openURL(`mailto: ${markers[4].email}?subject= Burdens App &body=Hi There`) } >
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[4].email}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="person" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[4].manager}
              </Text>
           
             </Block>

             <Block row style={styles.row_info}>
            
              <CalloutSubview  onPress={() =>    Linking.openURL(`http://maps.google.com/?q=${markers[4].address}`) } 


              style={styles.buttonOrder}
              >
               
              <Text color={'white'} style={{top:7}}>
                Navigate
              </Text>
             
              </CalloutSubview>
              </Block>


              </Block>

             
              </CustomCallout>
            </Callout>
          </Marker>


          <Marker
            coordinate={markers[5].coordinate}
           
            ref={ref => {
              this.marker2 = ref;
            }}
          >
            <Callout
              alphaHitTest
              tooltip
              style={styles.customView}
            >
              <CustomCallout>

                <Block>
                <Block row style={styles.row_info}>
             
                <MaterialIcons name="store" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
             
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[5].name}
              </Text>
              
              </Block>

              <Block row style={styles.row_info}>
             
                <MaterialIcons name="phone" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <CalloutSubview  onPress={()=>{this.dialCall(markers[5].phone_number)}}>
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[5].phone_number}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="email" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
           

              <CalloutSubview  onPress={() => Linking.openURL(`mailto: ${markers[5].email}?subject= Burdens App &body=Hi There`) } >
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[5].email}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="person" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[5].manager}
              </Text>
           
             </Block>

             <Block row style={styles.row_info}>
            
              <CalloutSubview  onPress={() =>    Linking.openURL(`http://maps.google.com/?q=${markers[5].address}`) } 


              style={styles.buttonOrder}
              >
               
              <Text color={'white'} style={{top:7}}>
                Navigate
              </Text>
             
              </CalloutSubview>
              </Block>


              </Block>

             
              </CustomCallout>
            </Callout>
          </Marker>
 

          <Marker
            coordinate={markers[6].coordinate}
           
            ref={ref => {
              this.marker2 = ref;
            }}
          >
            <Callout
              alphaHitTest
              tooltip
              style={styles.customView}
            >
              <CustomCallout>

                <Block>
                <Block row style={styles.row_info}>
             
                <MaterialIcons name="store" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
             
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[6].name}
              </Text>
              
              </Block>

              <Block row style={styles.row_info}>
             
                <MaterialIcons name="phone" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <CalloutSubview  onPress={()=>{this.dialCall(markers[6].phone_number)}}>
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[6].phone_number}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="email" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
           

              <CalloutSubview  onPress={() => Linking.openURL(`mailto: ${markers[6].email}?subject= Burdens App &body=Hi There`) } >
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[6].email}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="person" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[6].manager}
              </Text>
           
             </Block>

             <Block row style={styles.row_info}>
            
              <CalloutSubview  onPress={() =>    Linking.openURL(`http://maps.google.com/?q=${markers[6].address}`) } 


              style={styles.buttonOrder}
              >
               
              <Text color={'white'} style={{top:7}}>
                Navigate
              </Text>
             
              </CalloutSubview>
              </Block>


              </Block>

             
              </CustomCallout>
            </Callout>
          </Marker>


          <Marker
            coordinate={markers[7].coordinate}
           
            ref={ref => {
              this.marker2 = ref;
            }}
          >
            <Callout
              alphaHitTest
              tooltip
              style={styles.customView}
            >
              <CustomCallout>

                <Block>
                <Block row style={styles.row_info}>
             
                <MaterialIcons name="store" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
             
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[7].name}
              </Text>
              
              </Block>

              <Block row style={styles.row_info}>
             
                <MaterialIcons name="phone" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <CalloutSubview  onPress={()=>{this.dialCall(markers[7].phone_number)}}>
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[7].phone_number}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="email" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
           

              <CalloutSubview  onPress={() => Linking.openURL(`mailto: ${markers[7].email}?subject= Burdens App &body=Hi There`) } >
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[7].email}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="person" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[7].manager}
              </Text>
           
             </Block>

             <Block row style={styles.row_info}>
            
              <CalloutSubview  onPress={() =>    Linking.openURL(`http://maps.google.com/?q=${markers[7].address}`) } 


              style={styles.buttonOrder}
              >
               
              <Text color={'white'} style={{top:7}}>
                Navigate
              </Text>
             
              </CalloutSubview>
              </Block>


              </Block>

             
              </CustomCallout>
            </Callout>
          </Marker>

 
          <Marker
            coordinate={markers[8].coordinate}
           
            ref={ref => {
              this.marker2 = ref;
            }}
          >
            <Callout
              alphaHitTest
              tooltip
              style={styles.customView}
            >
              <CustomCallout>

                <Block>
                <Block row style={styles.row_info}>
             
                <MaterialIcons name="store" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
             
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[8].name}
              </Text>
              
              </Block>

              <Block row style={styles.row_info}>
             
                <MaterialIcons name="phone" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <CalloutSubview  onPress={()=>{this.dialCall(markers[8].phone_number)}}>
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[8].phone_number}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="email" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
           

              <CalloutSubview  onPress={() => Linking.openURL(`mailto: ${markers[8].email}?subject= Burdens App &body=Hi There`) } >
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[8].email}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="person" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[8].manager}
              </Text>
           
             </Block>

             <Block row style={styles.row_info}>
            
              <CalloutSubview  onPress={() =>    Linking.openURL(`http://maps.google.com/?q=${markers[8].address}`) } 


              style={styles.buttonOrder}
              >
               
              <Text color={'white'} style={{top:7}}>
                Navigate
              </Text>
             
              </CalloutSubview>
              </Block>


              </Block>

             
              </CustomCallout>
            </Callout>
          </Marker>


          <Marker
            coordinate={markers[9].coordinate}
           
            ref={ref => {
              this.marker2 = ref;
            }}
          >
            <Callout
              alphaHitTest
              tooltip
              style={styles.customView}
            >
              <CustomCallout>

                <Block>
                <Block row style={styles.row_info}>
             
                <MaterialIcons name="store" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
             
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[9].name}
              </Text>
              
              </Block>

              <Block row style={styles.row_info}>
             
                <MaterialIcons name="phone" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <CalloutSubview  onPress={()=>{this.dialCall(markers[9].phone_number)}}>
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[9].phone_number}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="email" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
           

              <CalloutSubview  onPress={() => Linking.openURL(`mailto: ${markers[9].email}?subject= Burdens App &body=Hi There`) } >
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[9].email}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="person" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[9].manager}
              </Text>
           
             </Block>

             <Block row style={styles.row_info}>
            
              <CalloutSubview  onPress={() =>    Linking.openURL(`http://maps.google.com/?q=${markers[9].address}`) } 


              style={styles.buttonOrder}
              >
               
              <Text color={'white'} style={{top:7}}>
                Navigate
              </Text>
             
              </CalloutSubview>
              </Block>


              </Block>

             
              </CustomCallout>
            </Callout>
          </Marker>
 

          <Marker
            coordinate={markers[10].coordinate}
           
            ref={ref => {
              this.marker2 = ref;
            }}
          >
            <Callout
              alphaHitTest
              tooltip
              style={styles.customView}
            >
              <CustomCallout>

                <Block>
                <Block row style={styles.row_info}>
             
                <MaterialIcons name="store" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
             
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[10].name}
              </Text>
              
              </Block>

              <Block row style={styles.row_info}>
             
                <MaterialIcons name="phone" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <CalloutSubview  onPress={()=>{this.dialCall(markers[10].phone_number)}}>
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[10].phone_number}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="email" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
           

              <CalloutSubview  onPress={() => Linking.openURL(`mailto: ${markers[10].email}?subject= Burdens App &body=Hi There`) } >
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[10].email}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="person" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[10].manager}
              </Text>
           
             </Block>

             <Block row style={styles.row_info}>
            
              <CalloutSubview  onPress={() =>    Linking.openURL(`http://maps.google.com/?q=${markers[10].address}`) } 


              style={styles.buttonOrder}
              >
               
              <Text color={'white'} style={{top:7}}>
                Navigate
              </Text>
             
              </CalloutSubview>
              </Block>


              </Block>

             
              </CustomCallout>
            </Callout>
          </Marker>


          <Marker
            coordinate={markers[11].coordinate}
           
            ref={ref => {
              this.marker2 = ref;
            }}
          >
            <Callout
              alphaHitTest
              tooltip
              style={styles.customView}
            >
              <CustomCallout>

                <Block>
                <Block row style={styles.row_info}>
             
                <MaterialIcons name="store" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
             
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[11].name}
              </Text>
              
              </Block>

              <Block row style={styles.row_info}>
             
                <MaterialIcons name="phone" size={24} color={nowTheme.COLORS.LIGHTGRAY} />

              <CalloutSubview  onPress={()=>{this.dialCall(markers[11].phone_number)}}>
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[11].phone_number}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="email" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
           

              <CalloutSubview  onPress={() => Linking.openURL(`mailto: ${markers[11].email}?subject= Burdens App &body=Hi There`) } >
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText_}>
              {markers[11].email}
              </Text>
              </CalloutSubview>
              </Block>

              <Block row style={styles.row_info}>
             
             <MaterialIcons name="person" size={24} color={nowTheme.COLORS.LIGHTGRAY} />
          
              <Text color={nowTheme.COLORS.PRICE_COLOR} style={styles.MapsText}>
              {markers[11].manager}
              </Text>
           
             </Block>

             <Block row style={styles.row_info}>
            
              <CalloutSubview  onPress={() =>    Linking.openURL(`http://maps.google.com/?q=${markers[11].address}`) } 


              style={styles.buttonOrder}
              >
               
              <Text color={'white'} style={{top:7}}>
                Navigate
              </Text>
             
              </CalloutSubview>
              </Block>


              </Block>

             
              </CustomCallout>
            </Callout>
          </Marker>

 

         
        </MapView>
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
    backgroundColor:'#0E3A90',
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 50,
    borderRadius:5,
  },
  row_info:{

    paddingBottom:7.5

  },
  MapsText: {
    paddingLeft: 12,
    fontSize: 14,
    top:4
  },
  MapsText_: {
    paddingLeft: 12,
    fontSize: 14,
    top:4,
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

export default Callouts;