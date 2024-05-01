import axios from 'axios';

const apiUrl = "http://localhost:5192"

// הגדרת Config Defaults
const axiosInstance = axios.create({
  baseURL: apiUrl
});

// הוספת interceptor ל-interceptors של Axios
axiosInstance.interceptors.response.use(
  function (response) {
    // כאשר ה-response הוא בהצלחה, פשוט החזר את ה-response
    return response;
  },
  function (error) {
    // כאשר הייתה שגיאה ב-response
    console.error("Error response interceptor:", error);
    // חזור על השגיאה כדי שנוכל לטפל בה במקום אחרי כך
    return Promise.reject(error);
  }
);
export default {
  getTasks: async () => {
    try {
      const result = await axiosInstance.get("/tasks");
      return result.data;
    } catch (error) {
      console.error("Error getting tasks:", error);
      throw error;
    }
  },


  addTask: async (name) => {
    try {
      const result = await axios.post(`${apiUrl}/task`, { name });
      return result.data;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },

  setCompleted: async (id, isComplete) => {
    try {
      const result = await axios.put(`${apiUrl}/task/${id}`, { isComplete });
      return result.data;
    } catch (error) {
      console.error("Error setting task completion:", error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`${apiUrl}/task/${id}`);
      console.log('Task deleted successfully');
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
 }
 };

