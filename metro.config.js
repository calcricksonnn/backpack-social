const { getDefaultConfig } = require('expo/metro-config');

module.exports = async () => {
  const config = await getDefaultConfig(__dirname);

  // Support additional file extensions
  config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs', 'svg'];

  // Treat SVGs as React components
  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  // Exclude SVGs from default asset handling
  config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');

  return config;
};