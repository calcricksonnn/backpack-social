module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxRuntime: 'automatic' }],
      // Remove @react-native/babel-preset - it conflicts with babel-preset-expo
    ],
    plugins: [
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }],
      // Remove the manual JSX transform plugin - babel-preset-expo handles this
    ],
  };
};