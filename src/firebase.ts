// Firebase client initialization
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as analyticsIsSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyA9OXL9WZXBlSf9jmaNdxeaav2lOSJUxvM',
  authDomain: 'skyviewtaj.firebaseapp.com',
  projectId: 'skyviewtaj',
  storageBucket: 'skyviewtaj.firebasestorage.app',
  messagingSenderId: '602215924165',
  appId: '1:602215924165:web:a61251219e753311ba4bac',
  measurementId: 'G-0TQ7ZCTKW0',
};

const app = initializeApp(firebaseConfig);

let analytics: ReturnType<typeof getAnalytics> | null = null;

// Initialize analytics only in supported browser environments
(async () => {
  try {
    if (await analyticsIsSupported()) {
      analytics = getAnalytics(app);
    }
  } catch (e) {
    // analytics not available in this environment (e.g., SSR)
    analytics = null;
  }
})();

export { app, analytics };
export default app;
