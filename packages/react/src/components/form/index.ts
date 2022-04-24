import { FormItem } from './item';
import RcForm from 'rc-field-form';

type cForm = typeof RcForm & { Item: typeof FormItem };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Form: cForm = RcForm as any;
Form.Item = FormItem;
