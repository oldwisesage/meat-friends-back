import { integer, relationship, text, timestamp } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const CartItem = list({
  ui: {
    listView: {
      initialColumns: ['cut', 'quantity', 'user'],
    },
  },
  fields: {
    cut: relationship({
      ref: 'Cut',
    }),
    user: relationship({
      ref: 'User.cart',
    }),
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    createdAt: timestamp(),
  },
});
