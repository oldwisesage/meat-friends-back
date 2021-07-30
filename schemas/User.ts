import { CartItem } from './CartItem';
import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship, timestamp } from '@keystone-next/fields';

export const User = list({
  fields: {
    orders: relationship({ ref: 'Order.user', many: true }),
    cart: relationship({
      ref: 'CartItem.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    // avatar: relationship({ ref: 'Avatar.user' }),
    address: relationship({ ref: 'Address.user', many: true }),
    setting: relationship({ ref: 'Setting.user' }),
    name: text({ isRequired: true }),
    lastName: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    stripePay: text(),
    createdAt: timestamp(),
    lastVisitAt: timestamp(),
  },
});
