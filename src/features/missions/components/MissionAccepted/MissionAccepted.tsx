import React from 'react';
import { CommonLayout, Button, H2, Text } from 'src/designs';
import { PageTitle, PageContent } from 'src/components';
import { t } from 'src/translations';
import type { colors } from 'src/themes/colors';

export interface MissionAcceptedProps {
  missionName: string;
  missionMemo: string;
  userColor: keyof typeof colors;
  onPressShare: () => void;
  onPressClose: () => void;
}

const ACCESSIBILITY = {
  share: t('label.share'),
  ok: t('label.ok'),
};

export function MissionAccepted({
  missionName,
  missionMemo,
  userColor,
  onPressShare,
  onPressClose,
}: MissionAcceptedProps): React.ReactElement {
  return (
    <>
      <CommonLayout.Body>
        <PageTitle title={t('title.new_mission_accepted')} />
        <PageContent>
          <H2 variant="primary">{missionName}</H2>
          <Text variant="secondary">{missionMemo}</Text>
        </PageContent>
      </CommonLayout.Body>
      <CommonLayout.Footer>
        <Button
          accessibilityHint={ACCESSIBILITY.share}
          accessibilityLabel={ACCESSIBILITY.share}
          color="$white"
          disableLongPress
          onPress={onPressShare}
        >
          {t('label.share')}
        </Button>
        <Button
          accessibilityHint={ACCESSIBILITY.ok}
          accessibilityLabel={ACCESSIBILITY.ok}
          color={userColor}
          disableLongPress
          onPress={onPressClose}
        >
          {t('label.ok')}
        </Button>
      </CommonLayout.Footer>
    </>
  );
}
