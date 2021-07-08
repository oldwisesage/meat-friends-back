import { list } from '@keystone-next/keystone/schema';
import { relationship, select, text, timestamp } from '@keystone-next/fields';

export const Animal = list({
  fields: {
    type: select({
      isRequired: true,
      options: [
        { label: 'pork', value: 'pork' },
        { label: 'beef', value: 'beef' },
        { label: 'chicken', value: 'chicken' },
        { label: 'lamb', value: 'lamb' },
      ],
    }),
    description: text({ isRequired: true }),
    dateCreated: timestamp(),
    farm: relationship({ ref: 'Farm.animals' }),
    cuts: relationship({ ref: 'Cut.animal', many: true }),
  },
});
