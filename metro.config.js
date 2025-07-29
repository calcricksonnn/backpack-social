const { getDefaultConfig } = require('expo/metro-config');

module.exports = async () => {
  const config = await getDefaultConfig(__dirname);

  config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs', 'svg'];

  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');

  return config;
};