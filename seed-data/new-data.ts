function timestamp() {
  // sometime in the last 30 days
  const stampy =
    Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30);
  return new Date(stampy).toISOString();
}

// TODO try this to see if I can seed database properly.. will need to rewrite seed script to do so

export const cuts = [
  {
    name: 'stew meat',
    description: 'great for pork stew',
    status: 'available',
    animal: 'pork',
    price: 1200,
    photo: {
      asset_id: 'fde70cc7681a267204bb50a0354fdd22',
      public_id: 'meat-friends/pork-stew_e2uu43',
      format: 'jpg',
      version: 1625717047,
      resource_type: 'image',
      type: 'upload',
      created_at: '2021-07-08T04:04:07Z',
      bytes: 3059069,
      width: 5092,
      height: 4211,
      url: 'http://res.cloudinary.com/meat-friends/image/upload/v1625717047/meat-friends/pork-stew_e2uu43.jpg',
      secure_url:
        'https://res.cloudinary.com/meat-friends/image/upload/v1625717047/meat-friends/pork-stew_e2uu43.jpg',
    },
  },
];
