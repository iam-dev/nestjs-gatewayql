import * as fs  from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const GATEWAY_CONFIG_FILENAME = 'gateway.config.yml';

export default () => {
  return yaml.load(
    fs.readFileSync(join(__dirname, GATEWAY_CONFIG_FILENAME), 'utf8'),
  );
};