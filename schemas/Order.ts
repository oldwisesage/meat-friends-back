import { list } from '@keystone-next/keystone/schema';
import {
  relationship,
  integer,
  text,
  virtual,
  timestamp,
} from '@keystone-next/fields';
import { schema } from '@keystone-next/types';
import formatMoney from '../lib/formatMoney';

export const Order = list({
  // LEARN understand virtual fields better
  fields: {
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    total: integer(),
    charge: text(),
    createdAt: timestamp(),
    confirmedAt: timestamp(),
    filledAt: timestamp(),
    shippedAt: timestamp(),
    deliveredAt: timestamp(),
  },
});
