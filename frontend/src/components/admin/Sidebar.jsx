import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeSection, setActiveSection }) {
  const sections = ['products', 'plans']; // , 'UpdateUserPlann'
  const navigate = useNavigate();

  return (
    <div className="fixed left-0 top-0 h-screen bg-gray-800 text-white w-60 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold p-4">Admin Panel</h2>
        {sections.map((sec) => (
          <button
            key={sec}
            onClick={() => setActiveSection(sec)}
            className={`p-3 text-left hover:bg-gray-700 w-full ${
              activeSection === sec ? 'bg-gray-700' : ''
            }`}
          >
            {sec.charAt(0).toUpperCase() + sec.slice(1)}
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        className="flex items-center justify-center gap-2 p-3 bg-gray-900 hover:bg-gray-700"
      >
        <Home size={20} />
        <span>Home</span>
      </button>
    </div>
  );
}
