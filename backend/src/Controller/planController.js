import Plan from '../Model/Plan.js';
import { createBillingPlanService, allBillingPlansService, showBillingPlanDetailsService } from '../services/planService.js';

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


    // const existing = await Plan.findOne({ where: { name } });
    // if (existing) {
    //   return res.status(400).json({ message: 'Plan with this name already exists' });
    // }
    // const plan = await Plan.create({
    //   name,
    //   description,
    //   price,
    //   creditsPerMonth,
    //   planType,
    // });


    const plan = {
      name,
      description,
      price,
      creditsPerMonth,
      planType,
    };

    const data = await createBillingPlanService(plan);
    console.log(data);


    res.status(201).json({
      success: true,
      message: 'Plan subscription created successfully',
      subscription: data
    });
  } catch (error) {
    console.log('Create Plan Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// todo
// update plan in paypal /admin
// export const updateSubscriptionPlan = async (req, res) => {
//   try {
//     const { name, description, price, creditsPerMonth, planType } = req.body;


//     if (!name || !description || !price || !creditsPerMonth) {
//       return res.status(400).json({
//         success: false,
//         message: "All feild are required",
//       });
//     }


//     // const existing = await Plan.findOne({ where: { name } });
//     // if (existing) {
//     //   return res.status(400).json({ message: 'Plan with this name already exists' });
//     // }
//     // const plan = await Plan.create({
//     //   name,
//     //   description,
//     //   price,
//     //   creditsPerMonth,
//     //   planType,
//     // });


//     const plan = {
//       name,
//       description,
//       price,
//       creditsPerMonth,
//       planType,
//     };



//     res.status(201).json({
//       success: true,
//       message: 'Plan subscription created successfully',
//       subscription: data
//     });
//   } catch (error) {
//     console.log('updateSubscriptionPlan Error:', error);
//     res.status(500).json({ success: false, message: 'Server Error', error: error.message });
//   }
// };


// get all plans from paypal | user/admin
export const getAllBillingPlans = async (req, res) => {
  try {
    const allPlan = await allBillingPlansService();
    console.log(allPlan)
    res.status(201).json({
      success: true,
      message: 'Get all plans successfully',
      plans: allPlan
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
  
  try {
    const {} = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId feild is required",
      });
    }

    res.status(201).json({
      success: true,
      message: 'successfully',

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
