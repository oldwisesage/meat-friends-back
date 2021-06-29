import 'dotenv/config';
import { text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'meat-friends',
};

export const CutImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'source',
    }),
    altText: text(),
    cut: relationship({ ref: 'Cut.photo' }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'cut', 'altText'],
    },
  },
});
