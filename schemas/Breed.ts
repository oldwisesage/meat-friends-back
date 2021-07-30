import { relationship, text, timestamp } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Breed = list({
  fields: {
    animal: relationship({ ref: 'Animal.breed' }),
    name: text({ isRequired: true }),
    bred: text({ isRequired: true }),
  },
});
