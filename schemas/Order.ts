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
    label: virtual({
      field: schema.field({
        type: schema.String,
        resolve(item) {
          return `${formatMoney(item.total)}`;
        },
      }), //
    }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
    created: timestamp(),
  },
});
