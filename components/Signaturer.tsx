import * as React from 'react';

import {
  Text,
  View,
  ViewProps,
  useThemeColor,
} from './Themed';

import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";

import { Modal, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


interface ISignaturerProps {
  text: string;
  onOK: (signature: any) => void;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const Signaturer: React.FC<ISignaturerProps> = (props) => {
  const signatureRef = React.useRef<SignatureViewRef>(null);

  const bgColor = useThemeColor({}, 'background');
  const colorGreenNormal = useThemeColor({}, 'greenNormal');

  const imgWidth = 300;
  const imgHeight = 200;

  const handleSignature = (signature: any) => {
    props.onOK(signature);
    props.setModalVisible(false);
  };

  const handleSignatureEmpty = () => {
    console.log("Empty Signature");
  };

  const handleSignatureClear = () => {
    signatureRef.current?.clearSignature();
  };

  const handleSignatureEnd = () => {
    signatureRef.current?.readSignature();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={[styles.buttonClose]}
            onPress={() => props.setModalVisible(false)}
          >
            <Ionicons name="md-close" size={32} color="black" />
          </Pressable>

          <View style={[{width: "100%", height: 500}]}>
            <SignatureScreen
              ref={signatureRef}
              // onEnd={handleSignatureEnd}
              onOK={handleSignature}
              onEmpty={handleSignatureEmpty}
              onClear={handleSignatureClear}
              autoClear={false}
              descriptionText={"please add your signature"}
              backgroundColor={colorGreenNormal}
              penColor={"#fff"}
              bgHeight={imgHeight}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Signaturer;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 32,
    width: "100%",
    height: "100%",
  },
  modalView: {
    margin: 8,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    padding: 8,
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
});
