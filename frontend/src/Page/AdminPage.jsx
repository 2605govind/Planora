import { useState } from 'react';
import AdminContainer from '../components/admin/AdminContainer.jsx';
import Sidebar from '../components/admin/Sidebar.jsx';

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('products');

  return (
    <div className="flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <AdminContainer activeSection={activeSection} />
    </div>
  );
}
