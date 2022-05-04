export const createOrder = async (user: any, razorpayOrderId: string) => {
  try {
    const order = await user.createOrder({
      razorpayOrderId,
    });
    await order.save();

    return order;
  } catch (error) {
    throw error;
  }
};
