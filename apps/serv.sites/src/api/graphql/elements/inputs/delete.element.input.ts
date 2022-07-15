import { ElementIdCtxInput } from './ctx.input';
import { InputType } from '@nestjs/graphql';

@InputType()
export class DeleteElementInput extends ElementIdCtxInput {}
