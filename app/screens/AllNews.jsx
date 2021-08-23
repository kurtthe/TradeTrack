import React from 'react';
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '@constants/';
import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';

import ListNews from '@custom-sections/ListNewsVertical';
import { Button } from "@components";

import { connect } from 'react-redux';


const { width } = Dimensions.get('screen');

class Allinvoice extends React.Component {
  constructor(props) {
    super(props);


    this.state = {};
    this.getDataPetition = GetDataPetitionService.getInstance();
    
  }


  async componentDidMount() {
    await this.getDataPetition.getInfo(
      endPoints.burdensBalance,
      this.props.token_login,
      this.props.getBalance,
    );
    await this.getDataPetition.getInfo(
      endPoints.invoices,
      this.props.token_login,
      this.props.getInvoices,
    );
    await this.getDataPetition.getInfo(endPoints.news, this.props.token_login, this.props.getNews);
  }






  render() {

   
      return (
       
           <ScrollView >

          <Block flex>
            <ListNews news={this.props.news} />
            <Block center style={{ paddingVertical: 5 }}>
              <Button
                color="info"
                textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
                style={styles.button}
              >
                Load More...
              </Button>
            </Block>
            <Block center style={{ paddingVertical: 10}}>
            
            {/* <Block center style={{ paddingVertical: (Platform.OS === 'ios')  ?   ( (Dimensions.get('window').height < 670) ? 40 :30)  : ((Dimensions.get('window').height < 595) ? 40 : ((Dimensions.get('window').height > 600) && (Dimensions.get('window').height < 900) ? 30:-30)) }}> */}

            </Block>
          </Block>
        </ScrollView>
       

       
      );
    

    // return(
    //   <SkeletonInvoiceDetail/>
    // )
  }
}

const styles = StyleSheet.create({
  newStatementsTitle: {
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    padding: 15,
    marginLeft: -15,
    width: width,
    height:'9%'
  },
  card: {
   
    marginTop: 0,
    
  },

  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
    top: 5,
  },
});

const mapStateToProps = (state) => ({
  token_login: state.loginReducer.api_key,
  news: state.newsReducer.news,
});


export default connect(mapStateToProps)(Allinvoice);
