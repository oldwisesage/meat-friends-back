import { relationship, text, timestamp } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Farm = list({
  fields: {
    name: text({ isRequired: true }),
    description: text({ isRequired: true }),
    city: text({ isRequired: true }),
    state: text({ isRequired: true }),
    dateCreated: timestamp({ isRequired: true }),
    animals: relationship({ ref: 'Animal.farm', many: true }),
  },
});
