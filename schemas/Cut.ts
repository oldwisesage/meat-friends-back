import { list } from '@keystone-next/keystone/schema';
import {
  relationship,
  integer,
  select,
  text,
  autoIncrement,
  json,
} from '@keystone-next/fields';
import { v4 as uuidv4 } from 'uuid';

export const Cut = list({
  // access:
  fields: {
    name: text({ isRequired: true }),
    description: text({ ui: { displayMode: 'textarea' } }),
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
    animal: relationship({ ref: 'Animal.cuts' }),
    photo: relationship({
      ref: 'CutImage.cut',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    // TODO Add cooking methods as schema to relate here
    // TODO add why its good here
    // TODO add primal part here
  },
});
