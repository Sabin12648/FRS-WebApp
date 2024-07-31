// apiEndpoints.tsx

const API_BASE_URL = 'http://192.168.1.121:5000';

const endpoints = {
  auth: {
    login: `${API_BASE_URL}/login`,
    logout: `${API_BASE_URL}/auth/logout`,
  },
  user: {
    profile: (userId: string) => `${API_BASE_URL}/users/${userId}`,
    uploadUserPhoto: (userId: string) => `${API_BASE_URL}/users/${userId}/update_photo`,
    deleteUser: (userId: string) => `${API_BASE_URL}/users/${userId}`,
    uploadPhotos: `${API_BASE_URL}/upload_photos`,
    uploadUser: `${API_BASE_URL}/upload_user`,
    getImage: (photoFilename: string) => `${API_BASE_URL}/get_image/${photoFilename}`,
    getAll: `${API_BASE_URL}/users`,
  }
};


export default endpoints;
