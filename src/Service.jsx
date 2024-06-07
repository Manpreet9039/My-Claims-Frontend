import Axios from "./Axios";
import Config from "./Config";

const apiClient = Axios(`${Config.MyClaimsUrl}`);

const getConveyanceData = () => {
    return apiClient.get("/conveyance")
      .then(response => response.data)
      .catch(error => {
        console.error("Data not fetched", error);
        throw error;
    });
};

const getMiscellaneousData = () => {
    return apiClient.get("/miscellaneous")
      .then(response => response.data)
      .catch(error => {
        console.error("Data not fetched", error);
        throw error;
    });
};

const getFoodItemsData = () => {
    return apiClient.get("/food_items")
      .then(response => response.data)
      .catch(error => {
        console.error("Data not fetched", error);
        throw error;
    });
};

const getMobileData = () => {
    return apiClient.get("/mobile")
      .then(response => response.data)
      .catch(error => {
        console.error("Data not fetched", error);
        throw error;
    });
};

const getTravelData = () => {
    return apiClient.get("/travel")
      .then(response => response.data)
      .catch(error => {
        console.error("Data not fetched", error);
        throw error;
    });
};

const getEmployeeData = () => {
    return apiClient.get(`/api/emp-info/get-info/1023446`)
      .then(response => response.data)
      .catch(error => {
        console.error("Data not fetched", error);
        throw error;
    });
};

const getExpenseData = (empCode, wbsId, expenseType) => {
    return apiClient.get(`/getByExpTypeAndWbsIdAndEmpCode/${empCode}/${wbsId}/${expenseType}`)
      .then(response => response.data)
      .catch(error => {
        console.error("Error occurred while fetching data:", error);
        throw error;
      });
  };

const uploadConveyanceData = async (formData) => {
    try {
      const response = await apiClient.post("/uploadConveyance", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred while uploading conveyance data:", error);
      throw error;
    }
};

const uploadTravelData = async (formData) => {
    try {
      const response = await apiClient.post("/uploadTravelDetails", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred while uploading travel data:", error);
      throw error;
    }
};

const uploadMiscellaneousData = async (formData) => {
    try {
      const response = await apiClient.post("/uploadMiscellaneous", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred while uploading miscellaneous data:", error);
      throw error;
    }
};

const uploadFoodData = async (formData) => {
try {
    const response = await apiClient.post("/uploadFoodExpense", formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
    });
    return response.data;
} catch (error) {
    console.error("Error occurred while uploading food data:", error);
    throw error;
}
};

const uploadMobileData = async (formData) => {
    try {
      const response = await apiClient.post("/uploadMobileExpense", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred while uploading mobile data:", error);
      throw error;
    }
  };

  const uploadClaimsDrafts = async (formData) => {
    try {
      const response = await apiClient.post("/uploadClaimsDrafts", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred while uploading claim drafts:", error);
      throw error;
    }
  };



const Service = {
    getConveyanceData,
    getMiscellaneousData,
    getFoodItemsData,
    getMobileData,
    getTravelData,
    getEmployeeData,
    getExpenseData,
    uploadConveyanceData,
    uploadTravelData,
    uploadMiscellaneousData,
    uploadFoodData,
    uploadMobileData,
    uploadClaimsDrafts,
};

export default Service;






