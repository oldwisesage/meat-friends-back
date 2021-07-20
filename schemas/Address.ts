import { relationship, select, text, timestamp } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Address = list({
  fields: {
    street: text({ isRequired: true }),
    city: text({ isRequired: true }),
    state: text({ isRequired: true }),
    zip: text({ isRequired: true }),
    user: relationship({ ref: 'User.address' }),
  },
});
