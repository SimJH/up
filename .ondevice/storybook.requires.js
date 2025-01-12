/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
  clearDecorators,
} from "@storybook/react-native";

global.STORIES = [
  {
    titlePrefix: "",
    directory: "./src",
    files: "**/*.stories.?(ts|tsx|js|jsx)",
    importPathMatcher:
      "^\\.[\\\\/](?:src(?:\\/(?!\\.)(?:(?:(?!(?:^|\\/)\\.).)*?)\\/|\\/|$)(?!\\.)(?=.)[^/]*?\\.stories\\.(?:ts|tsx|js|jsx)?)$",
  },
];

import "@storybook/addon-ondevice-notes/register";
import "@storybook/addon-ondevice-controls/register";
import "@storybook/addon-ondevice-backgrounds/register";
import "@storybook/addon-ondevice-actions/register";

import { argsEnhancers } from "@storybook/addon-actions-legacy/dist/modern/preset/addArgs";

import { decorators, parameters } from "./preview";

if (decorators) {
  if (__DEV__) {
    // stops the warning from showing on every HMR
    require("react-native").LogBox.ignoreLogs([
      "`clearDecorators` is deprecated and will be removed in Storybook 7.0",
    ]);
  }
  // workaround for global decorators getting infinitely applied on HMR, see https://github.com/storybookjs/react-native/issues/185
  clearDecorators();
  decorators.forEach((decorator) => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

try {
  argsEnhancers.forEach((enhancer) => addArgsEnhancer(enhancer));
} catch {}

const getStories = () => {
  return {
    "./src/components/Demo.stories.tsx": require("../src/components/Demo.stories.tsx"),
    "./src/designs/AppBar/AppBar.stories.tsx": require("../src/designs/AppBar/AppBar.stories.tsx"),
    "./src/designs/Button/Button.stories.tsx": require("../src/designs/Button/Button.stories.tsx"),
    "./src/designs/H1/H1.stories.tsx": require("../src/designs/H1/H1.stories.tsx"),
    "./src/designs/H2/H2.stories.tsx": require("../src/designs/H2/H2.stories.tsx"),
    "./src/designs/H3/H3.stories.tsx": require("../src/designs/H3/H3.stories.tsx"),
    "./src/designs/Input/Input.stories.tsx": require("../src/designs/Input/Input.stories.tsx"),
    "./src/designs/ProgressBar/ProgressBar.stories.tsx": require("../src/designs/ProgressBar/ProgressBar.stories.tsx"),
    "./src/designs/Select/Select.stories.tsx": require("../src/designs/Select/Select.stories.tsx"),
    "./src/designs/Tag/Tag.stories.tsx": require("../src/designs/Tag/Tag.stories.tsx"),
    "./src/designs/Text/Text.stories.tsx": require("../src/designs/Text/Text.stories.tsx"),
    "./src/designs/Toggle/Toggle.stories.tsx": require("../src/designs/Toggle/Toggle.stories.tsx"),
  };
};

configure(getStories, module, false);
