// import React, { useState } from "react";
// import { View, Switch, StyleSheet } from "react-native";

// const App = () => {
//   const [isEnabled, setIsEnabled] = useState(false);
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//   return (
//     <View style={styles.container}>
//       <Switch
//         trackColor={{ false: "#767577", true: "#81b0ff" }}
//         thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
//         ios_backgroundColor="#3e3e3e"
//         onValueChange={toggleSwitch}
//         value={isEnabled}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

// export default App;


import React from "react";
import { Switch, Platform } from "react-native";

import nowTheme from "@constants/Theme";

class MkSwitch extends React.Component {
  render() {
    const { value, ...props } = this.props;
    const thumbColor =
      Platform.OS === "ios"
        ? nowTheme.COLORS.PRIMARY
        : Platform.OS === "android" && value
        ? nowTheme.COLORS.SWITCH_ON
        : nowTheme.COLORS.SWITCH_OFF;

    return (
      <Switch
        value={value}
        onValueChange={this.props.toggleSwitch}
        thumbColor={[
          value === true
            ? nowTheme.COLORS.SWITCH_ON
            :'#ffffff'
        ]}
        ios_backgroundColor={"#D8D8D8"}
        trackColor={{
          true: "#d3d3d3",
          false: Platform.OS == "ios" ? "#d3d3d3" : "#333"
        }}
        {...props}
      />
    );
  }
}

export default MkSwitch;
