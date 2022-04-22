const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async ({params}) => {
  try {
    console.log(params);
    return await instance.orders.create(params);
  } catch (error) {
    throw error;
  }
};
