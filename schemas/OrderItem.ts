import { list } from '@keystone-next/keystone/schema';
import { relationship, integer, select, text } from '@keystone-next/fields';

export const OrderItem = list({
  // access:
  fields: {
    name: text({ isRequired: true }),
    description: text({ ui: { displayMode: 'textarea' } }),

    // TODO add all data types for actual application
    photo: relationship({
      ref: 'CutImage',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    price: integer({ isRequired: true }),
    quantity: integer({ isRequired: true }),
    order: relationship({ ref: 'Order.items' }),
  },
});
