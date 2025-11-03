import { useState } from 'react';
import { MainLayout } from 'src/layouts';
import { FeedbackSection } from './components/FeedbackSection';

interface TutorProfile {
  fullName: string;
  faculty: string;
  email: string;
  tutorNo: string;
  major: string;
  hometown: string;
  country: string;
}

const dummyProfile: TutorProfile = {
  fullName: 'Phat Le Tran Tan',
  faculty: 'Faculty of Computer Science and Engineering',
  email: 'nhan.nguyenxxx04@hcmut.edu.vn',
  tutorNo: '2212370',
  major: 'Cyber Security',
  hometown: 'An Giang Province',
  country: 'Vietnam',
};

export const ProfileTutorPage = () => {
  const [profile, setProfile] = useState(dummyProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(dummyProfile);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({...profile});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const fakeSaveToBackend = (data: TutorProfile) => {
    return new Promise<{ success: boolean }>((resolve) => {
      setTimeout(() => resolve({ success: true }), 700);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fakeSaveToBackend(formData);
      if (res.success) {
        setProfile(formData);
        setIsEditing(false);
      } else {
        console.error('Save failed');
      }
    } catch (err) {
      console.error('Save error', err);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-8">
        <div className="bg-white rounded-xl border border-gray-300 shadow p-8 relative text-black">
          {/* Edit button top-right */}
          <div className="absolute top-6 right-6">
            {!isEditing && (
              <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">
                Edit
              </button>
            )}
          </div>

          <div className="flex items-center mb-6">
            <div className="w-32 h-32 bg-gray-200 rounded-full mr-6 flex-shrink-0" />
            <div className="flex-1">
              <div>
                <h2 className="text-4xl font-bold text-left text-black">{profile.fullName}</h2>
                <p className="text-gray-600 mt-2 text-left">{profile.faculty}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center mt-8">
              <div className="border rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">User details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-500">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      className={`mt-1 block w-full rounded-md border-gray-300 ${!isEditing ? 'bg-gray-100' : ''}`}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">Tutor No.</label>
                    <input 
                      type="text" 
                      name="tutorNo" 
                      value={formData.tutorNo} 
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 ${!isEditing ? 'bg-gray-100' : ''}`}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">Major</label>
                    <input 
                      type="text" 
                      name="major" 
                      value={formData.major} 
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 ${!isEditing ? 'bg-gray-100' : ''}`}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">Hometown</label>
                    <input 
                      type="text" 
                      name="hometown" 
                      value={formData.hometown} 
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 ${!isEditing ? 'bg-gray-100' : ''}`}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">Country</label>
                    <input 
                      type="text" 
                      name="country" 
                      value={formData.country} 
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 ${!isEditing ? 'bg-gray-100' : ''}`}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                {isEditing && (
                  <div className="flex justify-end gap-4 mt-6">
                    <button 
                      type="button" 
                      onClick={() => { 
                        setIsEditing(false); 
                        setFormData({...profile}); 
                      }} 
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
          
          {/* Assessment section */}
          <div className="flex justify-center mt-8">
            <FeedbackSection />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}