/* eslint-disable */
export default {
  displayName: 'web-services',
  preset: '../../../jest.preset.js',
  coverageDirectory: '../../../coverage/libs/web/service',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
