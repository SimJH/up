import React, { memo } from 'react';
import { styled, useSx, View, Image } from 'dripsy';
import * as AppHelpers from 'src/modules/app/helpers';
import { Button } from 'src/designs';
import { Section } from 'src/components';
import { t } from 'src/translations';
import type { User } from '../../types';
import type { Badge } from 'src/modules/app/types';

export interface BadgeSectionProps {
  unlockedBadges: User['unlockedBadges'];
  onPressBadge: (badgeId: number) => void;
}

const ACCESSIBILITY = {
  badge: t('label.badge'),
};

const BADGES_PER_COUNT = 5;

const Rows = styled(View)({
  gap: '$04',
});

const Row = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '$02',
});

const BadgeImage = styled(Image)({
  width: '100%',
  height: '100%',
});

const buttonContainerStyle = {
  width: 50,
  height: 45,
};

const TOTAL_BADGES = AppHelpers.getBadges();

export const BadgeSection = memo(function BadgeSection({
  unlockedBadges,
  onPressBadge,
}: BadgeSectionProps): React.ReactElement {
  const sx = useSx();
  const overridingButtonStyle = sx({
    paddingX: '$01',
    paddingY: '$01',
  });

  const getBadges = (): Badge[][] => {
    let row: Badge[] = [];
    const badges: Badge[][] = [];

    for (let i = 0; i < TOTAL_BADGES.length; i++) {
      const currentBadge = AppHelpers.getBadge(i);
      if (i % BADGES_PER_COUNT === 0) {
        row = [currentBadge];
        badges.push(row);
      } else {
        row.push(currentBadge);
      }
    }

    return badges;
  };

  const fillEmpty = (count: number): React.ReactElement[] | null => {
    if (count <= 0) return null;
    return new Array(count).fill(null).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <View key={`empty${index}`} sx={buttonContainerStyle} />
    ));
  };

  const isUnlocked = (id: number): boolean => {
    return Boolean(id === 0 || unlockedBadges[id]);
  };

  const subTitle = `(${Object.keys(unlockedBadges).length}/${
    TOTAL_BADGES.length - 1 // 빈 뱃지를 갯수에서 제외하기 위함
  })`;

  return (
    <Section subTitle={subTitle} title={t('label.badge')}>
      <Rows>
        {getBadges().map((badgeRow, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Row key={index}>
            {badgeRow.map((badge) => (
              <Button
                accessibilityHint={ACCESSIBILITY.badge}
                accessibilityLabel={badge.title}
                color="$white"
                containerStyle={buttonContainerStyle}
                disableLongPress
                disabled={!isUnlocked(badge.id)}
                key={badge.id}
                onPress={(): void => onPressBadge(badge.id)}
                style={overridingButtonStyle}
              >
                {badge.image ? <BadgeImage source={badge.image} /> : null}
              </Button>
            ))}
            {fillEmpty(BADGES_PER_COUNT - badgeRow.length)}
          </Row>
        ))}
      </Rows>
    </Section>
  );
});
