import { useState, useEffect } from 'react';
import { getMessages } from '../services/firebase/firestore';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-8">
         <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
         <p className="text-sm admin-muted mt-1">Check inquiries from your contact form</p>
      </div>
      
      {messages.length === 0 ? (
        <div className="admin-card p-10 text-center rounded-xl border-dashed">
            <p className="admin-muted">No messages received yet.</p>
        </div>
      ) : (
        <div className="admin-card rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b admin-border bg-zinc-50/50">
                  <th className="px-6 py-4 font-medium text-xs text-zinc-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 font-medium text-xs text-zinc-500 uppercase tracking-wider">From</th>
                  <th className="px-6 py-4 font-medium text-xs text-zinc-500 uppercase tracking-wider">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y admin-border">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm whitespace-nowrap admin-muted">
                      {msg.createdAt?.seconds 
                        ? new Date(msg.createdAt.seconds * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) 
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{msg.name}</span>
                        <a href={`mailto:${msg.email}`} className="text-xs text-blue-600 hover:underline">{msg.email}</a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                        <p className="text-sm admin-muted max-w-lg line-clamp-2">{msg.message}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
