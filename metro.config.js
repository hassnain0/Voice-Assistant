const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname, { isCSSEnabled: true });

const config = mergeConfig(defaultConfig, {
  resolver: {
    extraNodeModules: {
      'react-native-css-interop': require.resolve('react-native-css-interop'),
    },
  },
});

module.exports = withNativeWind(config, { input: './global.css' });
