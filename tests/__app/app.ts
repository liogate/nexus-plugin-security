import { use, server } from 'nexus'
import { security } from '../../src'

use(security({
  appSecret: 'test',
}));
