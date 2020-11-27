import * as fs  from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const SYSTEM_CONFIG_FILENAME = 'system.config.yml';

export default () => {
  return yaml.load(
    fs.readFileSync(join(__dirname, SYSTEM_CONFIG_FILENAME), 'utf8'),
  );
};