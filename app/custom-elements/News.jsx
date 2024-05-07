import React, { useState } from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Image, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '@constants';
import BottomModal from '@custom-elements/BottomModal';
import WebView from '@custom-elements/WebView';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const News = (props) => {
  const [showModal, setShowModal] = useState(false);

  const dateCreate = `${props.news.added_date}`.split(' ');

  const putContent = () => {
    if (!props.vertical) {
      return (
        <Block card flex style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              source={{ uri: props.news.preview.image }}
              style={styles.imagePreview}
            />
          </View>

          <Block flex style={styles.info}>
            <Block style={{ marginBottom: 10 }}>
              <Text
                size={14}
                style={styles.cardTitle}
                color={nowTheme.COLORS.SECONDARY}
                numberOfLines={2}
              >
                {props.news.preview.title}
              </Text>
            </Block>
            <Block style={{ marginBottom: 10 }}>
              <Text size={14} color={'#858C9C'} style={styles.cardDescription} numberOfLines={3}>
                {props.news.preview.description}
              </Text>
            </Block>

            <Block row>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Text style={styles.cardRead} size={14} color={'#0E3A90'}>
                  Read More
                </Text>
              </TouchableOpacity>

              <Block style={{ left: '340%' }}>
                <Text style={styles.cardDate} size={14} color={'#B6584E'}>
                  {dateCreate[0]}
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>
      );
    }

    return (
      <Block card row style={styles.containerV}>
        <View style={styles.imageContainerV}>
          <Image
            resizeMode="cover"
            source={{ uri: props.news.preview.image }}
            style={styles.imagePreviewV}
          />
        </View>
        <Block flex style={styles.infoV}>
          <Block>
            <Text
              size={14}
              style={styles.cardTitle}
              color={nowTheme.COLORS.SECONDARY}
              numberOfLines={2}
            >
              {props.news.preview.title}
            </Text>
          </Block>
          <Block>
            <Text size={14} color={'#858C9C'} style={styles.cardDescription} numberOfLines={3}>
              {props.news.preview.description}
            </Text>
          </Block>

          <Block row>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Text style={styles.cardRead} size={14} color={'#0E3A90'}>
                Read More
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    );
  };

  return (
    <>
      {putContent()}


      <BottomModal show={showModal} close={() => setShowModal(false)} sharedMessage={`Shared All the latest news- ${props.news.preview.title} read more ${props.news.link} `}>

        <View style={styles.view_h}>
          <WebView url={props.news.link} />
        </View>
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({

  view_h: {
    height: (Platform.OS === 'ios')  ?   ( (Dimensions.get('window').height < 870) ? hp('78.5%') :hp('80%'))  : ((Dimensions.get('window').height < 595) ? hp('77.5%') : ((Dimensions.get('window').height > 600) && (Dimensions.get('window').height < 900) ? hp('79.5%'): hp('84%')))
  },
  cardDate: {
    textAlign: 'right',
    marginRight: 35,
    fontWeight: 'bold',
    paddingBottom: 10,
  },

  cardRead: {
    left: '12%',
    fontWeight: 'bold',
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  cardTitle: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 10,
  },
  container: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    width: 280,
    marginHorizontal: 5,

    shadowColor: '#8898AA',
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#8898AA',
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  imagePreview: {
    height: 215,
  },
  info: {
    padding: theme.SIZES.BASE / 2,
  },
//  styles Vertical News
  cardRead: {
    textAlign: 'right', 
    marginLeft: 8,
    fontWeight:'bold',
    paddingBottom: 10,
    fontWeight:'bold'
  },
  containerV: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    height: 145,
    width: '95%',
    marginHorizontal: 5,

    shadowColor: '#8898AA',
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  imageContainerV: {
    width: '50%',
    height: '100%',
  },
  imagePreviewV: {
    height: 145,
  },
  infoV: {
    paddingHorizontal: 10,
  },
});

export default withNavigation(News);
