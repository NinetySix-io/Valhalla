import path from 'path';

export const configFilePath = path.resolve(__dirname, 'config.yaml');
export const aclPath = path.resolve(__dirname, 'acl.conf');
export const protoPath = [
  path.resolve(__dirname, 'rpc', 'protobuf', 'index.proto'),
];
