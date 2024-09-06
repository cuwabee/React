const path = require('path');

module.exports = function override(config, env) {
  config.resolve.alias['public'] = path.resolve(__dirname, 'public');
  return config;
}