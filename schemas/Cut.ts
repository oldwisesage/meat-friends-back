import { list } from '@keystone-next/keystone/schema';
import {
  relationship,
  integer,
  select,
  text,
  autoIncrement,
} from '@keystone-next/fields';
import { v4 as uuidv4 } from 'uuid';

export const Cut = list({
  // access:
  fields: {
    // DAVE how to implment custom id function uuid?
    name: text({ isRequired: true }),
    description: text({ ui: { displayMode: 'textarea' } }),

    // TODO add all data types for actual application
    photo: relationship({
      ref: 'CutImage.cut',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    status: select({
      options: [
        { label: 'draft', value: 'draft' },
        { label: 'available', value: 'available' },
        { label: 'unavailable', value: 'unavailable' },
      ],
      defaultValue: 'draft',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    price: integer({ isRequired: true }),
  },
});
