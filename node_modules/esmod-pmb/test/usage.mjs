import dfOnly from './default-export-only';
import * as named from './named-exports-only';

export default dfOnly;
export const { foo, answer } = named;
