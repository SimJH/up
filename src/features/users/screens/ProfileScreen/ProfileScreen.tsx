import React, { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import Share from 'react-native-share';
import { View } from 'dripsy';
import { useActor } from '@xstate/react';
import { CommonLayout, Button } from 'src/designs';
import { AnimateSuspense, FadeInView } from 'src/components';
import { useMainTabBarInset } from 'src/hooks';
import { globalMachineService } from 'src/stores/machines';
import { AppManager } from 'src/modules/app';
import { AppEventChannel } from 'src/modules/event';
import { Logger } from 'src/modules/logger';
import { navigate } from 'src/navigators/helpers';
import { t } from 'src/translations';
import { useUser } from '../../hooks';
import { BadgeSection } from '../../components/BadgeSection';
import { ThemeSection } from '../../components/ThemeSection';
import { UserSection } from '../../components/UserSection';
import { ShareModal } from '../../components/ShareModal';

import type { User } from 'src/features/users';
import type { MainTabProps } from 'src/navigators/MainTab/types';

type ProfileScreenProps = MainTabProps<'Profile'>;

const TAG = 'ProfileScreen';

export function ProfileScreen(_props: ProfileScreenProps): JSX.Element | null {
  const user = useUser();
  const { bottomInset } = useMainTabBarInset();
  const [_, send] = useActor(globalMachineService);
  const [shareModalVisibility, setShareModalVisibility] = useState(false);

  const handleEditUser = useCallback(
    (modifyData: Partial<Pick<User, 'name' | 'badge' | 'theme'>>) => {
      send({ type: 'EDIT_USER', user: modifyData });
    },
    [send],
  );

  const handlePressEdit = (): void => {
    navigate('User', 'UserEdit');
  };

  const handlePressShare = (): void => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      setShareModalVisibility(true);
    } else {
      AppManager.showToast(t('message.error.unsupported_platform'));
    }
  };

  const handlePressClose = useCallback((): void => {
    setShareModalVisibility(false);
  }, []);

  const handleReadyToShare = useCallback((imageData: string): void => {
    Share.open({ url: imageData })
      .catch((error: Error) => {
        Logger.warn(TAG, `handleReadyToShare - ${error.message}`);
      })
      .finally(() => {
        setShareModalVisibility(false);

        // 공유하기 모달이 닫힌 후 이벤트 발행
        setTimeout(() => {
          AppEventChannel.getInstance().dispatch('shareProfile', undefined);
        }, 250);
      });
  }, []);

  const handlePressBadge = useCallback(
    (id: number): void => {
      handleEditUser({ badge: id });
    },
    [handleEditUser],
  );

  const handleLongPressBadge = useCallback((_id: number): void => {
    // @todo
  }, []);

  const handlePressTheme = useCallback(
    (id: number): void => {
      handleEditUser({ theme: id });
      AppEventChannel.getInstance().dispatch('changeTheme', {
        themeId: id,
      });
    },
    [handleEditUser],
  );

  return (
    <FadeInView>
      <CommonLayout insetBottom={false}>
        <CommonLayout.Header title={t('title.profile')} />
        <CommonLayout.Body>
          <AnimateSuspense>
            <UserSection onPressEdit={handlePressEdit} user={user} />
          </AnimateSuspense>
          <Button color="$white" disableLongPress onPress={handlePressShare}>
            {t('label.share')}
          </Button>
          <BadgeSection
            onLongPressBadge={handleLongPressBadge}
            onPressBadge={handlePressBadge}
            unlockedBadges={user.unlockedBadges}
          />
          <ThemeSection onPressBadge={handlePressTheme} />
          <View sx={{ height: bottomInset }} />
        </CommonLayout.Body>
      </CommonLayout>
      <ShareModal
        onClose={handlePressClose}
        onReady={handleReadyToShare}
        user={user}
        visible={shareModalVisibility}
      />
    </FadeInView>
  );
}
