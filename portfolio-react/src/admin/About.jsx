import { useState, useEffect } from 'react';
import { getAbout, updateAbout } from '../services/firebase/firestore';

const About = () => {
  const [formData, setFormData] = useState({ bio: '', skills: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await getAbout();
        if (data) {
          setFormData({
            bio: data.bio || '',
            skills: data.skills ? data.skills.join(', ') : ''
          });
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await updateAbout({
        bio: formData.bio,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean)
      });
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage('Error updating profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
         <h1 className="text-2xl font-bold tracking-tight">Edit Profile</h1>
         <p className="text-sm admin-muted mt-1">Update your personal information and skills</p>
      </div>
      
      {message && (
        <div className={`p-4 rounded-lg mb-6 text-sm font-medium animate-in ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-card p-8 rounded-xl shadow-sm space-y-8">
        <div>
          <label className="block text-sm font-medium mb-2">Professional Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            className="w-full p-4 rounded-lg admin-input text-sm leading-relaxed focus:ring-2 focus:ring-zinc-800 outline-none h-48 resize-none"
            placeholder="Write your professional bio..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Skills</label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => setFormData({...formData, skills: e.target.value})}
            className="w-full p-4 rounded-lg admin-input text-sm focus:ring-2 focus:ring-zinc-800 outline-none"
            placeholder="JavaScript, React, Node.js..."
          />
          <p className="text-xs admin-muted mt-2">Separate skills with commas. These will appear in your public profile.</p>
        </div>

        <div className="pt-4 border-t admin-border flex justify-end">
           <button
             type="submit"
             disabled={saving}
             className="px-8 py-3 admin-btn-primary rounded-lg font-medium text-sm hover:opacity-90 transition disabled:opacity-50"
           >
             {saving ? 'Saving Changes...' : 'Save Profile'}
           </button>
        </div>
      </form>
    </div>
  );
};

export default About;
