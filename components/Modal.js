import React from "react";
import { StyleSheet, View, Button } from "react-native";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import RNModal from "react-native-modal";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { SecondaryText } from "./FableText";
import Text from "./MyText";

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
    success: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftWidth : 0, paddingTop : 15, paddingBottom : 18, height : 70, backgroundColor : '#0e5e0e'}}
        text1Style={{
          fontFamily : 'Nunito_400Regular',
          fontSize: 15,
          color : 'white'
        }}
        text2Style={{
          fontFamily : 'Nunito_400Regular',
          fontSize: 13,
          color : 'white'
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftWidth : 0, paddingTop : 15, paddingBottom : 18, height : 70, backgroundColor : '#ff9800'}}
        text1Style={{
          fontFamily : 'Nunito_400Regular',
          fontSize: 15,
          color : 'white'
        }}
        text2Style={{
          fontFamily : 'Nunito_400Regular',
          fontSize: 13,
          color : 'white'
        }}
      />
    ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  )
};

export const Modal = ({ isVisible = false, children, ...props}) => {
  return (
    <RNModal
      isVisible={isVisible}
      onBackdropPress={() => props.closeModal()}
/*       animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
 */      style={{zIndex : 9000}}
      {...props}>
      <Toast config={toastConfig}/>
      {children}
    </RNModal>
  );
};

const ModalContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const ModalHeader = ({closeModal, ...props}) => (
  <View style={styles.header}>
    {props.children}
    <SecondaryText className="absolute top-[12px] right-[12px] z-[20]" onPress={() => {closeModal()}}>
        <MaterialIcon name="close" size={20} color="#000"/>
    </SecondaryText>
  </View>
);

const ModalBody = ({ children }) => (
  <View style={{padding : 20, paddingTop : 5}}>{children}</View>
);

const ModalFooter = ({ children }) => (
  <View className="p-[12]">{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffffe0",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height : 30
  },
  text: {
    paddingTop: 10,
    textAlign: "center",
    fontSize: 24,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    height : 30
  },
});

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;