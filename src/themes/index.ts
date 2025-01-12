import { Platform } from 'react-native';
import { makeTheme, type Sx } from 'dripsy';
import {
  CONTAINER_MAX_WIDTH,
  BORDER_WIDTH,
  PRESSABLE_DEPTH,
} from 'src/constants';
import { colors } from './colors';
import { webFont } from './utils';

type Theme = typeof themeLight;

declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends Theme {}
}

export const ROOT_FONT_SIZE = 16;

const FONT_NAME = Platform.select({
  ios: 'TmoneyRoundWind-Regular',
  default: 'TmoneyRoundWindRegular',
});

const BOLD_FONT_NAME = Platform.select({
  ios: 'TmoneyRoundWind-ExtraBold',
  default: 'TmoneyRoundWindExtraBold',
});

const presets = {
  buttonCap: (style?: Sx) =>
    ({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingX: '$04',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      borderRadius: '$md',
      borderWidth: BORDER_WIDTH,
      borderColor: '$border',
      backgroundColor: '$white',
      ...style,
    } as unknown as Sx),
  buttonShadow: (style?: Sx) =>
    ({
      position: 'absolute',
      left: 0,
      bottom: -PRESSABLE_DEPTH,
      width: '100%',
      height: '100%',
      backgroundColor: '$border',
      borderRadius: '$md',
      ...style,
    } as unknown as Sx),
} as const;

const themeLight = makeTheme({
  colors,
  customFonts: {
    [FONT_NAME]: {
      bold: webFont(BOLD_FONT_NAME),
      default: webFont(FONT_NAME),
      normal: webFont(FONT_NAME),
    },
  },
  fonts: {
    root: FONT_NAME,
  },
  fontSizes: {
    $default: ROOT_FONT_SIZE,
    $h1: ROOT_FONT_SIZE * 2,
    $h2: ROOT_FONT_SIZE * 1.5,
    $h3: ROOT_FONT_SIZE * 1.25,
    $text: ROOT_FONT_SIZE,
  },
  text: {
    // Default text style
    body: {
      fontSize: ROOT_FONT_SIZE,
    },
    h1: {
      marginVertical: 0,
      fontSize: '$h1',
      fontWeight: 'bold',
    },
    h2: {
      marginVertical: 0,
      fontSize: '$h2',
      fontWeight: 'bold',
    },
    h3: {
      marginVertical: 0,
      fontSize: '$h3',
      fontWeight: 'bold',
    },
    p: {
      marginVertical: 0,
      fontSize: '$text',
    },
    primary: {
      color: '$text_primary',
    },
    secondary: {
      color: '$text_secondary',
    },
    tertiary: {
      color: '$text_tertiary',
    },
    black: {
      color: '$black',
    },
    white: {
      color: '$white',
    },
  },
  space: {
    $00: 0,
    $01: ROOT_FONT_SIZE * 0.25,
    $02: ROOT_FONT_SIZE * 0.5,
    $03: ROOT_FONT_SIZE * 0.75,
    $04: ROOT_FONT_SIZE,
    $05: ROOT_FONT_SIZE * 1.25,
    $06: ROOT_FONT_SIZE * 1.5,
    $07: ROOT_FONT_SIZE * 2,
  },
  radii: {
    $input: 32,
    $md: 8,
    $full: 9999,
  },
  sizes: {
    container: CONTAINER_MAX_WIDTH,
  },
  layout: {
    // Base container style
    container: {
      flex: 1,
      px: '$04',
      backgroundColor: '$white',
      alignSelf: 'center',
    },
    // Container variants
    wide: {
      maxWidth: 1100,
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  types: {
    strictVariants: true,
    reactNativeTypesOnly: true,
  },
});

// @TODO: Add dark theme
const themeDark: Theme = {
  ...themeLight,
};

export { themeLight, themeDark, presets };
