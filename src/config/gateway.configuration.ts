import * as fs  from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const GATEWAY_CONFIG_FILENAME = 'gateway.config.yml';

export default () => {
  try {
    return yaml.load(
      fs.readFileSync(join(__dirname, GATEWAY_CONFIG_FILENAME), 'utf8'),
    );
  } catch (error) {
    console.log('Cannot read gateway.config.yml');
    throw(error);
    
  }
};