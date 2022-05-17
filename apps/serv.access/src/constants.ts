import path from 'path';

export const protoPath = [path.resolve(__dirname, 'protobuf', 'access.proto')];
export const configFilePath = path.resolve(__dirname, 'config.yaml');
export const aclPath = path.resolve(__dirname, 'acl.conf');
export const CASBIN_CUSTOM_ADAPTER = 'CASBIN_CUSTOM_ADAPTER' as const;
