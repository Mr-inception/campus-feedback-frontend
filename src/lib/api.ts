// Base URL for all API calls.
// Uses Vite env var when available so prod can point to real backend.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export interface Feedback {
  name: string;
  email: string;
  eventName: string;
  eventType: string;
  rating: number;
  comments: string;
}

export interface FeedbackStats {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
  positivePercentage: number;
  neutralPercentage: number;
  negativePercentage: number;
}

export const submitFeedback = async (feedback: Feedback) => {
  const response = await fetch(`${API_BASE_URL}/api/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedback),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to submit feedback');
  }

  return response.json();
};

export const getFeedback = async (timeRange: string) => {
  const response = await fetch(`${API_BASE_URL}/api/feedback?timeRange=${timeRange}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch feedback');
  }

  return response.json();
};

export const getFeedbackStats = async (timeRange: string) => {
  const response = await fetch(`${API_BASE_URL}/api/feedback/stats?timeRange=${timeRange}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch feedback stats');
  }

  return response.json();
}; 