import { relationship, text, timestamp } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Farm = list({
  fields: {
    animals: relationship({ ref: 'Animal.farm', many: true }),
    name: text({ isRequired: true }),
    location: text({ isRequired: true }),
    description: text({ isRequired: true }),
    createdAt: timestamp({ isRequired: true }),
  },
});
