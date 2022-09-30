import React from 'react';
import { StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';
import { nowTheme } from '@constants/';
import FilterButton from '@components/FilterButton';
import ListInvoices from '@custom-sections/ListInvoices';
import { Button } from '@components';

const { width } = Dimensions.get('screen');

export const AllInvoice = ({ }) => {
  const invoices = useSelector((state) => state.invoicesReducer.invoices)
  
  const renderFilters = () => (
    <Block
      row
      center
      space={'evenly'}
      width={'85%'}
      style={{ justifyContent: 'space-evenly', marginLeft: '-3%', padding: 8 }}
    >
      <FilterButton
        text={'By Date'}
        icon={require('@assets/imgs/img/calendar.png')}
      />
      <FilterButton text={'Last Month'} />
      <FilterButton text={'Filter For Type'} />
    </Block>
  )

  return (
    <View style={styles.cart}>
      <Block
        center
        style={styles.newStatementsTitle}
        paddingTop={30}
        paddingBottom={50}
        marginBottom={5}
      >
        {renderFilters()}
      </Block>
      <ScrollView>
        <Block flex>
          <ListInvoices data={invoices} restricted={restricted} />
          <Block center style={{ paddingVertical: 5 }}>
            <Button
              color="info"
              textStyle={{ fontFamily: 'montserrat-bold', fontSize: 16 }}
              style={styles.button}
            >
              Load More..
            </Button>
          </Block>
          <Block center style={{ paddingVertical: 45 }}></Block>
        </Block>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  newStatementsTitle: {
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    padding: 15,
    marginLeft: -15,
    width: width,
    height: '9%',
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

