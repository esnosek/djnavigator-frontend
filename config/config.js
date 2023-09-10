import _ from 'lodash';
import configJson from './config.json' assert {type: 'json'};

const defaultConfig = configJson.dev;
const environment = process.env.NODE_ENV || 'dev';
const environmentConfig = configJson[environment];
const config = _.merge(defaultConfig, environmentConfig);

export default config