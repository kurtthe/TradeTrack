import React from "react";
import { Switch, Platform } from "react-native";

import nowTheme from "@constants/Theme";

class MkSwitch extends React.Component {
  render() {
    const { value, ...props } = this.props;

    return (
      <Switch
        value={value}
        onValueChange={this.props.toggleSwitch}
        // thumbColor={
        //   value
        //     ? nowTheme.COLORS.INFO
        //     :'#ffffff'
        // }
        ios_backgroundColor={"#D8D8D8"}
        trackColor={{
          true: nowTheme.COLORS.INFO,
          false: Platform.OS == "ios" ? "#d3d3d3" : "#333"
        }}
        {...props}
      />
    );
  }
}

export default MkSwitch;
