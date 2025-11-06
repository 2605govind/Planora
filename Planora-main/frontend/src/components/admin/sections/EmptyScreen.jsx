import { Inbox } from 'lucide-react';

export default function EmptyScreen({ message = "No section selected" }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
      <Inbox size={64} className="mb-4 text-gray-400" />
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
}
