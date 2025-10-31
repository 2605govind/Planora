import ProductSection from './sections/products';
import UpdateUserPlan from './sections/updateuserplan';
import PlanSection from './sections/plans';

export default function AdminContainer({ activeSection }) {
  return (
    <div className="flex-1 ml-60 p-6 bg-gray-100 min-h-screen">
      {activeSection === 'products' && <ProductSection />}
      {activeSection === 'UpdateUserPlann' && <UpdateUserPlan />}
      {activeSection === 'plans' && <PlanSection />}
    </div>
  );
}
