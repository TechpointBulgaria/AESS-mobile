import React from "react";
import { View, Text } from "react-native";
import { Fonts, Colors, Metrics } from "../../Themes";
import Widget from "./Widget";

export default ({ sensor }) => (
  <Widget>
    <View
      style={{
        width: Metrics.screenWidth / 2,
        height: Metrics.screenWidth / 2,
        borderRadius: Metrics.screenWidth / 4,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: Colors.app.white,
        backgroundColor: Colors.app.transparent
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 60,
          color: Colors.app.white
        }}
      >
        {sensor.state} °C
      </Text>
    </View>
  </Widget>
);
