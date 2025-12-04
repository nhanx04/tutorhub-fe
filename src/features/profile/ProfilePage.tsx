import { MainLayout } from 'src/layouts'
import { useProfile } from './useProfile'

export const ProfilePage = () => {
  const { profile, isEditing, formData, loading, error, handleEdit, handleCancel, handleChange, handleSubmit } =
    useProfile()

  if (loading) {
    return (
      <MainLayout>
        <div>Loading...</div>
      </MainLayout>
    )
  }

  if (error) {
    return (
      <MainLayout>
        <div>Error: {error}</div>
      </MainLayout>
    )
  }

  if (!profile) {
    return (
      <MainLayout>
        <div>No profile data found.</div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className='max-w-5xl mx-auto py-8 px-4'>
        {/* Header Section */}
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center'>
            <div className='w-24 h-24 bg-gray-200 rounded-full mr-6 flex-shrink-0' />
            <div className='flex-1'>
              <h2 className='text-3xl font-bold text-black'>{profile.userName}</h2>
              <p className='text-gray-600 mt-1'>{profile.faculty?.name || 'No faculty assigned'}</p>
              <p className='text-gray-600 capitalize'>{profile.role}</p>
            </div>
          </div>
          {!isEditing && (
            <button onClick={handleEdit} className='bg-blue-600 text-white px-6 py-2 rounded font-semibold'>
              Edit
            </button>
          )}
        </div>

        {/* Details Section */}
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* User Details Card */}
            <div className='bg-white rounded-lg border border-gray-200 p-6 shadow-sm'>
              <h3 className='text-xl font-semibold mb-4'>User details</h3>
              <div className='space-y-4'>
                <InfoRow label='Email' value={profile.email} />
                <InfoRow label='Student No.' value={String(profile.uid)} />
                <InfoRow label='Hometown' value='Ho Chi Minh City' />
                <InfoRow label='Country' value='Vietnam' />
              </div>
            </div>

            {/* Other Details Card */}
            <div className='bg-white rounded-lg border border-gray-200 p-6 shadow-sm'>
              <h3 className='text-xl font-semibold mb-4'>Other details</h3>
              <div className='space-y-4'>
                <EditableRow
                  label='Address'
                  name='address'
                  value={formData.address || ''}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
                <EditableRow
                  label='Phone number'
                  name='phoneNumber'
                  value={formData.phoneNumber || ''}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
                <EditableRow
                  label='Personal Email'
                  name='personalEmail'
                  type='email'
                  value={formData.personalEmail || ''}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className='flex justify-end gap-4 mt-8'>
              <button
                type='button'
                onClick={handleCancel}
                className='bg-gray-200 text-gray-800 px-6 py-2 rounded font-semibold'
              >
                Cancel
              </button>
              <button type='submit' className='bg-blue-600 text-white px-6 py-2 rounded font-semibold'>
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </MainLayout>
  )
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className='text-sm text-gray-500'>{label}</p>
    <p className='text-gray-800 font-medium'>{value}</p>
  </div>
)

const EditableRow = ({
  label,
  name,
  value,
  isEditing,
  onChange,
  type = 'text'
}: {
  label: string
  name: string
  value: string
  isEditing: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}) => (
  <div>
    <label className='block text-sm text-gray-500'>{label}</label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
      />
    ) : (
      <p className='text-gray-800 font-medium'>{value || '-'}</p>
    )}
  </div>
)
