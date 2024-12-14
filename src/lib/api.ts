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
    const response = await axios.get(`${PROXY_URL}/api/mobile/proxy/data/get-data`, config);
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

const sendMagicLink = async (email: string) => {
  const response = await axios.post(`${PROXY_URL}/api/mobile/proxy/entry/send-magic-link`, { email });
  return response;
}

const sendFeedbackData = async (feedbackData: FeedbackData) => {
  const response = await axios.post(`${PROXY_URL}/api/mobile/proxy/feedback/send-feedback`, { feedbackData }, { withCredentials: true })
  return response;
}

const logout = async () => {
  const response = await axios.get(`${PROXY_URL}/api/mobile/logout`, { withCredentials: true });
  return response
}

const deleteAccount = async () => {
  const response = await axios.delete(`${PROXY_URL}/api/mobile/proxy/entry/delete-account`, { withCredentials: true });
  return response;
}
// 
// const checkIsVerified = async () => {
//   const response = await axios.get(`${PROXY_URL}/api/mobile/proxy/entry`)
// }

export { getUserData, sendMagicLink, sendFeedbackData, logout, deleteAccount };