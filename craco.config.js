module.exports = {
  webpack: {
    configure: (config) => {
      config.module.rules
        .find((rule) => 'oneOf' in rule)
        .oneOf.splice(
          -1,
          0,
          ...[
            {
              test: /\.(glsl|frag|vert)$/,
              use: [require.resolve('raw-loader'), require.resolve('glslify-loader')]
            }
          ]
        );
      return config;
    }
  }
};
