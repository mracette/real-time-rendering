module.exports = {
  webpack: {
    configure: (config) => {
      config.module.rules.push({
        test: /\.(frag|vert)$/,
        type: 'asset/source'
      });
      return config;
    }
  }
};
