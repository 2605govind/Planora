import axios from 'axios';
import { createPlanSubscription } from '../services/planService.js';
import Plan from '../Model/Plan.js';





/*
body
{
  "name": "Gold Membership Plan",
  "description": "Access to all premium features, charged monthly",
  "price": "19.99"
  "creditsPerMonth": 100,
  "planType": "FREE"
}

POST: /api/subscriptions/plans
*/
export const createPaypalPlan = async (req, res) => {
    try {
        const { name, description, price, creditsPerMonth, planType } = req.body;

        if (!name || !description || !price || !creditsPerMonth || !planType) {
            return res.status(400).json({
                success: false,
                message: "All feild are required",
            });
        }

        const existing = await Plan.findOne({ where: { name } });
        if (existing) {
            return res.status(400).json({
            success: false,
            message: "Plan with this name already exists.",
        });
        }

        const plan = await Plan.create({
            name,
            description,
            price,
            creditsPerMonth,
            planType,
        });


        const data = await createPlanSubscription(plan);

        console.log(data);

        res.json({
            success: true,
            message: "Payment cancelled and pending transaction FAILED.",
            result: data
        });
    } catch (error) {
        console.error("Error creating Paypal Plan.", error);
        res.status(500).json({
            success: false,
            message: "Error creating Paypal Plan.",
        });
    }
}