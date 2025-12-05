import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FaExternalLinkAlt, FaStar } from 'react-icons/fa'

import { MainLayout } from 'src/layouts'
import ReusableTable from 'src/components/Table'
import { useLocation } from 'react-router-dom'
import { groupService } from 'src/services/groupService'
import { consultationService } from 'src/services/consultationService'
import { feedbackService } from 'src/services/feedbackService'
import { GroupInformation } from './components'
import type { ConsultationSession, Group, Consultation } from 'src/types'
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
  const location = useLocation()
  const groupId = location.state?.groupId

  const [group, setGroup] = useState<Group | null>(null)
  const [sessions, setSessions] = useState<ConsultationSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [confirmation, setConfirmation] = useState<ConfirmationState>({ mode: 'register', session: null })
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false)
  const [hasJoinedGroup, setHasJoinedGroup] = useState(false)
  const [feedbackState, setFeedbackState] = useState<FeedbackState | null>(null)
  const [feedbackError, setFeedbackError] = useState<string | null>(null)

  useEffect(() => {
    if (!groupId) {
      setError('Group ID not found. Please navigate from the dashboard or group explorer.')
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        const groupData = await groupService.getGroupById(groupId)
        setGroup(groupData)

        const consultationData: Consultation[] = await consultationService.getConsultationsByGroup(groupId)

        // TODO: The API should ideally indicate if the user has joined the group.
        // For now, we assume if they can see the details, they have joined.
        setHasJoinedGroup(true)

        const formattedSessions: ConsultationSession[] = consultationData.map((c) => ({
          id: c.id,
          conId: `C${c.id}`,
          generalDetails: {
            title: c.topic,
            description: c.description,
            links: [c.locationLink]
          },
          timeAndLocation: {
            time: c.consultationTime,
            date: c.consultationDate,
            location: c.type === 'OFFLINE' ? c.locationLink : undefined,
            meetingLink: c.type === 'ONLINE' ? c.locationLink : undefined
          },
          capacity: {
            registered: 0, // Placeholder - API does not provide this
            total: 1 // Placeholder - API does not provide this
          },
          status: (() => {
            if (c.status === 'CANCELED') return 'Canceled'
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const sessionDate = new Date(c.consultationDate)
            if (sessionDate < today) return 'Completed'
            // Assuming isRegistered will be handled by another mechanism
            return 'Allow Register'
          })(),
          isRegistered: false // Placeholder - API should provide this per user
        }))

        setSessions(formattedSessions)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch group details.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [groupId])

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

  const handleConfirmAction = useCallback(async () => {
    if (!confirmation.session) return

    const sessionId = confirmation.session.id
    const sessionConId = confirmation.session.conId

    try {
      if (confirmation.mode === 'register') {
        await consultationService.registerForConsultation(sessionId)
        setSessions((prev) =>
          prev.map((s) => (s.id === sessionId ? { ...s, isRegistered: true, status: 'Registered' } : s))
        )
        setBanner({ type: 'success', message: `Successfully registered for ${sessionConId}.` })
      } else {
        await consultationService.unregisterFromConsultation(sessionId)
        setSessions((prev) =>
          prev.map((s) => (s.id === sessionId ? { ...s, isRegistered: false, status: 'Allow Register' } : s))
        )
        setBanner({ type: 'success', message: `Successfully unregistered from ${sessionConId}.` })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.'
      setBanner({ type: 'error', message: `Operation failed: ${errorMessage}` })
    } finally {
      closeConfirmation()
    }
  }, [closeConfirmation, confirmation])

  const handleConfirmGroupSelection = useCallback(() => {
    setHasJoinedGroup(true)
    setBanner({
      type: 'success',
      message: 'You joined this tutoring group. Related services will receive your registration shortly.'
    })
    setIsGroupDialogOpen(false)
  }, [])

  const handleSubmitFeedback = useCallback(async () => {
    if (!feedbackState) return

    if (feedbackState.rating === 0) {
      setFeedbackError('Please select a rating before submitting.')
      return
    }

    const { session, rating, comment } = feedbackState
    const feedbackData = { rating, comment: comment.trim(), consultationId: session.id }

    try {
      let updatedFeedback
      if (session.feedback?.id) {
        // Update existing feedback
        updatedFeedback = await feedbackService.updateFeedback(session.feedback.id, feedbackData)
        setBanner({ type: 'success', message: 'Your feedback has been updated.' })
      } else {
        // Create new feedback
        updatedFeedback = await feedbackService.postFeedback(feedbackData)
        setBanner({ type: 'success', message: 'Thank you for sharing your feedback.' })
      }

      setSessions((prev) =>
        prev.map((item) =>
          item.id === session.id
            ? {
                ...item,
                feedback: { id: updatedFeedback.id, rating: updatedFeedback.rating, comment: updatedFeedback.comment }
              }
            : item
        )
      )

      closeFeedback()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.'
      setFeedbackError(errorMessage)
    }
  }, [feedbackState, closeFeedback])

  const handleDeleteFeedback = useCallback(
    async (sessionId: number, feedbackId: number) => {
      if (!window.confirm('Are you sure you want to delete your feedback? This action cannot be undone.')) {
        return
      }

      try {
        await feedbackService.deleteFeedback(feedbackId)
        setSessions((prev) => prev.map((item) => (item.id === sessionId ? { ...item, feedback: undefined } : item)))
        setBanner({ type: 'success', message: 'Your feedback has been deleted.' })
        closeFeedback()
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete feedback.'
        setBanner({ type: 'error', message: errorMessage })
      }
    },
    [closeFeedback]
  )

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
        width: '40%',
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
        width: '22%',
        render: (row: ConsultationSession) => (
          <div className='text-sm text-gray-700 text-center'>
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
        header: 'Status',
        accessor: 'status' as keyof ConsultationSession,
        width: '12%',
        render: (row: ConsultationSession) => (
          <StatusPill status={row.status} feedbackProvided={Boolean(row.feedback)} />
        )
      },
      {
        header: 'Actions',
        accessor: 'id' as keyof ConsultationSession,
        width: '18%',
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

        {loading ? (
          <div className='text-center p-6'>Loading group details...</div>
        ) : error ? (
          <div className='text-center text-red-500 p-6'>{error}</div>
        ) : group ? (
          <>
            <section>
              <h1 className='rounded-t-lg bg-indigo-200 p-3 text-xl font-bold text-indigo-900'>Group Information</h1>
              <GroupInformation
                title={group.groupName}
                description={group.description}
                tutor={group.tutor.userName}
                faculty={group.faculty.name}
                studentCount={group.studentLimit} // API does not provide current student count
                focusAreas={group.topics.map((t) => t.name)}
                onSelectGroup={openGroupSelection}
                isGroupSelected={hasJoinedGroup}
              />
            </section>

            <section>
              <h2 className='rounded-t-lg bg-indigo-200 p-3 text-xl font-bold text-indigo-900'>
                Consultation Sessions
              </h2>
              {sessions.length > 0 ? (
                <ReusableTable columns={columns} data={sessions} />
              ) : (
                <div className='p-4 text-center text-gray-500 bg-white rounded-b-lg'>
                  No consultation sessions scheduled for this group yet.
                </div>
              )}
            </section>
          </>
        ) : (
          <div className='text-center p-6'>Group not found.</div>
        )}
      </div>

      <ConfirmDialog
        isOpen={isGroupDialogOpen}
        onClose={closeGroupSelection}
        onConfirm={handleConfirmGroupSelection}
        title='Confirm group selection'
      >
        <div className='space-y-2 text-sm text-gray-700'>
          <p>
            You are about to join <span className='font-semibold'>{group?.groupName}</span> led by{' '}
            {group?.tutor.userName}.
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
        onDelete={handleDeleteFeedback}
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
  Full: 'bg-red-100 text-red-700',
  Canceled: 'bg-gray-200 text-gray-800'
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
    return (
      <button
        onClick={() => onFeedback(session)}
        className={`w-full rounded-md px-3 py-2 text-xs font-semibold text-white transition cursor-pointer ${session.feedback ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {session.feedback ? 'Edit Feedback' : 'Add Feedback'}
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
  onDelete: (sessionId: number, feedbackId: number) => void
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ state, error, onClose, onUpdate, onSubmit, onDelete }) => {
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
        <div className='mt-6 flex justify-between items-center'>
          <div>
            {state.session.feedback?.id && (
              <button
                onClick={() => onDelete(state.session.id, state.session.feedback!.id)}
                className='rounded-md bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700 cursor-pointer'
              >
                Delete
              </button>
            )}
          </div>
          <div className='flex gap-3'>
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
              {state.session.feedback?.id ? 'Update Feedback' : 'Submit Feedback'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultationSessionsPage
