import * as React from "react";

import { Text, TextProps } from "./Themed";

import colors from "../assets/colors";

export function MonoText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}

export function TitleText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontSize: 30, fontWeight: "bold", color: colors.primary },
      ]}
    />
  );
}

export function PonnalaText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "Ponnala-Regular" }]} />
  );
}

export function BlackText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontSize: 20, fontWeight: "bold", color: "black" },
      ]}
    />
  );
}
