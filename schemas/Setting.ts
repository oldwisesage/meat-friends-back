import { list } from '@keystone-next/keystone/schema';
import { relationship, select } from '@keystone-next/fields';

export const Setting = list({
  // LEARN understand virtual fields better
  fields: {
    user: relationship({ ref: 'User.setting' }),
    darkmode: select({
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
    }),
    animation: select({
      options: [
        { label: 'None', value: 'None' },
        { label: 'Light', value: 'light' },
        { label: 'Standard', value: 'Standard' },
      ],
    }),
    textsize: select({
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Larger', value: 'large' },
        { label: 'Huge', value: 'huge' },
      ],
    }),
  },
});
