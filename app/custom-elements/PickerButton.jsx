import React, { Component, createRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import nowTheme from '@constants/Theme';
import RadioGroup from 'react-native-radio-buttons-group';
import Search from '@custom-elements/Search';
import { Block, Text, theme } from 'galio-framework';
import ActionSheet from 'react-native-actions-sheet';

const { width, height } = Dimensions.get('screen');

class PickerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: this.props.error,
      renderOptions: props.renderOptions || [],
      optionSelected: null,
      picked: false,
      textSearch: '',
      search: props.search || false,
    };

    this.actionSheetRadioButtonRef = createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      this.setState({
        error: this.props.error,
      });
    }

    if (this.props.resetValue === true) {
      this.resetValue(this.state.renderOptions, this.state.optionSelected?.id);
    }
  }

  resetValue = (listData = [], idSelected) => {
    const newValue = listData.map((item) => {
      if (item.id === idSelected) {
        return {
          ...item,
          selected: false,
        };
      }

      return item;
    });

    this.setState({
      renderOptions: newValue,
      optionSelected: null
    })
  };

  onPressRadioButton = (options) => {
    const selected = options.find((option) => option.selected);

    this.setState({
      optionSelected: selected,
      picked: true,
    });
    this.props.onChangeOption && this.props.onChangeOption(selected);
    this.actionSheetRadioButtonRef.current?.setModalVisible(false);
  };

  changeSearchText = (text) => {
    this.setState({ textSearch: text });

    this.props.changeTextSearch && this.props.changeTextSearch(text);
  };

  handleSearch = () => {
    this.props.onSearch && this.props.onSearch();
  };

  openAction = () => {
    if (!!this.props.onPress) {
      this.props.onPress();
      return;
    }
    this.actionSheetRadioButtonRef.current?.setModalVisible();
  };

  rendetOptionsSelected = () => {
    if (
      !this.state.renderOptions ||
      this.state.renderOptions === null ||
      this.state.renderOptions?.length === 0
    ) {
      return <Text>No exists options</Text>;
    }

    return (
      <View style={{ maxHeight: height / 2 }}>
        {this.state.search ? (
          <Search
            placeholder="Search..."
            value={this.state.textSearch}
            onChangeText={(text) => this.changeSearchText(text)}
            onSearch={() => this.handleSearch(1)}
            style={styles.search}
            inputStyle={styles.searchInput}
          />
        ) : null}
        <ScrollView style={{ width: width }} contentContainerStyle={{ alignItems: 'flex-start' }}>
          <RadioGroup
            radioButtons={this.state.renderOptions}
            color={nowTheme.COLORS.INFO}
            onPress={(items) => this.onPressRadioButton(items)}
            containerStyle={styles.radioStyle}
          />
        </ScrollView>
      </View>
    );
  };

  render() {
    const { style, placeholder, text, icon, iconName, size, label } = this.props;
    const { picked, optionSelected } = this.state;
    const buttonStyles = [styles.button, { ...style }];

    return (
      <>
        <View style={styles.wholeContainer}>
          <Text style={{ fontWeight: 'bold' }}>{label}</Text>
          <Block row>
            <Text size={14} style={styles.text}>
              {text}
            </Text>
            {this.state.error && <Text style={styles.errorText}> * </Text>}
          </Block>
          <TouchableWithoutFeedback style={buttonStyles} onPress={() => this.openAction()}>
            <Block row space={'between'} style={styles.container}>
              <Text style={[styles.placeholder, picked && styles.pickedPlaceholder]}>
                {!picked ? placeholder : optionSelected?.label}
              </Text>
              {icon && (
                <MaterialIcons
                  name={iconName || 'expand-more'}
                  color={nowTheme.COLORS.ICONPICKER}
                  size={size || 40}
                />
              )}
            </Block>
          </TouchableWithoutFeedback>
        </View>

        <ActionSheet ref={this.actionSheetRadioButtonRef} headerAlwaysVisible>
          <Block left style={{ height: 'auto', padding: 5, paddingBottom: 40 }}>
            {this.rendetOptionsSelected()}
          </Block>
        </ActionSheet>
      </>
    );
  }
}

const styles = StyleSheet.create({
  wholeContainer: {
    color: 'red',
  },
  text: {
    fontSize: 14,
    paddingVertical: 10,
    color: nowTheme.COLORS.PRETEXT,
  },
  errorText: {
    fontSize: 14,
    paddingVertical: 10,
    color: nowTheme.COLORS.ERROR,
    fontWeight: 'bold',
  },
  placeholder: {
    color: nowTheme.COLORS.PICKERTEXT,
  },
  pickedPlaceholder: {
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    width: 'auto',
  },
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: nowTheme.COLORS.PICKERTEXT,
    padding: 5,
    borderRadius: 5,
    paddingLeft: 10,
    height: 45,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  searchInput: {
    color: 'black',
    fontSize: 16,
  },
  search: {
    height: 40,
    width: width - 32,
    marginBottom: theme.SIZES.BASE * 4,
    borderRadius: 30,
  },
  radioStyle: {
    alignItems: 'flex-start',
  },
});

export default PickerButton;
