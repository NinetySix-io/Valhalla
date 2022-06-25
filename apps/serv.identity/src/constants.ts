import path from 'path';

export const configFilePath = path.resolve(__dirname, 'config.yaml');
export const aclPath = path.resolve(__dirname, 'acl.conf');
export const protoPath = [path.resolve(__dirname, 'protobuf', 'index.proto')];
export const cqrsPath = path.resolve(__dirname, 'cqrs');
