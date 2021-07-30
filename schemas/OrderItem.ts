import { list } from '@keystone-next/keystone/schema';
import {
  relationship,
  integer,
  select,
  text,
  timestamp,
} from '@keystone-next/fields';

export const OrderItem = list({
  // access:
  fields: {
    order: relationship({ ref: 'Order.items' }),
    photo: relationship({
      ref: 'CutImage',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    name: text({ isRequired: true }),
    price: integer({ isRequired: true }),
    quantity: integer({ isRequired: true }),
    description: text({ ui: { displayMode: 'textarea' } }),
    createdAt: timestamp(),
  },
});
