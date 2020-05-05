import { PluginEntrypoint } from 'nexus/plugin'
import { Settings } from './settings'


export const security: PluginEntrypoint<Settings, 'required'> = (settings) => ({
  settings,
  packageJsonPath: require.resolve('../package.json'),
  runtime: {
    module: require.resolve('./runtime'),
    export: 'plugin',
  },
})
