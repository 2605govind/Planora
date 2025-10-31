import { useState } from 'react';
import PlanList from './PlanList.jsx';
import PlanForm from './PlanForm.jsx';

export default function PlanSection() {
  const [mode, setMode] = useState('list'); // list | create | update
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header Buttons */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setMode('list')}
          className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-colors ${
            mode === 'list'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          All Plans
        </button>
        <button
          onClick={() => setMode('create')}
          className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-colors ${
            mode === 'create'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          Create Plan
        </button>
      </div>

      {/* Content Section */}
      <div>
        {mode === 'list' && (
          <PlanList setMode={setMode} setSelectedPlan={setSelectedPlan} />
        )}
        {mode === 'create' && <PlanForm mode="create" />}
        {mode === 'update' && <PlanForm mode="update" plan={selectedPlan} />}
      </div>
    </div>
  );
}
