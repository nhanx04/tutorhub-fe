import React, { useMemo, useState } from 'react'
import { MainLayout } from 'src/layouts'
import type { ConsultationModePreference, StudentProfile } from 'src/types'
import { mockStudentProfile } from './mockdata/profile'
import { ConfirmDialog } from 'src/components'

type StatusBanner = {
  type: 'success' | 'info' | 'error'
  message: string
}

type ProfileFormState = {
  email: string
  phone: string
  location: string
  linkedin: string
  bio: string
  goals: string
  supportNeeds: string
  expertise: string
  achievements: string
  languages: string
  availability: string
  preferredMode: ConsultationModePreference
  emergencyName: string
  emergencyRelation: string
  emergencyPhone: string
}

const createFormStateFromProfile = (profile: StudentProfile): ProfileFormState => ({
  email: profile.email,
  phone: profile.phone,
  location: profile.location,
  linkedin: profile.linkedin ?? '',
  bio: profile.bio,
  goals: profile.goals,
  supportNeeds: profile.supportNeeds,
  expertise: profile.expertiseTags.join(', '),
  achievements: profile.achievements.join('\n'),
  languages: profile.languages.join(', '),
  availability: profile.availability.join('\n'),
  preferredMode: profile.preferredConsultationMode,
  emergencyName: profile.emergencyContact?.name ?? '',
  emergencyRelation: profile.emergencyContact?.relation ?? '',
  emergencyPhone: profile.emergencyContact?.phone ?? ''
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[0-9+()\s-]{8,20}$/

const splitByComma = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

const splitByLine = (value: string) =>
  value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile>(mockStudentProfile)
  const [formState, setFormState] = useState<ProfileFormState>(createFormStateFromProfile(mockStudentProfile))
  const [isEditing, setIsEditing] = useState(false)
  const [banner, setBanner] = useState<StatusBanner | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormState, string>>>({})
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString())

  const expertiseTags = useMemo(() => profile.expertiseTags, [profile.expertiseTags])

  const handleStartEdit = () => {
    setIsEditing(true)
    setBanner(null)
    setErrors({})
    setFormState(createFormStateFromProfile(profile))
  }

  const handleChange = (field: keyof ProfileFormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const validateForm = (state: ProfileFormState) => {
    const nextErrors: Partial<Record<keyof ProfileFormState, string>> = {}

    if (!emailRegex.test(state.email.trim())) {
      nextErrors.email = 'Vui lòng nhập email hợp lệ.'
    }

    if (!phoneRegex.test(state.phone.trim())) {
      nextErrors.phone = 'Số điện thoại nên có từ 8-20 ký tự và có thể chứa +, -, khoảng trắng.'
    }

    if (state.linkedin && !state.linkedin.startsWith('http')) {
      nextErrors.linkedin = 'Liên kết LinkedIn nên bắt đầu bằng http hoặc https.'
    }

    if (state.bio.trim().length < 20) {
      nextErrors.bio = 'Giới thiệu cần ít nhất 20 ký tự.'
    }

    if (state.bio.trim().length > 700) {
      nextErrors.bio = 'Giới thiệu nên ngắn gọn dưới 700 ký tự.'
    }

    if (state.supportNeeds.trim().length > 600) {
      nextErrors.supportNeeds = 'Nhu cầu hỗ trợ nên dưới 600 ký tự.'
    }

    if (state.emergencyPhone && !phoneRegex.test(state.emergencyPhone.trim())) {
      nextErrors.emergencyPhone = 'Số điện thoại người liên hệ khẩn cấp chưa hợp lệ.'
    }

    return nextErrors
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validateForm(formState)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setBanner({
        type: 'error',
        message: 'Không thể lưu hồ sơ. Vui lòng kiểm tra lại các trường được đánh dấu.'
      })
      return
    }

    const expertiseTags = splitByComma(formState.expertise)
    const achievements = splitByLine(formState.achievements)
    const languages = splitByComma(formState.languages)
    const availability = splitByLine(formState.availability)

    const emergencyContact =
      formState.emergencyName || formState.emergencyRelation || formState.emergencyPhone
        ? {
            name: formState.emergencyName.trim(),
            relation: formState.emergencyRelation.trim(),
            phone: formState.emergencyPhone.trim()
          }
        : undefined

    const updatedProfile: StudentProfile = {
      ...profile,
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      location: formState.location.trim(),
      linkedin: formState.linkedin.trim() || undefined,
      bio: formState.bio.trim(),
      goals: formState.goals.trim(),
      supportNeeds: formState.supportNeeds.trim(),
      expertiseTags,
      achievements,
      languages,
      availability,
      preferredConsultationMode: formState.preferredMode,
      emergencyContact
    }

    setProfile(updatedProfile)
    setIsEditing(false)
    setErrors({})
    setBanner({
      type: 'success',
      message: 'Hồ sơ đã được cập nhật thành công và đang chờ đồng bộ với các dịch vụ liên quan.'
    })
    setLastUpdated(new Date().toISOString())
  }

  const handleCancel = () => {
    if (
      JSON.stringify(formState) === JSON.stringify(createFormStateFromProfile(profile))
    ) {
      setIsEditing(false)
      return
    }

    setShowCancelDialog(true)
  }

  const confirmDiscardChanges = () => {
    setIsEditing(false)
    setErrors({})
    setBanner({
      type: 'info',
      message: 'Các thay đổi đã được hủy.'
    })
    setFormState(createFormStateFromProfile(profile))
    setShowCancelDialog(false)
  }

  const emergencyContact = profile.emergencyContact

  return (
    <MainLayout>
      <div className='space-y-6 p-6'>
        {banner && (
          <div
            className={`rounded-md border px-4 py-3 text-sm ${
              banner.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-800'
                : banner.type === 'info'
                  ? 'border-blue-200 bg-blue-50 text-blue-800'
                  : 'border-red-200 bg-red-50 text-red-800'
            }`}
          >
            {banner.message}
          </div>
        )}

        <section className='flex flex-col gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center'>
          <img
            src={profile.avatarUrl}
            alt={profile.fullName}
            className='h-32 w-32 rounded-full border border-gray-200 object-cover shadow-sm'
          />
          <div className='flex-1'>
            <div className='flex flex-col justify-between gap-4 md:flex-row md:items-start'>
              <div>
                <h1 className='text-2xl font-semibold text-gray-900'>{profile.fullName}</h1>
                <p className='text-gray-600'>
                  {profile.studentId} • {profile.major}
                </p>
                <p className='text-gray-500'>{profile.faculty}</p>
                <p className='text-sm text-gray-500'>Trạng thái: {profile.year}</p>
              </div>
              <div className='flex flex-col items-start gap-2 md:items-end'>
                <button
                  onClick={isEditing ? handleCancel : handleStartEdit}
                  className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
                    isEditing
                      ? 'border-red-500 text-red-600 hover:bg-red-50'
                      : 'border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  {isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa hồ sơ'}
                </button>
                <p className='text-xs text-gray-400'>
                  Cập nhật lần cuối: {new Date(lastUpdated).toLocaleString()}
                </p>
              </div>
            </div>
            {expertiseTags.length > 0 && (
              <div className='mt-4 flex flex-wrap gap-2'>
                {expertiseTags.map((tag) => (
                  <span key={tag} className='rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700'>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {isEditing ? (
          <form className='space-y-6' onSubmit={handleSubmit}>
            <SectionCard title='Thông tin liên hệ & ưu tiên lịch hẹn'>
              <div className='grid gap-4 md:grid-cols-2'>
                <FormField
                  label='Email'
                  value={formState.email}
                  onChange={handleChange('email')}
                  error={errors.email}
                  type='email'
                  required
                />
                <FormField
                  label='Số điện thoại'
                  value={formState.phone}
                  onChange={handleChange('phone')}
                  error={errors.phone}
                  required
                />
                <FormField
                  label='Địa chỉ'
                  value={formState.location}
                  onChange={handleChange('location')}
                  required
                />
                <FormField
                  label='LinkedIn'
                  value={formState.linkedin}
                  onChange={handleChange('linkedin')}
                  error={errors.linkedin}
                  placeholder='https://linkedin.com/in/'
                />
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <SelectField
                  label='Hình thức tư vấn ưu tiên'
                  value={formState.preferredMode}
                  onChange={handleChange('preferredMode')}
                  options={[
                    { value: 'Onsite', label: 'Onsite' },
                    { value: 'Online', label: 'Online' },
                    { value: 'Hybrid', label: 'Hybrid' }
                  ]}
                />
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <FormField
                  label='Người liên hệ khẩn cấp'
                  value={formState.emergencyName}
                  onChange={handleChange('emergencyName')}
                />
                <FormField
                  label='Mối quan hệ'
                  value={formState.emergencyRelation}
                  onChange={handleChange('emergencyRelation')}
                />
                <FormField
                  label='Số điện thoại khẩn cấp'
                  value={formState.emergencyPhone}
                  onChange={handleChange('emergencyPhone')}
                  error={errors.emergencyPhone}
                />
              </div>
            </SectionCard>

            <SectionCard title='Giới thiệu & mục tiêu'>
              <FormTextArea
                label='Giới thiệu bản thân'
                value={formState.bio}
                onChange={handleChange('bio')}
                error={errors.bio}
                rows={4}
                required
              />
              <FormTextArea label='Mục tiêu học tập' value={formState.goals} onChange={handleChange('goals')} rows={3} />
              <FormTextArea
                label='Nhu cầu hỗ trợ'
                value={formState.supportNeeds}
                onChange={handleChange('supportNeeds')}
                error={errors.supportNeeds}
                rows={3}
              />
            </SectionCard>

            <SectionCard title='Chuyên môn & thành tích'>
              <FormField
                label='Lĩnh vực quan tâm (phân tách bằng dấu phẩy)'
                value={formState.expertise}
                onChange={handleChange('expertise')}
                placeholder='Business Intelligence, Data Visualization'
              />
              <FormTextArea
                label='Thành tích (mỗi dòng một thành tích)'
                value={formState.achievements}
                onChange={handleChange('achievements')}
                rows={4}
              />
              <FormField
                label='Ngôn ngữ (phân tách bằng dấu phẩy)'
                value={formState.languages}
                onChange={handleChange('languages')}
                placeholder='Vietnamese, English (IELTS 7.5)'
              />
            </SectionCard>

            <SectionCard title='Thời gian rảnh'>
              <FormTextArea
                label='Khung giờ có thể tham gia (mỗi dòng một khung giờ)'
                value={formState.availability}
                onChange={handleChange('availability')}
                rows={4}
                placeholder='Tuesday 14:00 - 17:00'
              />
            </SectionCard>

            <div className='flex justify-end gap-4'>
              <button
                type='button'
                onClick={handleCancel}
                className='rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100'
              >
                Hủy
              </button>
              <button
                type='submit'
                className='rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700'
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        ) : (
          <div className='space-y-6'>
            <SectionCard title='Thông tin liên hệ'>
              <InfoRow label='Email' value={profile.email} />
              <InfoRow label='Số điện thoại' value={profile.phone} />
              <InfoRow label='Địa chỉ' value={profile.location} />
              <InfoRow
                label='LinkedIn'
                value={
                  profile.linkedin ? (
                    <a href={profile.linkedin} className='text-indigo-600 hover:underline' target='_blank' rel='noreferrer'>
                      {profile.linkedin}
                    </a>
                  ) : (
                    '—'
                  )
                }
              />
              <InfoRow label='Hình thức tư vấn ưu tiên' value={profile.preferredConsultationMode} />
              {emergencyContact && (
                <div className='rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900'>
                  <p className='font-semibold'>Liên hệ khẩn cấp</p>
                  <p>
                    {emergencyContact.name} ({emergencyContact.relation}) • {emergencyContact.phone}
                  </p>
                </div>
              )}
            </SectionCard>

            <SectionCard title='Giới thiệu & mục tiêu'>
              <Paragraph label='Giới thiệu' value={profile.bio} />
              <Paragraph label='Mục tiêu học tập' value={profile.goals} />
              <Paragraph label='Nhu cầu hỗ trợ' value={profile.supportNeeds} />
            </SectionCard>

            <SectionCard title='Chuyên môn & kỹ năng'>
              <TagGroup tags={profile.expertiseTags} emptyLabel='Chưa cập nhật lĩnh vực quan tâm.' />
              <Divider />
              <ListGroup title='Thành tích nổi bật' items={profile.achievements} emptyLabel='Chưa có thành tích.' />
              <Divider />
              <TagGroup tags={profile.languages} label='Ngôn ngữ' emptyLabel='Chưa cập nhật ngôn ngữ.' />
            </SectionCard>

            <SectionCard title='Thời gian khả dụng'>
              <ListGroup items={profile.availability} emptyLabel='Chưa cập nhật lịch rảnh.' />
            </SectionCard>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={confirmDiscardChanges}
        title='Hủy thay đổi'
      >
        Bạn muốn hủy các thay đổi vừa thực hiện? Dữ liệu sẽ quay lại trạng thái đã lưu trước đó.
      </ConfirmDialog>
    </MainLayout>
  )
}

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
    <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
    <div className='mt-4 space-y-4 text-sm text-gray-700'>{children}</div>
  </section>
)

const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className='flex flex-col gap-1 md:flex-row md:items-center md:justify-between'>
    <span className='font-medium text-gray-600'>{label}</span>
    <span className='text-gray-800 md:text-right'>{value || '—'}</span>
  </div>
)

const Paragraph: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className='font-medium text-gray-600'>{label}</p>
    <p className='mt-1 whitespace-pre-line text-gray-800'>{value || '—'}</p>
  </div>
)

const TagGroup: React.FC<{ tags: string[]; label?: string; emptyLabel: string }> = ({ tags, label, emptyLabel }) => {
  if (!tags || tags.length === 0) {
    return <p className='text-gray-500'>{emptyLabel}</p>
  }

  return (
    <div className='flex flex-col gap-2'>
      {label && <p className='font-medium text-gray-600'>{label}</p>}
      <div className='flex flex-wrap gap-2'>
        {tags.map((tag) => (
          <span key={tag} className='rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700'>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

const ListGroup: React.FC<{ title?: string; items: string[]; emptyLabel: string }> = ({ title, items, emptyLabel }) => {
  if (!items || items.length === 0) {
    return <p className='text-gray-500'>{emptyLabel}</p>
  }

  return (
    <div>
      {title && <p className='font-medium text-gray-600'>{title}</p>}
      <ul className='mt-2 list-disc space-y-1 pl-5 text-gray-800'>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const Divider = () => <div className='border-t border-gray-200' />

interface FormFieldProps {
  label: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  type?: string
  placeholder?: string
  error?: string
  required?: boolean
}

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, type = 'text', placeholder, error, required }) => (
  <label className='flex flex-col gap-1 text-sm text-gray-700'>
    <span className='font-medium'>
      {label}
      {required && <span className='text-red-500'> *</span>}
    </span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`rounded-md border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
        error ? 'border-red-400' : 'border-gray-300'
      }`}
      required={required}
    />
    {error && <span className='text-xs text-red-500'>{error}</span>}
  </label>
)

const FormTextArea: React.FC<FormFieldProps & { rows?: number }> = ({ label, value, onChange, placeholder, error, rows = 3, required }) => (
  <label className='flex flex-col gap-1 text-sm text-gray-700'>
    <span className='font-medium'>
      {label}
      {required && <span className='text-red-500'> *</span>}
    </span>
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className={`rounded-md border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
        error ? 'border-red-400' : 'border-gray-300'
      }`}
    />
    {error && <span className='text-xs text-red-500'>{error}</span>}
  </label>
)

const SelectField: React.FC<{
  label: string
  value: ConsultationModePreference
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  options: Array<{ value: ConsultationModePreference; label: string }>
}> = ({ label, value, onChange, options }) => (
  <label className='flex flex-col gap-1 text-sm text-gray-700'>
    <span className='font-medium'>{label}</span>
    <select
      value={value}
      onChange={onChange}
      className='rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500'
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
)

export default ProfilePage
