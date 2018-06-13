/**
 * Created by shilltr on 2018/5/16.
 */
//import {getTheme} from './theme.js';
const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
//const theme = getTheme();
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(['import', {libraryName: 'antd', style: true}], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: {},
  })(config, env);
  return config;
};