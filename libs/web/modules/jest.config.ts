/* eslint-disable */
export default {
  displayName: 'web-modules',
  preset: '../../../jest.preset.js',
  coverageDirectory: '../../../coverage/libs/web/modules',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
