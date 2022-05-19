import path from 'path';

export const configFilePath = path.resolve(__dirname, 'config.yaml');
export const protoPath = [
  path.resolve(__dirname, 'rpc', 'protobuf', 'users.proto'),
];
