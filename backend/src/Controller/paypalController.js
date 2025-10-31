import Plan from "../Model/Plan.js";
import User from "../Model/User.js";
import Transaction from "../Model/Transaction.js";
import { createOrder, verifyWebhookSignature } from "../services/planService.js";

export const createPayPalOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planId } = req.body;


    const plan = await Plan.findByPk(planId);
    if (!plan) return res.status(404).json({ error: "Plan not found" });

    const order = await createOrder(plan.price);

    await Transaction.create({
      userId,
      planId,
      amount: plan.price,
      status: "PENDING",
      paypalOrderId: order.id,
    });

    res.json({ id: order.id, links: order.links });
  } catch (err) {
    console.error("Create Order Error:", err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
};



export const cancelPayPalOrder = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Missing token in query parameters." });
    }

    // Delete pending transaction with this PayPal order ID
    const tran = await Transaction.findOne({
      where: { paypalOrderId: token, status: "PENDING" },
    });

    if (!tran) {
      return res.status(404).json({
        message: "No pending transaction found for this token.",
      });
    }

    tran.status = "FAILED";
    await tran.save();


    res.json({
      message: "Payment cancelled and pending transaction FAILED.",
      token,
    });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({ error: "Error processing cancellation." });
  }
};


export const completePayPalOrder = async (req, res) => {
  try {
    const response = await capturePayment(req.query.token)

    res.json({ message: 'Purchased successfully', data: response });
  } catch (error) {
    res.send('Error: ' + error)
  }
};



export const handlePayPalWebhook = async (req, res) => {
  try {
    const rawBody = req.body;

    // verify karo
    const verify = await verifyWebhookSignature(req.headers, rawBody);

    if (verify.verification_status !== "SUCCESS") {
      console.log("Invalid webhook signature");
      return res.sendStatus(400);
    }

    // ab webhook event parse karo
    const body = JSON.parse(rawBody.toString("utf8"));
    const { event_type, resource } = body;

    if (event_type === "CHECKOUT.ORDER.APPROVED") {
      const orderId = resource.id;
      const payerEmail = resource?.payer?.email_address;

      const transaction = await Transaction.findOne({
        where: { paypalOrderId: orderId },
      });

      if (!transaction) {
        console.log("Transaction not found:", orderId);
        return res.sendStatus(404);
      }

      transaction.status = "COMPLETED";
      await transaction.save();

      const user = await User.findByPk(transaction.userId);
      const plan = await Plan.findByPk(transaction.planId);

      if (user && plan) {
        user.plan = plan.name;
        user.balance = plan.creditsPerMonth;
        await user.save();
      }

      console.log(`webhook ${payerEmail} upgraded to ${plan.name}`);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook Error:", err.response?.data || err.message);
    res.sendStatus(500);
  }
};



