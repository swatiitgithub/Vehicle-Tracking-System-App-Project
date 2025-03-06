import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {BottomSection, Container, Line} from './styledComponents';
interface Props {
  children: React.ReactChild;
  visible?: boolean;
  onDrop: () => void;
  containerStyle?: {};
  onModalHide?: () => void;
  modalHeight?: number;
  statusBarTranslucent?: boolean;
}

const BottomModal = ({
  children,
  visible,
  onDrop,
  onModalHide,
  containerStyle,
  modalHeight,
  statusBarTranslucent = true,
}: Props) => (
  <ReactNativeModal
    // verticalScale(Platform.OS === 'ios' ? 80 : Platform.OS === 'android'? 100:270)
    style={{margin: 0}}
    onBackdropPress={onDrop}
    onModalHide={onModalHide}
    isVisible={visible}
    statusBarTranslucent={statusBarTranslucent}
    onBackButtonPress={onDrop}>
    <BottomSection style={modalHeight ? {height: modalHeight} : {}}>
      <Line />
      <Container
        style={[containerStyle, modalHeight ? {height: modalHeight} : {}]}>
        {children}
      </Container>
    </BottomSection>
  </ReactNativeModal>
);

BottomModal.defaultProps = {
  visible: false,
};

export default BottomModal;
