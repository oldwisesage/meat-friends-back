import { relationship, select, text, timestamp } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Address = list({
  fields: {
    type: select({
      isRequired: true,
      options: [
        { label: 'shipping', value: 'shipping' },
        { label: 'billing', value: 'billing' },
      ],
    }),
    streetNum: text({ isRequired: true }),
    street: text({ isRequired: true }),
    city: text({ isRequired: true }),
    state: text({ isRequired: true }),
    zip: text({ isRequired: true }),
    dateCreated: timestamp({ isRequired: true }),
    user: relationship({ ref: 'User.address' }),
  },
});
