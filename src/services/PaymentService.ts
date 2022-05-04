import Razorpay from "razorpay";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async ({ params }: { params: any }) => {
  try {
    console.log(params);
    return await instance.orders.create(params);
  } catch (error) {
    throw error;
  }
};
