import { integer, relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const CartItem = list({
  fields: {
    // TODO custom label
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    cut: relationship({
      ref: 'Cut',
    }),
    user: relationship({
      ref: 'User.cart',
    }),
  },
});
