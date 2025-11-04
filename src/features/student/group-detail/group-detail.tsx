import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FaExternalLinkAlt, FaStar } from 'react-icons/fa'

import { MainLayout } from 'src/layouts'
import ReusableTable from 'src/components/Table'
import { groupDetail } from './mockdata/mock-group-infor'
import { sampleData } from './mockdata/mock-table-data'
import { GroupInformation } from './components'
import type { ConsultationSession } from 'src/types'
import { ConfirmDialog } from 'src/components'

type ConfirmationState = {
  mode: 'register' | 'cancel'
  session: ConsultationSession | null
}

type FeedbackState = {
  session: ConsultationSession
  rating: number
  comment: string
}

export const ConsultationSessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<ConsultationSession[]>(sampleData)
  const [confirmation, setConfirmation] = useState<ConfirmationState>({ mode: 'register', session: null })
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false)
  const [hasJoinedGroup, setHasJoinedGroup] = useState(() => sampleData.some((session) => session.isRegistered))
  const [feedbackState, setFeedbackState] = useState<FeedbackState | null>(null)
  const [feedbackError, setFeedbackError] = useState<string | null>(null)

  useEffect(() => {
    if (!banner) {
      return
    }
    const timer = setTimeout(() => setBanner(null), 4000)
    return () => clearTimeout(timer)
  }, [banner])

  const openRegister = useCallback((session: ConsultationSession) => {
    setConfirmation({ mode: 'register', session })
  }, [])

  const openCancel = useCallback((session: ConsultationSession) => {
    setConfirmation({ mode: 'cancel', session })
  }, [])

  const openFeedback = useCallback((session: ConsultationSession) => {
    setFeedbackError(null)
    setFeedbackState({
      session,
      rating: session.feedback?.rating ?? 0,
      comment: session.feedback?.comment ?? ''
    })
  }, [])

  const closeConfirmation = useCallback(() => {
    setConfirmation((prev) => ({ ...prev, session: null }))
  }, [])

  const closeFeedback = useCallback(() => {
    setFeedbackState(null)
    setFeedbackError(null)
  }, [])

  const openGroupSelection = useCallback(() => {
    if (hasJoinedGroup) {
      return
    }
    setIsGroupDialogOpen(true)
  }, [hasJoinedGroup])

  const closeGroupSelection = useCallback(() => {
    setIsGroupDialogOpen(false)
  }, [])

  const updateFeedbackState = useCallback((updates: Partial<{ rating: number; comment: string }>) => {
    setFeedbackState((prev) => (prev ? { ...prev, ...updates } : prev))
  }, [])

  const handleConfirmAction = useCallback(() => {
    if (!confirmation.session) {
      return
    }

    const currentSession = sessions.find((item) => item.id === confirmation.session?.id)
    if (!currentSession) {
      closeConfirmation()
      return
    }

    if (confirmation.mode === 'register') {
      if (currentSession.capacity.registered >= currentSession.capacity.total) {
        setBanner({
          type: 'error',
          message: 'This consultation is already full. Please choose another slot.'
        })
        closeConfirmation()
        return
      }

      setSessions((prev) =>
        prev.map((item) =>
          item.id === currentSession.id
            ? {
                ...item,
                capacity: { ...item.capacity, registered: item.capacity.registered + 1 },
                status: 'Registered',
                isRegistered: true
              }
            : item
        )
      )
      setBanner({
        type: 'success',
        message: `You registered for ${currentSession.conId}. A confirmation email will be sent to you and the tutor.`
      })
    } else {
      const deadline = currentSession.cancellationDeadline ? new Date(currentSession.cancellationDeadline) : null
      if (deadline && deadline <= new Date()) {
        setBanner({
          type: 'error',
          message: 'The cancellation window has closed for this consultation.'
        })
        closeConfirmation()
        return
      }

      setSessions((prev) =>
        prev.map((item) => {
          if (item.id !== currentSession.id) {
            return item
          }
          const nextRegistered = Math.max(item.capacity.registered - 1, 0)
          const nextStatus =
            item.status === 'Completed' ? 'Completed' : nextRegistered >= item.capacity.total ? 'Full' : 'Allow Register'

          return {
            ...item,
            capacity: { ...item.capacity, registered: nextRegistered },
            status: nextStatus,
            isRegistered: false
          }
        })
      )
      setBanner({
        type: 'success',
        message: `You cancelled your reservation for ${currentSession.conId}.`
      })
    }

    closeConfirmation()
  }, [closeConfirmation, confirmation, sessions])

  const handleConfirmGroupSelection = useCallback(() => {
    setHasJoinedGroup(true)
    setBanner({
      type: 'success',
      message: 'You joined this tutoring group. Related services will receive your registration shortly.'
    })
    setIsGroupDialogOpen(false)
  }, [])

  const handleSubmitFeedback = useCallback(() => {
    if (!feedbackState) {
      return
    }

    if (feedbackState.rating === 0) {
      setFeedbackError('Please select a rating before submitting.')
      return
    }

    setSessions((prev) =>
      prev.map((item) =>
        item.id === feedbackState.session.id
          ? {
              ...item,
              feedback: {
                rating: feedbackState.rating,
                comment: feedbackState.comment.trim()
              }
            }
          : item
      )
    )

    setBanner({
      type: 'success',
      message: 'Thank you for sharing your feedback with the tutor.'
    })
    setFeedbackState(null)
    setFeedbackError(null)
  }, [feedbackState])

  const columns = useMemo(
    () => [
      {
        header: 'Con. ID',
        accessor: 'conId' as keyof ConsultationSession,
        width: '8%'
      },
      {
        header: 'General Details',
        accessor: 'generalDetails' as keyof ConsultationSession,
        width: '32%',
        render: (row: ConsultationSession) => (
          <div>
            <p className='font-semibold text-gray-800'>{row.generalDetails.title}</p>
            <p className='mt-1 text-sm text-gray-600'>{row.generalDetails.description}</p>
            <ul className='mt-2 space-y-1 text-sm'>
              {row.generalDetails.links.map((link) => (
                <li key={link}>
                  <a
                    href={link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 text-indigo-600 hover:underline'
                  >
                    Resource <FaExternalLinkAlt className='text-xs' />
                  </a>
                </li>
              ))}
            </ul>
            {row.feedback && (
              <div className='mt-3 rounded-md bg-green-50 p-3 text-xs text-green-700'>
                <p className='font-semibold'>Your feedback</p>
                <div className='mt-1 flex items-center gap-1 text-yellow-500'>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <FaStar
                      key={value}
                      className={value <= (row.feedback?.rating ?? 0) ? 'text-yellow-500' : 'text-gray-300'}
                    />
                  ))}
                </div>
                {row.feedback.comment && <p className='mt-2 text-green-800'>{row.feedback.comment}</p>}
              </div>
            )}
          </div>
        )
      },
      {
        header: 'Time & Location',
        accessor: 'timeAndLocation' as keyof ConsultationSession,
        width: '20%',
        render: (row: ConsultationSession) => (
          <div className='text-sm text-gray-700'>
            <p>{row.timeAndLocation.date}</p>
            <p>{row.timeAndLocation.time}</p>
            {row.timeAndLocation.location && <p>{row.timeAndLocation.location}</p>}
            {row.timeAndLocation.meetingLink && (
              <a
                href={row.timeAndLocation.meetingLink}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-2 inline-flex items-center gap-2 text-indigo-600 hover:underline'
              >
                Join online <FaExternalLinkAlt className='text-xs' />
              </a>
            )}
          </div>
        )
      },
      {
        header: 'Capacity',
        accessor: 'capacity' as keyof ConsultationSession,
        width: '12%',
        render: (row: ConsultationSession) => {
          const available = row.capacity.total - row.capacity.registered
          return (
            <div className='text-sm text-gray-700'>
              <p>
                {row.capacity.registered}/{row.capacity.total}
              </p>
              <p className='text-xs text-gray-500'>{available > 0 ? `${available} seats left` : 'No seats available'}</p>
            </div>
          )
        }
      },
      {
        header: 'Status',
        accessor: 'status' as keyof ConsultationSession,
        width: '12%',
        render: (row: ConsultationSession) => <StatusPill status={row.status} feedbackProvided={Boolean(row.feedback)} />
      },
      {
        header: 'Actions',
        accessor: 'id' as keyof ConsultationSession,
        width: '16%',
        render: (row: ConsultationSession) => (
          <ActionButtons session={row} onRegister={openRegister} onCancel={openCancel} onFeedback={openFeedback} />
        )
      }
    ],
    [openRegister, openCancel, openFeedback]
  )

  return (
    <MainLayout>
      <div className='space-y-6 p-6'>
        {banner && (
          <div
            className={`rounded-md border px-4 py-3 text-sm ${
              banner.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-800'
                : 'border-red-200 bg-red-50 text-red-800'
            }`}
          >
            {banner.message}
          </div>
        )}

        <section>
          <h1 className='rounded-t-lg bg-indigo-200 p-3 text-xl font-bold text-indigo-900'>Group Information</h1>
          <GroupInformation
            {...groupDetail}
            onSelectGroup={openGroupSelection}
            isGroupSelected={hasJoinedGroup}
          />
        </section>

        <section>
          <h2 className='rounded-t-lg bg-indigo-200 p-3 text-xl font-bold text-indigo-900'>Consultation Sessions</h2>
          <ReusableTable columns={columns} data={sessions} />
      </section>
    </div>

      <ConfirmDialog
        isOpen={isGroupDialogOpen}
        onClose={closeGroupSelection}
        onConfirm={handleConfirmGroupSelection}
        title='Confirm group selection'
      >
        <div className='space-y-2 text-sm text-gray-700'>
          <p>
            You are about to join <span className='font-semibold'>{groupDetail.title}</span> led by{' '}
            {groupDetail.tutor}.
          </p>
          <p>
            The system will store your registration, notify the tutoring office and sync with connected services.
            Continue?
          </p>
        </div>
      </ConfirmDialog>

      <ConfirmDialog
        isOpen={Boolean(confirmation.session)}
        onClose={closeConfirmation}
        onConfirm={handleConfirmAction}
        title={confirmation.mode === 'register' ? 'Confirm registration' : 'Confirm cancellation'}
      >
        {confirmation.session ? (
          <div className='space-y-2 text-sm text-gray-700'>
            <p className='font-semibold'>{confirmation.session.generalDetails.title}</p>
            <p>
              {confirmation.mode === 'register'
                ? `You will join this consultation on ${confirmation.session.timeAndLocation.date} at ${confirmation.session.timeAndLocation.time}.`
                : 'You are about to cancel your reserved seat. The slot will be released to other students.'}
            </p>
            {confirmation.mode === 'cancel' && confirmation.session.cancellationDeadline && (
              <p className='text-xs text-gray-500'>
                Cancellation allowed until {formatDateTime(confirmation.session.cancellationDeadline)}.
              </p>
            )}
            <p>Do you want to continue?</p>
          </div>
        ) : null}
      </ConfirmDialog>

      <FeedbackModal
        state={feedbackState}
        error={feedbackError}
        onClose={closeFeedback}
        onUpdate={updateFeedbackState}
        onSubmit={handleSubmitFeedback}
      />
    </MainLayout>
  )
}

function formatDateTime(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return iso
  }
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
}

const statusStyles: Record<ConsultationSession['status'], string> = {
  'Allow Register': 'bg-yellow-100 text-yellow-800',
  Registered: 'bg-indigo-100 text-indigo-800',
  Completed: 'bg-green-100 text-green-800',
  Full: 'bg-red-100 text-red-700'
}

const StatusPill: React.FC<{ status: ConsultationSession['status']; feedbackProvided: boolean }> = ({
  status,
  feedbackProvided
}) => {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
      {status}
      {status === 'Completed' && (
        <span className='ml-1 text-[10px] font-normal'>{feedbackProvided ? 'thanks!' : 'feedback pending'}</span>
      )}
    </span>
  )
}

interface ActionButtonsProps {
  session: ConsultationSession
  onRegister: (session: ConsultationSession) => void
  onCancel: (session: ConsultationSession) => void
  onFeedback: (session: ConsultationSession) => void
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ session, onRegister, onCancel, onFeedback }) => {
  const isFull = session.capacity.registered >= session.capacity.total
  const now = new Date()
  const deadline = session.cancellationDeadline ? new Date(session.cancellationDeadline) : null
  const canCancel = session.isRegistered && session.status !== 'Completed' && (!deadline || deadline > now)

  if (session.status === 'Completed') {
    if (session.feedback) {
      return <span className='text-xs text-green-700'>Feedback sent</span>
    }

    return (
      <button
        onClick={() => onFeedback(session)}
        className='w-full rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 cursor-pointer'
      >
        Add feedback
      </button>
    )
  }

  if (session.isRegistered) {
    return (
      <button
        onClick={() => canCancel && onCancel(session)}
        disabled={!canCancel}
        className={`w-full rounded-md px-3 py-2 text-xs font-semibold text-white transition ${
          canCancel ? 'bg-red-500 hover:bg-red-600 cursor-pointer' : 'cursor-not-allowed bg-gray-300 text-gray-500'
        }`}
      >
        Cancel
      </button>
    )
  }

  if (session.status === 'Allow Register') {
    return (
      <button
        onClick={() => onRegister(session)}
        disabled={isFull}
        className={`w-full rounded-md px-3 py-2 text-xs font-semibold text-white transition ${
          isFull ? 'cursor-not-allowed bg-gray-300 text-gray-500' : 'bg-green-600 hover:bg-green-700 cursor-pointer'
        }`}
      >
        {isFull ? 'Full' : 'Register'}
      </button>
    )
  }

  if (session.status === 'Full') {
    return <span className='text-xs text-gray-500'>Full</span>
  }

  return <span className='text-xs text-gray-500'>No actions</span>
}

interface FeedbackModalProps {
  state: FeedbackState | null
  error: string | null
  onClose: () => void
  onUpdate: (updates: Partial<{ rating: number; comment: string }>) => void
  onSubmit: () => void
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ state, error, onClose, onUpdate, onSubmit }) => {
  if (!state) {
    return null
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white/80 px-4 py-8'>
      <div className='w-full max-w-lg rounded-lg border border-gray-300 bg-white p-6 shadow-xl'>
        <h2 className='text-lg font-semibold text-gray-800'>Feedback for {state.session.generalDetails.title}</h2>
        <p className='mt-2 text-sm text-gray-600'>
          Share how helpful this consultation was. Your response is visible to the tutor and faculty staff.
        </p>
        <div className='mt-4 flex items-center gap-2'>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type='button'
              onClick={() => onUpdate({ rating: value })}
              className='cursor-pointer transition hover:scale-110'
            >
              <FaStar className={`text-2xl ${value <= state.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
            </button>
          ))}
        </div>
        <textarea
          className='mt-4 h-24 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
          placeholder='Add specific feedback for your tutor...'
          value={state.comment}
          onChange={(event) => onUpdate({ comment: event.target.value })}
        />
        {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
        <div className='mt-6 flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-100 cursor-pointer'
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className='rounded-md bg-indigo-600 px-4 py-2 text-sm text-white transition hover:bg-indigo-700 cursor-pointer'
          >
            Submit feedback
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConsultationSessionsPage
