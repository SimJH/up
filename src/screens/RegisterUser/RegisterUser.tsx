import React, { useState } from 'react';
import { View } from 'react-native';
import { styled } from 'dripsy';
import { CommonLayout, Button, Input, H1 } from 'src/designs';
import { t } from 'src/translations';

interface RegisterUserProps {
  onPressBack: () => void;
  onPressStart: (username: string) => void;
}

const PageTitleArea = styled(View)({
  paddingY: '$04',
});

export function RegisterUser ({
  onPressBack,
  onPressStart
}: RegisterUserProps): JSX.Element {
  const [userName, setUserName] = useState('');

  const handleChangeUserName = (name: string): void => {
    setUserName(name);
  };

  const handlePressStartButton = (): void => {
    onPressStart(userName);
  };

  return (
    <CommonLayout keyboardAvoiding>
      <CommonLayout.Header onBackPress={onPressBack} />
      <CommonLayout.Body scrollEnabled={false}>
        <PageTitleArea>
          <H1 variant="primary">{t('message.enter_name')}</H1>
        </PageTitleArea>
        <Input
          onChangeText={handleChangeUserName}
          placeholder={t('placeholder.enter_name')}
        />
      </CommonLayout.Body>
      <CommonLayout.Footer>
        <Button
          color="$brand"
          disableLongPress
          disabled={userName.length < 2}
          onPress={handlePressStartButton}
        >
          {t('label.go_level_up')}
        </Button>
      </CommonLayout.Footer>
    </CommonLayout>
  );
}
