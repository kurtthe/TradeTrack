import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


class MenuItem extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={this.props.style && this.props.style.container}>
        <View style={[styles.drawerItem, this.props.style && this.props.style.buttonContainer]}>

          <View style={[this.props.drawer && { width: '85%' }, !this.props.drawer && { paddingLeft: 10 }, styles.textView]}>
            {this.props.mainText != null
                && <Text style={[styles.mainText, this.props.style && this.props.style.mainText]}>{this.props.mainText}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    drawerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    iconContainer: {
      width: 35,
      alignItems: 'center',
      justifyContent: 'center',
    },
    drawerItemIcon: {
    },
    mainText: {
      fontWeight: 'bold'
    },
    textView: {
      flexDirection: 'column',
      justifyContent: 'center',
    }
  });

export default MenuItem;
