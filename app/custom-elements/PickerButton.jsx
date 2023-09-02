import React, { Component, createRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import nowTheme from '@constants/Theme';
import RadioGroup from 'react-native-radio-buttons-group';
import Search from '@custom-elements/Search';
import { Block, Text, theme } from 'galio-framework';
import { BottomSheet } from 'react-native-sheet';

const { width, height } = Dimensions.get('screen');

class PickerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: this.props.error,
      renderOptions: props.renderOptions || [],
      optionSelected: null,
      picked: false,
      search: props.search || false,
    };

    this.actionSheetRadioButtonRef = createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      this.setState({
        error: this.props.error,
      });
      return;
    }

    if (JSON.stringify(this.props.renderOptions) !== JSON.stringify(prevProps.renderOptions)) {
      this.resetValueSelect(this.props.renderOptions);
    }
  }

  resetValueSelect = (listData = []) => {
    const newData = listData.map((item) => {
      if (item.selected) {
        this.setState({
          optionSelected: item,
          picked: true,
        });
        return {
          ...item,
          selected: item.selected,
        };
      }
      return {
        ...item,
        selected: false,
      };
    });

    this.setState({
      renderOptions: newData,
    });
  };

  onPressRadioButton = (options) => {
    const selected = options.find((option) => option.selected);

    this.setState({
      optionSelected: selected,
      picked: true,
    });
    this.props.onChangeOption && this.props.onChangeOption(selected);
    this.actionSheetRadioButtonRef.current?.hide();
  };

  onDeleteSelected = () => {
    let newOptions = this.state.renderOptions
    for (let i = 0; i < newOptions.length; i++) {
      newOptions[i].selected = false;
    }
    this.setState({
      optionSelected: null,
      picked: false,
      renderOptions: newOptions
    });
    this.props.changeSearchText && this.props.changeSearchText('')
    this.props.onChangeOption && this.props.onChangeOption(null);
    this.actionSheetRadioButtonRef.current?.hide();
  };

  changeSearchText = (text) => {
    this.props.changeSearchText && this.props.changeSearchText(text);
  };

  handleSearch = (page) => {
    this.props.handleSearch && this.props.handleSearch(page);
  };

  openAction = () => {
    if (!!this.props.onPress) {
      this.props.onPress();
      return;
    }
    this.actionSheetRadioButtonRef.current?.show();
  };

  rendetOptionsSelected = () => {
    return (
      <Block left style={{ height: this.state.search ? height / 2 : 'auto', padding: 5, paddingBottom: 40}}>
        {this.state.search ? (
          <Search
            placeholder="Search..."
            value={this.props.textSearch}
            onChangeText={(text) => this.changeSearchText(text)}
            onSearch={() => this.handleSearch(1)}
            style={styles.search}
            inputStyle={styles.searchInput}
          />
        ) : null}
        <ScrollView
          style={[styles.scrollOptions, this.state.search && {height: '95%'}]}
          contentContainerStyle={styles.sortContent}
        >
          {this.state.renderOptions?.length === 0 ? (
            <Text>No exists options</Text>
          ) : (
            <RadioGroup
              radioButtons={this.state.renderOptions}
              color={nowTheme.COLORS.INFO}
              onPress={(items) => this.onPressRadioButton(items)}
              containerStyle={styles.radioStyle}
            />
          )}
        </ScrollView>
      </Block>
    );
  };

  render() {
    const { style, placeholder, text, icon, iconName, size, label, pickDate, deleteOption = false } = this.props;
    const { picked, optionSelected } = this.state;
    const buttonStyles = [styles.button, { ...style }];

    return (
      <>
        <View style={styles.wholeContainer}>
          {label &&
            <Block row>
              <Text style={[styles.text, { fontWeight: 'bold' }]}>{label}</Text>
              {this.props.errorLabel && <Text style={styles.errorText}> * </Text>}
            </Block>
          }
          {text &&
            <Block row>
              <Text size={14} style={[styles.text, styles.grayText]}>
                {text}
              </Text>
              {this.state.error && <Text style={styles.errorText}> * </Text>}
            </Block>
          }
          <Block row space={'between'} style={styles.container}>
            <TouchableWithoutFeedback style={buttonStyles} onPress={() => this.openAction()}>
              <Text style={[styles.placeholder, (picked || pickDate) && styles.pickedPlaceholder]}>
                {(!picked || !pickDate) ? placeholder : optionSelected?.label}
              </Text>
            </TouchableWithoutFeedback>
            {icon && (
              <MaterialIcons
                name={iconName ? iconName : optionSelected !== null && deleteOption ? 'clear' : 'expand-more'}
                color={nowTheme.COLORS.ICONPICKER}
                size={size ? size : optionSelected !== null && deleteOption ? 20 : 30}
                onPress={optionSelected !== null && deleteOption ? () => this.onDeleteSelected() : () => this.openAction()}
              />
            )}
          </Block>
        </View>

        <BottomSheet height={500} ref={this.actionSheetRadioButtonRef} headerAlwaysVisible>
            {this.rendetOptionsSelected()}
        </BottomSheet>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollOptions: {
    width: width - 16,
  },
  sortContent: {
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  wholeContainer: {
    color: 'red',
  },
  text: {
    fontSize: 14,
    paddingVertical: 10,
  },
  grayText: {
    color: nowTheme.COLORS.PRETEXT,
  },
  errorText: {
    fontSize: 14,
    paddingVertical: 10,
    color: nowTheme.COLORS.ERROR,
    fontWeight: 'bold',
  },
  placeholder: {
    width: '90%',
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
