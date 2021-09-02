import { KeystoneContext } from '@keystone-next/types';
import {
  OrderCreateInput,
  CartItemCreateInput,
} from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';

const graphql = String.raw;

export default async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  console.log('💵 [Stripe] checkout has started');
  console.log(process.env.STRIPE_SECRET);
  // make sure user is signed in
  const userId = context.session.itemId;
  // TODO checkout as a guest system
  if (!userId) {
    throw new Error('Sorry! You must be signed in to crate an order!');
  }
  // query the current user
  console.log(`🕗 [Stripe] Query current user...`);
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id 
      name 
      email 
      cart {
        id
        quantity
        cut {
          name 
          price
          description
          id
          photo {
            id
            image {
              id
              publicUrlTransformed
            }

          }
        } 
      }
    `,
  });
  console.log(`✅ Here is current user:`, user);
  // calc the total price for their order
  const cartItems = user.cart.filter((cartItem) => cartItem.cut);
  const amount = cartItems.reduce(function (
    tally: number,
    cartItem: CartItemCreateInput
  ) {
    return tally + cartItem.quantity * cartItem.cut.price;
  },
  0);
  console.log(`⭐️ [Stripe] Calculated amount:`, amount);
  // create the charge wiht the stripe library

  // LEARN understand how this works better
  console.log(`🕗 [Stripe] Sending charge to stripe api.... `);
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
  // console.log(`⭐️ [Stripe] Charge completed`, charge);
  // console.log(`🤖 [Stripe] Currently cart items`, cartItems);

  // convert cartitems to orderitems
  const orderItems = cartItems.map((cartItem) => {
    // console.log(`🛒 CURRENT CART ITEM:`, cartItem);
    const orderItem = {
      name: cartItem.cut.name,
      description: cartItem.cut.description,
      price: cartItem.cut.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.cut.photo.id } },
    };
    return orderItem;
  });
  console.log(`⭐️ Converted cart items to order items`);

  // create the order and return it
  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
    resolveFields: false,
  });

  // Clean up any old cartItems
  const cartItemIds = user.cart.map((cartItem) => cartItem.id);
  await context.lists.CartItem.deleteMany({
    ids: cartItemIds,
  });
  console.log(`✅✅✅✅✅ WE FINALLY DID IT`);
  return order;
}
