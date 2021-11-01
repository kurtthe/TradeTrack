import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Block } from 'galio-framework';
import nowTheme from '@constants/Theme';

class PickerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: this.props.error,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      this.setState({
        error: this.props.error,
      });
    }
  }

  render() {
    const { style, placeholder, text, icon, iconName, size, picked } = this.props;

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
          <TouchableWithoutFeedback style={buttonStyles} {...props}>
            <Block row space={'between'} style={styles.container}>
              <Text style={[styles.placeholder, picked && styles.pickedPlaceholder]}>
                {placeholder}
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
                <Searchbar
                  placeholder="Search..."
                  onChangeText={this.onChangeSearch}
                  style={styles.search}
                  inputStyle={styles.searchInput}
                />
              ) : null}
              <ScrollView
                style={{ width: width, marginHorizontal: 16 }}
                contentContainerStyle={{ alignItems: 'flex-start' }}
              >
                <RadioGroup
                  radioButtons={this.state.radioButtonsData}
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
});

export default PickerButton;
