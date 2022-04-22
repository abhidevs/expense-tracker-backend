exports.createOrder = async (user, razorpayOrderId) => {
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
