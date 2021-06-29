import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { statelessSessions } from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Cut } from './schemas/Cut';
import { CutImage } from './schemas/CutImage';
import { insertSeedData } from './seed-data/index';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/meat-freinds-back';

// const sessionConfig = {
//   maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
//   secret: process.env.COOKIE_SECRET,
// };

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
});

// DAVE https://lucid.app/lucidchart/e7f90d1a-d8a1-4b46-afb3-0b4b099bcf47/edit?beaconFlowId=862965A0952CAB94&page=0_0#

export default withAuth(
  config({
    server: {
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
      },
    },
    db: {
      adapter: 'prisma_postgresql',
      url: databaseURL,
      async onConnect() {
        console.log('✅  Connected to the database!');
        if (process.argv.includes('--seed-data')) await insertSeedData();
      },
    },
    lists: createSchema({
      User,
      Cut,
      CutImage,
    }),
    ui: {
      isAccessAllowed: ({ session }) => session?.data,
    },
    session,
  })
);
