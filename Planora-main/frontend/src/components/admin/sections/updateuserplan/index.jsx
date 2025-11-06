import { useState } from 'react';
// import PlanList from './PlanList.jsx';
// import PlanForm from './PlanForm.jsx';

export default function UpdateUserPlan() {
  const [mode, setMode] = useState('list'); // list | create | update
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div>
      <div className="mb-4 flex gap-3">
        <button
          onClick={() => setMode('list')}
          className={`px-3 py-1 rounded ${mode === 'list' && 'bg-blue-300'}`}
        >
          All User
        </button>
        {/* <button
          onClick={() => setMode('create')}
          className={`px-3 py-1 rounded ${mode === 'create' && 'bg-blue-300'}`}
        >
          Update Plan
        </button> */}
      </div>

      {/* {mode === 'list' && (
        <PlanList setMode={setMode} setSelectedPlan={setSelectedPlan} />
      )} */}
      {/* {mode === 'create' && <PlanForm mode="create" />}
      {mode === 'update' && <PlanForm mode="update" plan={selectedPlan} />} */}
    </div>
  );
}
