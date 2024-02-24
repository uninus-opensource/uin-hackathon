/* eslint-disable */
export default {
  displayName: 'web-component-templates',
  preset: '../../../../jest.preset.js',
  coverageDirectory: '../../../../coverage/libs/web/components/templates',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
