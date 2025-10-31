import { Home, Box, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeSection, setActiveSection }) {
  const navigate = useNavigate();
  
  const sections = [
    { name: 'products', icon: Box },
    { name: 'plans', icon: CreditCard },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen bg-gray-800 text-white w-60 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold p-4">Admin Panel</h2>
        {sections.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setActiveSection(name)}
            className={`flex items-center gap-2 p-3 text-left hover:bg-gray-700 w-full ${
              activeSection === name ? 'bg-gray-700' : ''
            }`}
          >
            <Icon size={18} />
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        className="flex cursor-pointer items-center justify-center gap-2 p-3 bg-blue-800 hover:bg-blue-700"
      >
        <Home size={20} />
        <span>Home</span>
      </button>
    </div>
  );
}
