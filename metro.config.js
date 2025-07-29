const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Allow `.cjs` and `.svg` files (for custom icons/assets)
  config.resolver.sourceExts = [
    ...config.resolver.sourceExts,
    'cjs',
    'svg'
  ];

  // Optional: treat SVGs as react-native components
  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');

  return config;
})();