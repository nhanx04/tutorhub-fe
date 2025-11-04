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
  const [profile, setProfile] = useState<TutorProfile>(dummyProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<TutorProfile>(dummyProfile);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({ ...profile });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value } as TutorProfile));
  };

  const fakeSaveToBackend = (data: TutorProfile) => {
    return new Promise<{ success: boolean }>(resolve => setTimeout(() => resolve({ success: true }), 500));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fakeSaveToBackend(formData);
      if (res.success) {
        setProfile(formData);
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-8">
        <div className="bg-white rounded-xl border border-gray-300 shadow p-8 relative text-black">
          <div className="absolute top-6 right-6">
            {!isEditing && (
              <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">Edit</button>
            )}
          </div>

          <div className="flex items-center mb-6">
            <div className="w-32 h-32 bg-gray-200 rounded-full mr-6 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-left">{profile.fullName}</h2>
              <p className="text-gray-600 mt-2 text-left">{profile.faculty}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                {/* Left: User details */}
                <div className="border rounded-lg p-6 max-w-sm w-full">
                  <h3 className="text-lg font-semibold mb-4">User details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-500">Email</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md border-gray-300 ${!isEditing ? 'bg-gray-100' : ''}`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500">Tutor No.</label>
                      <input
                        name="tutorNo"
                        type="text"
                        value={formData.tutorNo}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md border-gray-300 ${!isEditing ? 'bg-gray-100' : ''}`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500">Major</label>
                      <input
                        name="major"
                        type="text"
                        value={formData.major}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md border-gray-300 ${!isEditing ? 'bg-gray-100' : ''}`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500">Hometown</label>
                      <input
                        name="hometown"
                        type="text"
                        value={formData.hometown}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md border-gray-300 ${!isEditing ? 'bg-gray-100' : ''}`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500">Country</label>
                      <input
                        name="country"
                        type="text"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md border-gray-300 ${!isEditing ? 'bg-gray-100' : ''}`}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
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

                {/* Right: Assessment / Feedback */}
                <div className="flex justify-center">
                  <FeedbackSection />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};
