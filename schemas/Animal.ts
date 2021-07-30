import { list } from '@keystone-next/keystone/schema';
import { relationship, text, timestamp, integer } from '@keystone-next/fields';

export const Animal = list({
  fields: {
    farm: relationship({ ref: 'Farm.animals' }),
    cuts: relationship({ ref: 'Cut.animal', many: true }),
    breed: relationship({ ref: 'Breed.animal' }),
    description: text({ isRequired: true }),
    hangWeight: integer({}),
    processedWeight: integer({}),
    sellableWeight: integer({}),
    wasteWeight: integer({}),
    createdAt: timestamp(),
    processedAt: timestamp(),
    availableAt: timestamp(),
  },
});
