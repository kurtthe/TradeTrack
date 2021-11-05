import React, { createRef } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import nowTheme from '@constants/Theme';
import RadioGroup from 'react-native-radio-buttons-group';
import Search from '@custom-elements/Search';
import { Block, Text, theme } from 'galio-framework';

const { width, height } = Dimensions.get('screen');
const actionSheetRadioButtonRef = createRef();

class PickerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: this.props.error,
      renderOptions: props.options,
      optionSelected: null,
      picked: false,
      textSearch: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      this.setState({
        error: this.props.error,
      });
    }
  }

  onPressRadioButton = (options) => {
    const selected = options.find((option) => option.selected);

    this.setState({
      optionSelected: selected,
      picked: true,
    });
    this.props.onChangeOption && this.props.onChangeOption(selected);
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
    actionSheetRadioButtonRef.current?.setModalVisible();
  };

  render() {
    const { style, placeholder, text, icon, iconName, size } = this.props;
    const { picked } = this.state;
    const buttonStyles = [styles.button, { ...style }];

    return (
      <>
        <View style={styles.wholeContainer}>
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

        <ActionSheet ref={actionSheetRadioButtonRef} headerAlwaysVisible>
          <Block left style={{ height: 'auto', padding: 5, paddingBottom: 40 }}>
            <View style={{ height: height / 2 }}>
              {this.props.search ? (
                <Search
                  placeholder="Search..."
                  value={this.state.textSearch}
                  onChangeText={(text) => this.changeSearchText(text)}
                  onSearch={() => this.handleSearch(1)}
                  style={styles.search}
                  inputStyle={styles.searchInput}
                />
              ) : null}
              <ScrollView
                style={{ width: width, marginHorizontal: 16 }}
                contentContainerStyle={{ alignItems: 'flex-start' }}
              >
                <RadioGroup
                  radioButtons={this.state.renderOptions}
                  color={nowTheme.COLORS.INFO}
                  onPress={(items) => this.onPressRadioButton(items)}
                  containerStyle={styles.radioStyle}
                />
              </ScrollView>
            </View>
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
