import { RpcException } from '@nestjs/microservices';
import { TransformClassError } from '../general.decorators';

/**
 * Transform all thrown errors in this class as RpcException
 */
export function RpcHandler(): ClassDecorator {
  return (target) => {
    TransformClassError(RpcException)(target);
  };
}
