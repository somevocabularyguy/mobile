import { UserData, FeedbackData } from '@/types';
import { AuthConfig } from '@/apiTypes';
import axios from 'axios';

const PROXY_URL = 'http://192.168.1.44:3000';

const getUserData = async (authToken: string): Promise<UserData | null> => {
  const config: AuthConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }

  try {
    const response = await axios.get(`${PROXY_URL}/api/mobile/proxy/data/get-user-data`, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        console.log('Error: Could not connect to the server. Please check if the server is running.');
      }
    } else {
      console.error(error)
    }

    return null;
  }
}

const syncUserData = async (userDataToSync: UserData | null = null, authToken: string) => {

  const config: AuthConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }

  try {
    const response = await axios.post(`${PROXY_URL}/api/mobile/proxy/data/sync-user-data`, { userDataToSync }, config);
    return response.data as { serverUserData: UserData } | null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        console.log('Error: Could not connect to the server. Please check if the server is running.');
      }
    } else {
      console.error(error)
    }

    return null;
  }
}

interface VerifyResponse {
  message: string;
  authToken: string | null;
}

const verifySignIn = async (tempVerifyToken: string): Promise<VerifyResponse> => {
  const config: AuthConfig = {
    headers: {
      Authorization: `Bearer ${tempVerifyToken}`
    }
  }

  try {
    const response = await axios.get(`${PROXY_URL}/api/mobile/proxy/entry/verify-sign-in`, config);

    const { authToken } = response.data;
    if (response.status === 200 && authToken) {
      return { message: 'verified', authToken: authToken };
    }
    return { message: 'unknown', authToken: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        console.log('Error: Could not connect to the server. Please check if the server is running.');
      } else if (error.code === 'ETIMEDOUT') {
        console.log('Error: Request timed out. Server may be slow or unreachable.');
      } else {
        // console.log(`Axios Error: ${error.message}`);
      }
      if (error.status === 401) {
        return { message: 'expired', authToken: null };
      } else if (error.status === 403) {
        return { message: 'not-verified', authToken: null };
      }
    }
    return { message: 'unknown error', authToken: null };
  }
}

const sendMagicLink = async (email: string) => {
  const response = await axios.post(`${PROXY_URL}/api/mobile/proxy/entry/send-magic-link`, { email });
  return response;
}

const sendFeedbackData = async (feedbackData: FeedbackData) => {
  const response = await axios.post(`${PROXY_URL}/api/mobile/proxy/feedback/send-feedback`, { feedbackData }, { withCredentials: true })
  return response;
}

const deleteAccount = async () => {
  const response = await axios.delete(`${PROXY_URL}/api/mobile/proxy/entry/delete-account`, { withCredentials: true });
  return response;
}

export { getUserData, sendMagicLink, sendFeedbackData, deleteAccount, verifySignIn, syncUserData };