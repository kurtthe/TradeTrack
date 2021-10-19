import React from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { Icon, Input } from '@components';

import { GetDataPetitionService } from '@core/services/get-data-petition.service';
import { endPoints } from '@shared/dictionaries/end-points';
import ListInvoices from '@custom-sections/ListInvoices';
import { nowTheme } from '@constants/';

const { width } = Dimensions.get('screen');

class SearchInvoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      invoicesFilter: [],
      search: null,
      active: false,
      notFound: false,
    };
    this.getDataPetition = GetDataPetitionService.getInstance();
  }

  animatedValue = new Animated.Value(0);

  animate() {
    this.animatedValue.setValue(0);

    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  handlePetitionInvoices = async (textFilter = '') => {
    await this.getDataPetition.getInfo(endPoints.invoices, this.handleDataInvoices, 1, 10, {
      search: textFilter,
    });
  };

  handleDataInvoices = (data) => {
    if (data.length > 0) {
      this.setState({
        invoicesFilter: data,
        notFound: false,
      });
      return;
    }
    this.setState({
      notFound: true,
    });
  };

  handleSearchChange = (text) => {
    this.setState({ search: text });

    setTimeout(() => {}, 1000);
    this.handlePetitionInvoices(text);
    this.animate();
  };

  renderSearch = () => {
    const { search } = this.state;
    const iconSearch = search ? (
      <TouchableWithoutFeedback onPress={() => this.setState({ search: '' })}>
        <Icon size={16} color={theme.COLORS.MUTED} name="magnifying-glass" family="entypo" />
      </TouchableWithoutFeedback>
    ) : (
      <Icon size={16} color={theme.COLORS.MUTED} name="magnifying-glass" family="entypo" />
    );

    return (
      <Input
        right
        color="black"
        autoFocus={true}
        autoCorrect={false}
        autoCapitalize="none"
        iconContent={iconSearch}
        defaultValue={search}
        style={styles.search}
        placeholder="What are you looking for?"
        onFocus={() => this.setState({ active: true })}
        onBlur={() => this.setState({ active: false })}
        onChangeText={(text) => this.handleSearchChange(text)}
      />
    );
  };

  renderNotFound = () => {
    return (
      <Block style={styles.notfound}>
        <Text style={{ fontFamily: 'montserrat-regular' }} size={18} color={nowTheme.COLORS.TEXT}>
          No results found for search options selected.
        </Text>
      </Block>
    );
  };

  render() {
    return (
      <Block flex style={styles.searchContainer}>
        <Block center style={styles.header}>
          {this.renderSearch()}
        </Block>

        <ScrollView>
          {this.state.search === null ? (
            <></>
          ) : (
            <Block flex>
              {this.state.notFound ? (
                this.renderNotFound()
              ) : (
                <ListInvoices data={this.state.invoicesFilter} />
              )}
            </Block>
          )}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    width: width,
    paddingHorizontal: theme.SIZES.BASE,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE,
    borderWidth: 1,
    borderRadius: 30,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 2,
    zIndex: 2,
  },
  notfound: {
    marginVertical: theme.SIZES.BASE * 2,
  },
});

export default SearchInvoice;
