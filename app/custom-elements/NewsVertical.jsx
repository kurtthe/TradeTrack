import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Image, TouchableWithoutFeedback, View } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '@constants';

const News = (props) => {
  const dateCreate = `${props.news.added_date}`.split(' ');

  return (
    <TouchableWithoutFeedback>

      
      <Block card flex style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="cover"
            source={{ uri: props.news.preview.image }}
            style={styles.imagePreview}
          />
        </View>

        <Block  flex style={styles.info}>
          <Block style={{marginBottom: 10}}>
            <Text size={14} style={styles.cardTitle} color={nowTheme.COLORS.SECONDARY}  numberOfLines={2} >
              {props.news.preview.title}
            </Text>
          </Block>
          <Block style={{marginBottom: 10}}>
            <Text size={14} color={'#858C9C'} style={styles.cardDescription}  numberOfLines={3}>
              {props.news.preview.description}
            </Text>
          </Block>
          
          <Text style={styles.cardDate} size={14} color={'#B6584E'}>
            {dateCreate[0]}
          </Text>
        </Block>
      </Block>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({

  cardDate: {
    textAlign: 'right', 
    marginRight: 15,
    fontWeight:'bold',
    paddingBottom: 10

  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  cardTitle: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 10
  },
  container: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    width: '95%',
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
});

export default withNavigation(News);
