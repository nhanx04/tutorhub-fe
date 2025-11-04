import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { feedbackData } from '../mockdata/feedback-data';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        // allow clicking on overlay (outside modal) to close
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        {/* Persistent close button (stays visible even when content scrolls) */}
        <button
          onClick={onClose}
          aria-label="Close feedback modal"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1"
        >
          ✕
        </button>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">All Feedback</h2>
        </div>

        <div className="space-y-4 pt-2">
          {feedbackData.map((feedback, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">{feedback.studentName}</p>
                  <p className="text-sm text-gray-500">Student ID: {feedback.studentId}</p>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-semibold">{feedback.rating}</span>
                </div>
              </div>
              <p className="text-gray-700">{feedback.comment}</p>
              <p className="text-sm text-gray-500 mt-2">{feedback.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FeedbackSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recentFeedback = feedbackData.slice(0, 2); // Show only 2 recent feedback

  return (
    <div className="border rounded-lg p-6 max-w-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Assessment</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          View all
        </button>
      </div>
      <div className="space-y-4">
        {recentFeedback.map((feedback, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start mb-2">
              <p className="font-semibold">{feedback.studentName}</p>
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="font-semibold">{feedback.rating}</span>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{feedback.comment}</p>
            <p className="text-xs text-gray-500 mt-2">{feedback.date}</p>
          </div>
        ))}
      </div>
      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};