module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@app": "./src/app",
            "@assets": "./src/assets",
            "@common": "./src/app/common",
            "@constants": "./src/constants",
            "@services": "./src/services",
            "@store": "./src/app/store"
          }
        }
      ]
    ]
  };
};
