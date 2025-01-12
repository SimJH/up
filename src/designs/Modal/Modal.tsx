import React, { type PropsWithChildren } from 'react';
import { Modal as RNModal, TouchableOpacity } from 'react-native';
import { styled, View } from 'dripsy';
import { CONTAINER_MAX_WIDTH, TOUCHABLE_OPACITY_HIT_SLOP } from 'src/constants';
import { Icons } from 'src/assets';
import { t } from 'src/translations';
import { HapticFeedback } from '../../components/HapticFeedback';
import { H2 } from '../H2';

export interface ModalProps {
  title?: string;
  visible?: boolean;
  onClose: () => void;
}

const ACCESSIBILITY = {
  close: t('label.close'),
};

const ModalBackground = styled(View)({
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '$04',
  backgroundColor: 'rgba(0,0,0,0.2)',
});

const ModalContainer = styled(View)({
  width: '100%',
  maxWidth: CONTAINER_MAX_WIDTH,
  height: 'auto',
  padding: '$04',
  borderRadius: '$md',
  borderWidth: 2,
  borderColor: '$border',
  backgroundColor: '$white',
  gap: '$04',
});

const ModalHeader = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

const CloseButton = styled(TouchableOpacity)({
  justifyContent: 'center',
});

export function Modal({
  children,
  title,
  visible = false,
  onClose,
}: PropsWithChildren<ModalProps>): React.ReactElement {
  return (
    <RNModal
      animationType="fade"
      supportedOrientations={[
        'portrait',
        'portrait-upside-down',
        'landscape',
        'landscape-left',
        'landscape-right',
      ]}
      transparent
      visible={visible}
    >
      <ModalBackground>
        <ModalContainer>
          <ModalHeader>
            <H2 variant="primary">{title}</H2>
            <HapticFeedback>
              <CloseButton
                accessibilityHint={ACCESSIBILITY.close}
                accessibilityLabel={ACCESSIBILITY.close}
                hitSlop={TOUCHABLE_OPACITY_HIT_SLOP}
                onPress={onClose}
              >
                <Icons.Close />
              </CloseButton>
            </HapticFeedback>
          </ModalHeader>
          {children}
        </ModalContainer>
      </ModalBackground>
    </RNModal>
  );
}
