import React, { useState } from 'react'
import { MainLayout } from 'src/layouts'
import type { StudentProfile } from 'src/types'
import { mockStudentProfile } from './mockdata/profile'
import { ConfirmDialog } from 'src/components'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[0-9+()\s-]{8,20}$/

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile>(mockStudentProfile)
  const [formState, setFormState] = useState<StudentProfile>(mockStudentProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [banner, setBanner] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof StudentProfile, string>>>({})
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const handleChange = (field: keyof StudentProfile) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleStartEdit = () => {
    setIsEditing(true)
    setBanner(null)
    setErrors({})
    setFormState(profile)
  }

  const validate = (state: StudentProfile) => {
    const nextErrors: Partial<Record<keyof StudentProfile, string>> = {}
    if (!emailRegex.test(state.universityEmail.trim())) {
      nextErrors.universityEmail = 'Please provide a valid university email.'
    }
    if (!emailRegex.test(state.personalEmail.trim())) {
      nextErrors.personalEmail = 'Please provide a valid personal email.'
    }
    if (!phoneRegex.test(state.phoneNumber.trim())) {
      nextErrors.phoneNumber = 'Phone numbers should contain 8-20 digits and may include +, -, spaces.'
    }
    if (!state.address.trim()) {
      nextErrors.address = 'Address cannot be empty.'
    }
    if (!state.hometown.trim()) {
      nextErrors.hometown = 'Hometown cannot be empty.'
    }
    if (!state.country.trim()) {
      nextErrors.country = 'Country cannot be empty.'
    }
    return nextErrors
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validation = validate(formState)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      setBanner({ type: 'error', message: 'Please review the highlighted fields.' })
      return
    }
    setProfile(formState)
    setIsEditing(false)
    setErrors({})
    setBanner({ type: 'success', message: 'Profile information updated successfully.' })
  }

  const handleCancel = () => {
    if (JSON.stringify(formState) === JSON.stringify(profile)) {
      setIsEditing(false)
      return
    }
    setShowCancelDialog(true)
  }

  const confirmDiscard = () => {
    setShowCancelDialog(false)
    setIsEditing(false)
    setFormState(profile)
    setBanner({ type: 'info', message: 'Changes have been discarded.' })
    setErrors({})
  }

  const alertClass =
    banner?.type === 'success'
      ? 'border-green-200 bg-green-50 text-green-800'
      : banner?.type === 'info'
        ? 'border-blue-200 bg-blue-50 text-blue-800'
        : 'border-red-200 bg-red-50 text-red-800'

  const editButtonClass = isEditing
    ? 'border-red-500 text-red-600 hover:bg-red-50'
    : 'border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white'

  return (
    <MainLayout>
      <div className='space-y-6 p-6'>
        {banner && <div className={'rounded-md border px-4 py-3 text-sm ' + alertClass}>{banner.message}</div>}

        <section className='flex flex-col gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center'>
          <img
            src={profile.avatarUrl ?? 'https://placehold.co/160x160'}
            alt={profile.fullName}
            className='h-32 w-32 rounded-full border border-gray-200 object-cover shadow-sm'
          />
          <div className='flex-1'>
            <div className='flex flex-col justify-between gap-4 md:flex-row md:items-start'>
              <div>
                <h1 className='text-2xl font-semibold text-gray-900'>{profile.fullName}</h1>
                <p className='text-gray-600'>Student ID: {profile.studentId}</p>
              </div>
              <button
                onClick={isEditing ? handleCancel : handleStartEdit}
                className={'rounded-md border px-4 py-2 text-sm font-semibold transition ' + editButtonClass}
              >
                {isEditing ? 'Cancel edit' : 'Edit profile'}
              </button>
            </div>
          </div>
        </section>

        {isEditing ? (
          <form onSubmit={handleSubmit} className='space-y-6'>
            <section className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
              <h2 className='text-lg font-semibold text-gray-800'>Contact information</h2>
              <div className='mt-4 grid gap-4 md:grid-cols-2'>
                <FormField
                  label='University email'
                  value={formState.universityEmail}
                  onChange={handleChange('universityEmail')}
                  error={errors.universityEmail}
                  required
                  type='email'
                />
                <FormField
                  label='Personal email'
                  value={formState.personalEmail}
                  onChange={handleChange('personalEmail')}
                  error={errors.personalEmail}
                  required
                  type='email'
                />
                <FormField
                  label='Phone number'
                  value={formState.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                  error={errors.phoneNumber}
                  required
                />
                <ReadOnlyField label='Student ID' value={profile.studentId} />
              </div>
            </section>

            <section className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
              <h2 className='text-lg font-semibold text-gray-800'>Location</h2>
              <div className='mt-4 grid gap-4 md:grid-cols-2'>
                <FormField
                  label='Address'
                  value={formState.address}
                  onChange={handleChange('address')}
                  error={errors.address}
                  required
                />
                <FormField
                  label='Hometown'
                  value={formState.hometown}
                  onChange={handleChange('hometown')}
                  error={errors.hometown}
                  required
                />
                <FormField
                  label='Country'
                  value={formState.country}
                  onChange={handleChange('country')}
                  error={errors.country}
                  required
                />
              </div>
            </section>

            <div className='flex justify-end gap-4'>
              <button
                type='button'
                onClick={handleCancel}
                className='rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700'
              >
                Save changes
              </button>
            </div>
          </form>
        ) : (
          <section className='grid gap-6 md:grid-cols-2'>
            <InfoCard title='University email' value={profile.universityEmail} />
            <InfoCard title='Personal email' value={profile.personalEmail} />
            <InfoCard title='Phone number' value={profile.phoneNumber} />
            <InfoCard title='Student ID' value={profile.studentId} />
            <InfoCard title='Address' value={profile.address} />
            <InfoCard title='Hometown' value={profile.hometown} />
            <InfoCard title='Country' value={profile.country} />
          </section>
        )}
      </div>

      <ConfirmDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={confirmDiscard}
        title='Discard changes'
      >
        Are you sure you want to discard your edits? Saved information will remain unchanged.
      </ConfirmDialog>
    </MainLayout>
  )
}

interface FormFieldProps {
  label: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  error?: string
  required?: boolean
  type?: string
}

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, error, required, type = 'text' }) => {
  const borderClass = error ? 'border-red-400' : 'border-gray-300'
  return (
    <label className='flex flex-col gap-2 text-sm text-gray-700'>
      <span className='font-medium'>
        {label}
        {required && <span className='text-red-500'> *</span>}
      </span>
      <input
        className={'rounded-md border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 ' + borderClass}
        value={value}
        onChange={onChange}
        required={required}
        type={type}
      />
      {error && <span className='text-xs text-red-500'>{error}</span>}
    </label>
  )
}

const ReadOnlyField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <label className='flex flex-col gap-2 text-sm text-gray-700'>
    <span className='font-medium'>{label}</span>
    <input value={value} readOnly className='rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-gray-600' />
  </label>
)

const InfoCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
    <p className='text-sm font-medium text-gray-600'>{title}</p>
    <p className='mt-2 text-gray-900'>{value || '-'}</p>
  </div>
)

export default ProfilePage
