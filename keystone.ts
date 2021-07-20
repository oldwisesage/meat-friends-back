import { extendGraphqlSchema } from './mutations/index';
import { CartItem } from './schemas/CartItem';
import { Address } from './schemas/Address';
import { Farm } from './schemas/Farm';
import { Animal } from './schemas/Animal';
import { Order } from './schemas/Order';
import { OrderItem } from './schemas/OrderItem';
import { User } from './schemas/User';
import { Cut } from './schemas/Cut';
import { CutImage } from './schemas/CutImage';
import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { statelessSessions } from '@keystone-next/keystone/session';
import { insertSeedData } from './seed-data/index';
import { sendPasswordResetEmail } from './lib/mail';

const databaseURL = process.env.DATABASE_URL;

const session = statelessSessions({
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
});

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',

  sessionData: 'id name email',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // itemData: { isAdmin: true },
  },
  passwordResetLink: {
    sendToken: async ({ itemId, identity, token, context }) => {
      console.log(`🍎 Token available: ${token} & email: ${identity}`);
      await sendPasswordResetEmail(token, identity);
    },
    tokensValidForMins: 60,
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
      },
    },
    db: {
      provider: 'postgresql',
      url: databaseURL,
      idField: { kind: 'uuid' },
      async onConnect() {
        console.log('✅  Connected to the database!');
        if (process.argv.includes('--seed-data')) await insertSeedData();
      },
    },
    lists: createSchema({
      User,
      Cut,
      CutImage,
      CartItem,
      OrderItem,
      Order,
      Address,
      Farm,
      Animal,
    }),
    extendGraphqlSchema,
    ui: {
      isAccessAllowed: ({ session }) => session?.data,
    },
    session,
  })
);
