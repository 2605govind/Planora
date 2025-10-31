import Transaction from '../Model/Transaction.js'
import Plan from '../Model/Plan.js';
import { createBillingPlanService, createPlanSubscriptionService, deactivatePlanService, showBillingPlanDetailsService } from '../services/planService.js';

// create plan in paypal /admin
export const createBillingPlan = async (req, res) => {
  try {
    const { name, description, price, creditsPerMonth, planType } = req.body;

    if (!name || !description || !price || !creditsPerMonth) {
      return res.status(400).json({
        success: false,
        message: "All feild are required",
      });
    }

    const existing = await Plan.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({ message: 'Plan with this name already exists' });
    }

    const planData = {
      name: name?.toLowerCase().trim(),
      description: description.trim(),
      price,
      creditsPerMonth,
      planType: planType?.toUpperCase().trim(),
    };

    const serviceData = await createBillingPlanService(planData);
    console.log(serviceData)

    planData.productId = serviceData.product_id;
    planData.planId = serviceData.id;

    const createdPlan = await Plan.create(planData)

    res.status(201).json({
      success: true,
      message: 'Plan subscription created successfully',
      plan: { ...serviceData, ...createdPlan }
    });

  } catch (error) {
    console.log('Create Plan Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// todo
// update plan in paypal /admin
export const updateBillingPlan = async (req, res) => {
  try {
    const { name, description, price, creditsPerMonth, planType } = req.body;

    if (!name || !description || !price || !creditsPerMonth) {
      return res.status(400).json({
        success: false,
        message: "All feild are required",
      });
    }

    const plan = {
      name,
      description,
      price,
      creditsPerMonth,
      planType,
    };

    res.status(201).json({
      success: true,
      message: 'Plan subscription created successfully',
      subscription: data
    });
  } catch (error) {
    console.log('updateSubscriptionPlan Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};


// update plan in paypal /admin
export const deactivateBillingPlan = async (req, res) => {
  const { planId } = req.params
  try {
    await deactivatePlanService(planId);

    res.status(201).json({
      success: true,
      message: 'Plan deactivate successfully',
    });
  } catch (error) {
    console.log('deactivateBillingPlan Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};




// get all plans from paypal | user/admin
export const getAllBillingPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll({
      order: [
        ['name', 'ASC']
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Get all plans successfully',
      plans: plans
    });
  } catch (error) {
    console.log('getAllSubscriptionPlans Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
}

// get plan from paypal | user/admin
export const getBillingPlanDetails = async (req, res) => {
  const { productId } = req.params;
  try {
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId feild is required",
      });
    }

    const plan = await showBillingPlanDetailsService(productId);
    res.status(201).json({
      success: true,
      message: 'Get plan successfully',
      plan: plan
    });
  } catch (error) {
    console.log('getSubscriptionPlan Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
}




export const createPlanSubscription = async (req, res) => {

  const { planId } = req.params;
  try {


    console.log("planId", planId)
    const data = await createPlanSubscriptionService(planId)

    await Transaction.create({
      userId: req.user.id,
      planId: req.body.id,
      amount: req.body.price,
      status: "PENDING",
      paypalOrderId: data.id,
    });

    res.status(201).json({
      success: true,
      message: 'successfully',
      data
    });
  } catch (error) {
    console.log('createPlanSubscription Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
}


















// get plan from supabase
export const getAllActivePlans = async (req, res) => {
  try {
    const plans = await Plan.findAll({ where: { isActive: true } });
    res.status(200).json(plans);
  } catch (error) {
    console.log('Get Plans Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, creditsPerMonth, planType, isActive } = req.body;

    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    await plan.update({
      name: name ?? plan.name,
      description: description ?? plan.description,
      price: price ?? plan.price,
      creditsPerMonth: creditsPerMonth ?? plan.creditsPerMonth,
      planType: planType ?? plan.planType,
      isActive: isActive ?? plan.isActive,
    });

    res.status(200).json({
      message: 'Plan updated successfully',
      plan,
    });
  } catch (error) {
    console.log('Update Plan Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const deactivatePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    plan.isActive = false;
    await plan.save();

    res.status(200).json({ message: 'Plan deactivated successfully' });
  } catch (error) {
    console.log('Deactivate Plan Error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
