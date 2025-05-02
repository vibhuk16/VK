
interface EventParams {
  [key: string]: string | number | boolean;
}

/**
 * Analytics service to track user interactions and page views
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Initialize analytics data in localStorage if it doesn't exist
const initializeAnalytics = () => {
  if (!localStorage.getItem('analytics_sessions')) {
    localStorage.setItem('analytics_sessions', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('analytics_events')) {
    localStorage.setItem('analytics_events', JSON.stringify([]));
  }
};

// Track a page view
export const trackPageView = (page: string) => {
  initializeAnalytics();
  
  // Get visitor information
  const timestamp = new Date().toISOString();
  const sessionId = getSessionId();
  const referrer = document.referrer;
  const userAgent = navigator.userAgent;
  
  // Create page view data
  const pageView = {
    sessionId,
    timestamp,
    page,
    referrer,
    userAgent,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  };
  
  // Get current sessions
  const sessions = JSON.parse(localStorage.getItem('analytics_sessions') || '[]');
  sessions.push(pageView);
  
  // Store updated sessions
  localStorage.setItem('analytics_sessions', JSON.stringify(sessions));
  
  // Send to analytics endpoint (if available)
  sendAnalyticsData('pageview', { page });
  
  console.log(`[Analytics] Page view tracked: ${page}`);
};

// Track an event
export const trackEvent = (eventName: string, params: EventParams = {}) => {
  initializeAnalytics();
  
  // Get visitor information
  const timestamp = new Date().toISOString();
  const sessionId = getSessionId();
  
  // Create event data
  const event = {
    sessionId,
    timestamp,
    eventName,
    params
  };
  
  // Get current events
  const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
  events.push(event);
  
  // Store updated events
  localStorage.setItem('analytics_events', JSON.stringify(events));
  
  // Send to analytics endpoint (if available)
  sendAnalyticsData('event', { event: eventName, ...params });
  
  console.log(`[Analytics] Event tracked: ${eventName}`, params);
};

// Get a unique session ID for the current user
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  
  if (!sessionId) {
    sessionId = generateUniqueId();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  
  return sessionId;
};

// Generate a unique ID
const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Send analytics data to a server (mock implementation)
const sendAnalyticsData = (type: 'pageview' | 'event', data: any) => {
  // In a real implementation, you would send this data to your analytics service
  // For now, we'll just store it locally and log it
  
  // For integration with services like Google Analytics, you would add the implementation here
  if (window.gtag) {
    window.gtag('event', type === 'pageview' ? 'page_view' : data.event, data);
  }
};

// Get analytics data for the analytics dashboard
export const getAnalyticsData = () => {
  initializeAnalytics();
  
  const sessions = JSON.parse(localStorage.getItem('analytics_sessions') || '[]');
  const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
  
  return {
    sessions,
    events,
    totalPageViews: sessions.length,
    totalEvents: events.length,
    uniqueVisitors: [...new Set(sessions.map((s: any) => s.sessionId))].length
  };
};
