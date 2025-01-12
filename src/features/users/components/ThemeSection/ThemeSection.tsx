import React, { memo } from 'react';
import { styled, useSx, View } from 'dripsy';
import * as AppHelpers from 'src/modules/app/helpers';
import { Button } from 'src/designs';
import { Section } from 'src/components';
import { t } from 'src/translations';
import type { Theme } from 'src/modules/app/types';

export interface ThemeSectionProps {
  onPressBadge: (themeId: number) => void;
}

const ACCESSIBILITY = {
  theme: t('label.theme'),
};

const THEMES_PER_COUNT = 5;

const Rows = styled(View)({
  gap: '$04',
});

const Row = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '$02',
});

const buttonContainerStyle = {
  width: 50,
  height: 45,
};

export const ThemeSection = memo(function ThemeSection({
  onPressBadge,
}: ThemeSectionProps): React.ReactElement {
  const sx = useSx();

  const overridingButtonStyle = sx({
    paddingX: '$01',
    paddingY: '$01',
  });

  const getThemes = (): Theme[][] => {
    let row: Theme[] = [];
    const colors: Theme[][] = [];
    const themeColors = AppHelpers.getThemes();

    for (let i = 0; i < themeColors.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currentTheme = themeColors[i]!;
      if (i % THEMES_PER_COUNT === 0) {
        row = [currentTheme];
        colors.push(row);
      } else {
        row.push(currentTheme);
      }
    }

    return colors;
  };

  const fillEmpty = (count: number): React.ReactElement[] | null => {
    if (count <= 0) return null;
    return new Array(count)
      .fill(null)

      .map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={`empty${index}`} sx={buttonContainerStyle} />
      ));
  };

  return (
    <Section title={t('label.theme')}>
      <Rows>
        {getThemes().map((themeRow, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Row key={index}>
            {themeRow.map((theme) => (
              <Button
                accessibilityHint={ACCESSIBILITY.theme}
                accessibilityLabel={ACCESSIBILITY.theme}
                color={theme.key}
                containerStyle={buttonContainerStyle}
                disableLongPress
                key={theme.id}
                onPress={(): void => onPressBadge(theme.id)}
                style={overridingButtonStyle}
              />
            ))}
            {fillEmpty(THEMES_PER_COUNT - themeRow.length)}
          </Row>
        ))}
      </Rows>
    </Section>
  );
});
