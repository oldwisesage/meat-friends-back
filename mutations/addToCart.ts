import { KeystoneContext } from '@keystone-next/types';
import { Session } from 'inspector';
import { CartItemCreateInput } from '../.keystone/schema-types';

export default async function addToCart(
  root: any,
  { cutId }: { cutId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('❓ Adding to cart?');
  // Query current user for
  const sesh = context.session as Session;
  console.log({ sesh });
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // Query user cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, cut: { id: cutId } },
    resolveFields: 'id,quantity',
  });
  const [existingCartItem] = allCartItems;
  console.log(context);

  // See if current item is in their cart
  if (existingCartItem) {
    console.log(
      `🍖 There are already ${existingCartItem.quantity}, increment by 1!`
    );
    // if it is increment by one
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  // if it is not, create one
  console.log('🍗 Created new product, added to cart!');
  return await context.lists.CartItem.createOne({
    data: {
      cut: { connect: { id: cutId } },
      user: { connect: { id: sesh.itemId } },
    },
  });
}
