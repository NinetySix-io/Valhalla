import { InputType } from '@nestjs/graphql';
import { PageContextInput } from './page.ctx.input';

@InputType()
export class DeleteElementInput extends PageContextInput {}
