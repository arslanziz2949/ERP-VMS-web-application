// const API_Base_url = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const API_Base_url = import.meta.env.VITE_API_BASE_URL || "http://192.168.18.28:8000";

const urls = {
  login: `${API_Base_url}/login`,
  create_admin: `${API_Base_url}/create_admin`,
  create_sub_admin: `${API_Base_url}/create_sub_admin`,
  getUsers: `${API_Base_url}/get_users`,
};

export default urls;
