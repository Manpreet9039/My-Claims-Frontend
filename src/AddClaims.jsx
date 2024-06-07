import React, { useEffect, useState } from 'react';
import { CgCloseO } from "react-icons/cg";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { MdAddBox } from "react-icons/md";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrAttachment } from 'react-icons/gr';
import Service from './Service';


const AddClaims = ({ onClose }) => {

   
    const currentDate = new Date();
    const [expenseType, setExpenseType] = useState(""); // State to store selected expense type
    const expenseTypeOptions = [
      { value: "Conveyance", label: "Conveyance", image: "./fuel-pump.png" },
      { value: "Travel", label: "Travel", image: "./airplane.png" },
      { value: "Food", label: "Food", image: "./burger.png" }, // Assuming you have a food image
      { value: "Mobile", label: "Mobile", image: "./smartphone.png" },
      { value: "Miscellaneous", label: "Miscellaneous", image: "./belongings.png" }
    ];
    const [info, setInfo] = useState([]);
    const [totalAmounts, setTotalAmounts] = useState({ conveyance: 0, travel: 0, food: 0, mobile: 0, miscellaneous: 0 }); 
    const [expData,setExpData]=useState([]);
    const [selectedWbsId, setSelectedWbsId] = useState("");


    // useEffect(() => {
    //   //  axios.get("http://localhost:8080/api/emp-info/get-info")
    //    axios.get(`http://localhost:8080/api/emp-info/get-info/${1023446}`)
    //     .then(response => {
    //       setInfo(response.data);
    //     })
    //     .catch(error => console.error('Error fetching data:', error));
    // }, []);

    useEffect(() => {
      Service.getEmployeeData()
        .then(data => {
          setInfo(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDropdownWbs = (selectedOption) => {
      setSelectedWbsId(selectedOption.value); // Update selectedWbsId when dropdown value changes
      console.log("selectedwbs...", selectedOption.value);
    };
    

  
    const handleExpenseTypeChange = (selectedOption) => {
      const selectedValue = selectedOption.value;
      setExpenseType(selectedValue);

      console.log(selectedValue,"selectedValue...");


  
      // axios.get(`http://localhost:8080/getByExpTypeAndWbsIdAndEmpCode/${info[0].empCode}/${selectedWbsId}/${expenseType}`)
      //   .then(response => {
      //     setExpData(response.data);
      //   })
      //   .catch(error => {
      //     console.error("Error occurred while fetching data:", error);
      //   });

      if (info && info.length > 0) {
        Service.getExpenseData(info[0].empCode, selectedWbsId, selectedValue)
          .then(data => {
            setExpData(data);
          })
          .catch(error => {
            console.error("Error occurred while fetching data:", error);
          });
      }
      
    };

    // useEffect(() => {
    //   if (expenseType) {
    //     axios.get(`http://localhost:8080/getByExpTypeAndWbsIdAndEmpCode/${info[0].empCode}/${selectedWbsId}/${expenseType}`)
    //       .then(response => {
    //         setExpData(response.data);
    //       })
    //       .catch(error => {
    //         console.error("Error occurred while fetching data:", error);
    //       });
    //   }
    // }, [expenseType,selectedWbsId]);


    useEffect(() => {
      if (expenseType && info && info.length > 0) {
        Service.getExpenseData(info[0].empCode, selectedWbsId, expenseType)
          .then(data => {
            setExpData(data);
          })
          .catch(error => {
            console.error("Error occurred while fetching data:", error);
          });
      }
    }, [expenseType, selectedWbsId, info]);

  

  // Function to handle adding a new dynamic input row for conveyance
  const handleConveyanceClick = () => {
    setExpData([...expData, { date: '', fromLocation: '', toLocation: '', fromTime: '', toTime: '', purpose: '', modeOfTravel: '', distance: '', currency: '', amount: '', file: null }]);
  };

  // Function to handle adding a new dynamic input row for travel
  const handleTravelClick = () => {
    setExpData([...expData, { date: '', expMode: '', fromLocation: '', toLocation: '', currency: '', amount: '', file: null }]);
  };

  // Function to handle adding a new dynamic input row for miscellaneous
  const handleMiscellaneousClick = () => {
    setExpData([...expData, { date: '', expMode: '', purpose: '', currency: '', amount: '', file: null }]);
  };

  // Function to handle adding a new dynamic input row for food
  const handleFoodClick = () => {
    setExpData([...expData, { date: '', purpose: '',  currency: '', amount: '', file: null }]);
  };

  // Function to handle adding a new dynamic input row for mobile
  const handleMobileClick = () => {
    setExpData([...expData, { date: '', purpose: '', currency: '', amount: '', file: null }]);
  };

   // Function to handle deleting a dynamic input row for conveyance
   const handleConveyanceDelete = (index) => {
    const updatedConveyanceData = [...expData];
    updatedConveyanceData.splice(index, 1);
    setExpData(updatedConveyanceData);
};

const handleMiscellaneousDelete = (index) => {
  const updatedMiscellaneousData = [...expData];
  updatedMiscellaneousData.splice(index, 1);
  setExpData(updatedMiscellaneousData);
};

// Function to handle deleting a dynamic input row for travel
const handleTravelDelete = (index) => {
  const updatedTravelData = [...expData];
  updatedTravelData.splice(index, 1);
  setExpData(updatedTravelData);
};

// Function to handle deleting a dynamic input row for food
const handleFoodDelete = (index) => {
  const updatedFoodData = [...expData];
  updatedFoodData.splice(index, 1);
  setExpData(updatedFoodData);
};

// Function to handle deleting a dynamic input row for mobile
const handleMobileDelete = (index) => {
  const updatedMobileData = [...expData];
  updatedMobileData.splice(index, 1);
  setExpData(updatedMobileData);
};

// Update the input change handler functions to update the corresponding state object
const handleConveyanceInputChange = (e, index) => {
  const { name, value, files } = e.target;
  const newData = [...expData];
  newData[index] = { ...newData[index], [name]: name === 'file' && files ? files[0] : value };
  setExpData(newData);
};

const handleTravelInputChange = (e, index) => {
  const { name, value, files } = e.target;
  const newData = [...expData];
  newData[index] = { ...newData[index], [name]: name === 'file' && files ? files[0] : value };
  setExpData(newData);
};

const handleMiscellaneousInputChange = (e, index) => {
  const { name, value, files } = e.target;
  const newData = [...expData];
  newData[index] = { ...newData[index], [name]: name === 'file' && files ? files[0] : value };
  setExpData(newData);
};

const handleFoodInputChange = (e, index) => {
  const { name, value, files } = e.target;
  const newData = [...expData];
  newData[index] = { ...newData[index], [name]: name === 'file' && files ? files[0] : value };
  setExpData(newData);
};

const handleMobileInputChange = (e, index) => {
  const { name, value, files } = e.target;
  const newData = [...expData];
  newData[index] = { ...newData[index], [name]: name === 'file' && files ? files[0] : value };
  setExpData(newData);
};


const uploadConveyanceFile = (e, index) => {
  const {files} = e.target;
  const newData = [...expData];
  newData[index]["file"] = files[0]; // Update file property
  setExpData(newData);
  console.log("Conveyance Data after file upload:", newData); // Log the updated RTA data
};

const uploadTravelFile = (e, index) => {
  const {files} = e.target;
  const newData = [...expData];
  newData[index]["file"] = files[0]; // Update file property
  setExpData(newData);
  console.log("Travel Data after file upload:", newData); // Log the updated RTA data
};

const uploadMiscellaneousFile = (e, index) => {
  const {files} = e.target;
  const newData = [...expData];
  newData[index]["file"] = files[0]; // Update file property
  setExpData(newData);
  console.log("Miscellaneous Data after file upload:", newData); // Log the updated RTA data
};

const uploadFoodFile = (e, index) => {
  const {files} = e.target;
  const newData = [...expData];
  newData[index]["file"] = files[0]; // Update file property
  setExpData(newData);
  console.log("Food Data after file upload:", newData); // Log the updated RTA data
};

const uploadMobileFile = (e, index) => {
  const {files} = e.target;
  const newData = [...expData];
  newData[index]["file"] = files[0]; // Update file property
  setExpData(newData);
  console.log("Mobile Data after file upload:", newData); // Log the updated RTA data
};



// const handleSubmit = async (e) => {
//     try {
//       const formData = new FormData();
  
//       if (expenseType === "Conveyance") {
//         // Append JSON data for RTA

//         const expenseTypeAll = Array.isArray(expData) ? expData.map(data => ({ ...data, empCode: info[0].empCode ,wbsId: selectedWbsId})) : [];
//         const conveyanceDataWithExpenseType = expenseTypeAll.map(data => ({ ...data, expenseType: expenseType }));
//         formData.append(
//             "data",
//             new Blob([JSON.stringify(conveyanceDataWithExpenseType)], { type: "application/json" })
//         );
  
//         // Append files for RTA
//         expenseTypeAll.forEach(data => {
//             if (data.file) {
//                 formData.append("files", data.file);
//             }
//         });
  
//         const response = await Service.uploadConveyanceData(formData);
//         alert("Form data submitted successfully: " + response);

//       } else if (expenseType === "Travel") {
        
//         const expenseTypeAll = Array.isArray(expData) ? expData.map(data => ({ ...data, empCode: info[0].empCode ,wbsId: selectedWbsId})) : [];
//         const travelDataWithExpenseType = expenseTypeAll.map(data => ({ ...data, expenseType: expenseType }));
//         formData.append(
//             "data",
//             new Blob([JSON.stringify(travelDataWithExpenseType)], { type: "application/json" })
//         );
  
//         // Append files for IOU
//         expenseTypeAll.forEach(data => {
//             if (data.file) {
//                 formData.append("files", data.file);
//             }
//         });
  
//         const response = await Service.uploadTravelData(formData);
//         alert("Form data submitted successfully: " + response);

//       }  else if (expenseType === "Miscellaneous") {
        
//         const expenseTypeAll = Array.isArray(expData) ? expData.map(data => ({ ...data, empCode: info[0].empCode ,wbsId: selectedWbsId})) : [];
//         const miscellaneousDataWithExpenseType = expenseTypeAll.map(data => ({ ...data, expenseType: expenseType }));
//         formData.append(
//             "data",
//             new Blob([JSON.stringify(miscellaneousDataWithExpenseType)], { type: "application/json" })
//         );
  
//         expenseTypeAll.forEach(data => {
//             if (data.file) {
//                 formData.append("files", data.file);
//             }
//         });
  
//         const response = await Service.uploadMiscellaneousData(formData);
//         alert("Form data submitted successfully: " + response);
//       }  else if (expenseType === "Food") {
       
//        const expenseTypeAll = Array.isArray(expData) ? expData.map(data => ({ ...data, empCode: info[0].empCode ,wbsId: selectedWbsId})) : [];
        

//         const foodDataWithExpenseType = expenseTypeAll.map(data => ({ ...data, expenseType: expenseType}));
//         formData.append(
//             "data",
//             new Blob([JSON.stringify(foodDataWithExpenseType)], { type: "application/json" })
//         );
  
//         // Append files for IOU
//         expenseTypeAll.forEach(data => {
//             if (data.file) {
//                 formData.append("files", data.file);
//             }
//         });
  
//         const response = await Service.uploadFoodData(formData);
//         alert("Form data submitted successfully: " + response);
//       }

//       else if (expenseType === "Mobile") {
        
//         const expenseTypeAll = Array.isArray(expData) ? expData.map(data => ({ ...data, empCode: info[0].empCode ,wbsId: selectedWbsId})) : [];
//         const mobileDataWithExpenseType = expenseTypeAll.map(data => ({ ...data, expenseType: expenseType }));
//         formData.append(
//             "data",
//             new Blob([JSON.stringify(mobileDataWithExpenseType)], { type: "application/json" })
//         );
  
//         // Append files for IOU
//         expenseTypeAll.forEach(data => {
//             if (data.file) {
//                 formData.append("files", data.file);
//             }
//         });
  
//         const response = await Service.uploadMobileData(formData);
//         alert("Form data submitted successfully: " + response);
//       }
//     } catch (error) {
//       console.error("Error occurred while submitting form data:", error);
//       alert("Error occurred while submitting form data:", error);
//     }
//   };



const handleSubmit = async (e) => {
  try {
      const formData = new FormData();
      let response;

      const expenseTypeAll = Array.isArray(expData) ? expData.map(data => ({ ...data, empCode: info[0].empCode, wbsId: selectedWbsId })) : [];
      const expenseDataWithExpenseType = expenseTypeAll.map(data => ({ ...data, expenseType }));

      formData.append(
          "data",
          new Blob([JSON.stringify(expenseDataWithExpenseType)], { type: "application/json" })
      );

      expenseTypeAll.forEach(data => {
          if (data.file) {
              formData.append("files", data.file);
          }
      });

      if (expenseType === "Conveyance") {
          response = await Service.uploadConveyanceData(formData);
      } else if (expenseType === "Travel") {
          response = await Service.uploadTravelData(formData);
      } else if (expenseType === "Miscellaneous") {
          response = await Service.uploadMiscellaneousData(formData);
      } else if (expenseType === "Food") {
          response = await Service.uploadFoodData(formData);
      } else if (expenseType === "Mobile") {
          response = await Service.uploadMobileData(formData);
      }

      alert("Form data submitted successfully: " + response);
  } catch (error) {
      console.error("Error occurred while submitting form data:", error);
      alert("Error occurred while submitting form data: " + error.message);
  }
};


  







const handleDraftSubmit = async(e) => {
  e.preventDefault();

  const formData = new FormData();

  if (expenseType === "Conveyance") {
    const expenseTypeAll = Array.isArray(expData) ? expData.map(data => ({ ...data, empCode: info[0].empCode ,wbsId: selectedWbsId})) : [];
    const conveyanceDataWithExpenseType = expenseTypeAll.map(data => ({ ...data, expenseType: expenseType }));
    formData.append(
        "data",
        new Blob([JSON.stringify(conveyanceDataWithExpenseType)], { type: "application/json" })
    );

    // Append files for RTA
    expenseTypeAll.forEach(data => {
        if (data.file) {
            formData.append("files", data.file);
        }
    });

    

  } else if (expenseType === "Travel") {
    const expenseTypeAll = Array.isArray(expData) ? expData.map(data => ({ ...data, empCode: info[0].empCode ,wbsId: selectedWbsId})) : [];
    const travelDataWithExpenseType = expenseTypeAll.map(data => ({ ...data, expenseType: expenseType }));
    formData.append(
        "data",
        new Blob([JSON.stringify(travelDataWithExpenseType)], { type: "application/json" })
    );

    // Append files for IOU
    expenseTypeAll.forEach(data => {
        if (data.file) {
            formData.append("files", data.file);
        }
    });
  } else if (expenseType === "Miscellaneous") {
    const expenseTypeAll = Array.isArray(expData) ? expData.map(data => ({ ...data, empCode: info[0].empCode ,wbsId: selectedWbsId})) : [];
    const miscellaneousDataWithExpenseType = expenseTypeAll.map(data => ({ ...data, expenseType: expenseType }));
    formData.append(
        "data",
        new Blob([JSON.stringify(miscellaneousDataWithExpenseType)], { type: "application/json" })
    );

    // Append files for IOU
    expenseTypeAll.forEach(data => {
        if (data.file) {
            formData.append("files", data.file);
        }
    });
  } else if (expenseType === "Food") {
    const expenseTypeAll = Array.isArray(expData) ? expData.map(data => ({ ...data, empCode: info[0].empCode ,wbsId: selectedWbsId})) : [];
    const foodDataWithExpenseType = expenseTypeAll.map(data => ({ ...data, expenseType: expenseType }));
    formData.append(
        "data",
        new Blob([JSON.stringify(foodDataWithExpenseType)], { type: "application/json" })
    );

    // Append files for IOU
    expenseTypeAll.forEach(data => {
        if (data.file) {
            formData.append("files", data.file);
        }
    });
  } else if (expenseType === "Mobile") {
    const expenseTypeAll = Array.isArray(expData) ? expData.map(data => ({ ...data, empCode: info[0].empCode ,wbsId: selectedWbsId})) : [];
    const mobileDataWithExpenseType = expenseTypeAll.map(data => ({ ...data, expenseType: expenseType }));
    formData.append(
        "data",
        new Blob([JSON.stringify(mobileDataWithExpenseType)], { type: "application/json" })
    );

    // Append files for IOU
    expenseTypeAll.forEach(data => {
        if (data.file) {
            formData.append("files", data.file);
        }
    });
  }
  
  // axios.post("http://localhost:8080/uploadClaimsDrafts", formData, {
  //     headers: {
  //         'Content-Type': 'multipart/form-data'
  //     }
  // })
  // .then(response => {
    
  //   alert("Form data submitted successfully: " + response.data);
  // })
  // .catch(error => {
  //     console.error("Error occurred while submitting form data:", error);
  //     alert("Error occurred while submitting form data:", error);
  // });
  try {
    const response = await Service.uploadClaimsDrafts(formData);
    alert("Form data submitted successfully: " + response);
  } catch (error) {
    console.error("Error occurred while submitting form data:", error);
    alert("Error occurred while submitting form data:", error.message);
  }
};









useEffect(() => {
  if (Array.isArray(expData)) {
      // Calculate total amounts only if expData is an array
      const totalConveyanceAmount = expData.reduce((total, entry) => total + parseFloat(entry.amount || 0), 0);
      const totalTravelAmount = expData.reduce((total, entry) => total + parseFloat(entry.amount || 0), 0);
      const totalFoodAmount = expData.reduce((total, entry) => total + parseFloat(entry.amount || 0), 0);
      const totalMobileAmount = expData.reduce((total, entry) => total + parseFloat(entry.amount || 0), 0);
      const totalMiscellaneousAmount = expData.reduce((total, entry) => total + parseFloat(entry.amount || 0), 0);

      // Update total amounts in state
      setTotalAmounts(prevState => ({
          ...prevState,
          conveyance: totalConveyanceAmount,
          travel: totalTravelAmount,
          food: totalFoodAmount,
          mobile: totalMobileAmount,
          miscellaneous: totalMiscellaneousAmount
      }));
  } else {
      console.error('expData is not an array:', expData);
  }
}, [expData]);




// Function to handle cancel button click within Expense form
const handleCancel = () => {
  setExpenseType(""); // Reset advanceType to hide the RTA form
};
  


console.log(info,"info");
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
      <div className="bg-white md:p-8 p-3 rounded-lg h-full md:w-full w-[412px] flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-base font-semibold ">Create New Expense Request</h2>
          <button onClick={onClose}><CgCloseO className='text-red-600 size-6'/></button>
        </div>
        {/* Add your form content here */}
        {/* {info.map((info) => ( */}
        {info.map((infoItem, index) => (
        <div className='grid md:grid-cols-11 grid-cols-6'>
          <div className='md:col-span-6 col-span-6 mt-4 border border-gray-300 shadow-xl p-3 md:text-base text-sm'>
            <div key={index} className=''>
              <div className=' grid grid-cols-6 border-b-[1px] border-gray-200 p-3 '>
                <div className='col-span-2 text-gray-500 font-medium '>Employee Name</div>
                <div className='col-span-4 font-medium text-gray-700'>{infoItem.empName}</div>
              </div>
              <div className='grid grid-cols-6 border-b-[1px] border-gray-200 p-3'>
                <div className='col-span-2 text-gray-500 font-medium'>Email</div>
                <div className='col-span-4 font-medium text-gray-700'>{infoItem.email}</div>
              </div>
              <div className=' grid grid-cols-6 border-b-[1px] border-gray-200 p-3'>
                <div className='col-span-2 text-gray-500 font-medium'>Employee Code</div>
                <div className='col-span-4 font-medium text-gray-700'>{infoItem.empCode}</div>
              </div>
              <div className=' grid grid-cols-6 border-b-[1px] border-gray-200 p-3'>
                <div className='col-span-2 text-gray-500 font-medium'>Reporting manager</div>
                <div className='col-span-4 font-medium text-gray-700'>{infoItem.manager}</div>
              </div>
              <div className=' grid grid-cols-6 border-b-[1px] border-gray-200 p-3'>
                <div className='col-span-2 text-gray-500 font-medium'>Mobile Number</div>
                <div className='col-span-4 font-medium text-gray-700'>{infoItem.mobile}</div>
              </div>
              <div className='flex md:space-x-36 space-x-[70px] p-3 mt-3 md:text-base text-sm'>
                  <div className='font-medium text-gray-700'>WBS</div>
                  <div className='col-span-4'>
                    <Dropdown
                      className="md:w-[185px] w-40"
                      options={infoItem.wbsId.split(',').map((id) => ({ value: id , label: id}))}
                    onChange={handleDropdownWbs} // Define handleDropdownChange function
                    value={selectedWbsId} // Define selectedWbsId state variable
                    />
                  </div>
              </div>
              <div className='p-3'>
                <h4 className='md:my-2 my-4 md:text-sm text-xs'>Choose Expense Type to Continue</h4>
                <div className='flex md:space-x-20 space-x-2 md:text-base text-sm'>
                  <h3 className='font-medium text-gray-700'>Expense Type</h3>
                  
                  <Dropdown
                    className="md:w-[185px] w-40"
                    options={expenseTypeOptions.map(option => ({
                      value: option.value,
                      label: (
                        <div className="flex items-center">
                          <img
                            src={option.image}
                            alt={option.label}
                            className="w-[46px] pr-3"
                          />
                          <span>{option.label}</span>
                        </div>
                      )
                    }))}
                    onChange={handleExpenseTypeChange}
                    value={expenseType}
                  />
                </div>
              </div>
              <div className='flex md:space-x-24 space-x-6 p-3 md:text-base text-sm'>
                <h3>Description</h3>
                <input type="text" id="desc" className='h-[80px] w-[380px] border border-gray-300'/>
              </div>
            </div>
          </div>
          <div className='md:col-span-5 col-span-6 p-5 md:ml-8 md:text-base text-sm'>
              <h3 className='font-medium text-gray-700'>Types of Expenses you can claim</h3>

              <div className='grid grid-cols-6 mt-4'>
                <div className='col-span-2 space-y-2'>
                  <img src="./burger.png" alt="Food" className='w-[86px] shadow-xl px-5 py-1'/>
                  <p className='pb-3 text-sm px-6 text-blue-500 font-semibold'>Food</p>
                  <img src="./fuel-pump.png" alt="Conveyance" className='w-[86px] shadow-xl px-5 py-1'/>
                  <p className='pb-3 text-sm px-1 font-semibold text-blue-500'>Conveyance</p>
                </div>
                <div className='col-span-2 space-y-2'>
                  <img src="./airplane.png" alt="Travel" className='w-[86px] shadow-xl px-5 py-1'/>
                  <p className='pb-3 text-sm px-6 font-semibold text-blue-500'>Travel</p>
                  <img src="./belongings.png" alt="Miscellaneous" className='w-[86px] shadow-xl px-5 py-1'/>
                  <p className='pb-3 text-sm font-semibold text-blue-500'>Miscellaneous</p>
                </div>
                <div className='col-span-2 space-y-2'>
                  <img src="./smartphone.png" alt="Mobile" className='w-[86px] shadow-xl px-5 py-1'/>
                  <p className='pb-3 text-sm px-6 font-semibold text-blue-500'>Mobile</p>
                </div>

              </div>

              {/* Conditionally render the div based on the selected expense type */}
              {expenseType && (
                  <div className='border border-gray-300 shadow-lg w-60 h-36 text-center md:mt-28 mt-4 p-4 lg:ml-32 md:ml-[18px] sm:ml-12'> 
                      <h1 className='mt-5 font-medium'>Total Claim Amount</h1>
                      <div className='text-red-500 mt-2 text-xl'>
                        {expenseType === 'Conveyance' && `INR ${totalAmounts.conveyance}`}
                        {expenseType === 'Travel' && `INR ${totalAmounts.travel}`}
                        {expenseType === 'Food' && `INR ${totalAmounts.food}`}
                        {expenseType === 'Mobile' && `INR ${totalAmounts.mobile}`}
                        {expenseType === 'Miscellaneous' && `INR ${totalAmounts.miscellaneous}`}
                      </div>

                  </div>
              )}
              
          </div>
          

        </div>
        ))}



        {/* Conditionally render dynamic input fields based on selected expense type */}
        
        {expenseType === "Conveyance" && (
          <div className="">
            <div className='flex justify-between mt-12 font-bold text-xl '>
              <h1 className='text-gray-600 mt-2'>Claim Details</h1>
              <button onClick={handleConveyanceClick}><MdAddBox className='text-blue-500 text-5xl'/></button>
            </div>
            <div className='border border-gray-300 shadow-xl overflow-x-auto md:text-base text-sm'>
            <div className="grid md:grid-cols-12 grid-cols-4 gap-4 mt-2 border-b border-gray-300 md:p-4 p-1">
              <div className="col-name font-semibold ">S.No</div>
              <div className="col-name font-semibold md:-ml-8">Date</div>
              <div className="col-name font-semibold md:-ml-10">From Location</div>
              <div className="col-name font-semibold md:-ml-4">To Location</div>
              <div className="col-name font-semibold">From Time</div>
              <div className="col-name font-semibold">To Time</div>
              <div className="col-name font-semibold">Purpose</div>
              <div className="col-name font-semibold">Mode</div>
              <div className="col-name font-semibold">KM </div>
              <div className="col-name font-semibold">Currency</div>
              <div className="col-name font-semibold">Amount</div>
              <div className="col-name font-semibold">Documents</div>
            </div>
            <div className="grid md:grid-cols-12 grid-cols-4 gap-4 mt-2 p-4">
              {expData && expData.map((val, index) => (
                <React.Fragment key={index}>
                  <input className="p-2 mr-2 w-10" name="sNo" value={index+1} readOnly />
                  <input type="date" className='mr-40 w-[100px] border border-gray-300 p-2 md:-ml-12' name="date" value={val.date} onChange={(e) => handleConveyanceInputChange(e, index)} />
                  <input className="border border-gray-300 p-2 md:-ml-10 md:w-28" name="fromLocation" value={val.fromLocation} onChange={(e) => handleConveyanceInputChange(e, index)} />
                  <input className="border border-gray-300 p-2 md:-ml-4 md:w-24" name="toLocation" value={val.toLocation} onChange={(e) => handleConveyanceInputChange(e, index)} />
                  <input type="time" className='border border-gray-300 p-2' name="fromTime" value={val.fromTime} onChange={(e) => handleConveyanceInputChange(e, index)} />
                  <input type="time" className='border border-gray-300 p-2' name="toTime" value={val.toTime} onChange={(e) => handleConveyanceInputChange(e, index)} />
                  <input className="border border-gray-300 p-2" name="purpose" value={val.purpose} onChange={(e) => handleConveyanceInputChange(e, index)} />
                  <input className="border border-gray-300 p-2" name="modeOfTravel" value={val.modeOfTravel} onChange={(e) => handleConveyanceInputChange(e, index)} />
                  <input className="border border-gray-300 p-2" name="distance" value={val.distance} onChange={(e) => handleConveyanceInputChange(e, index)} />
                  <select className="border border-gray-300 p-2" name="currency" value={val.currency} onChange={(e) => handleConveyanceInputChange(e, index)}>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                  <input className="border border-gray-300 p-2" name="amount" value={val.amount} onChange={(e) => handleConveyanceInputChange(e, index)} />
                  <div className='flex space-x-12 ml-6 text-xl'>
                      <div className="relative">
                        <input
                          type="file"
                          name="file"
                          onChange={(e) => uploadConveyanceFile(e, index)}
                          className="absolute opacity-0 cursor-pointer w-6 h-6"
                        />
                        <GrAttachment className="cursor-pointer text-blue-500 hover:text-blue-700" />
                      </div>
                      <div onClick={() => handleConveyanceDelete(index)}><RiDeleteBin6Line className="cursor-pointer text-red-500 hover:text-red-700" /></div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            
            </div>
            <div className='text-center md:space-x-4 space-x-3 mt-24 '>
            <button onClick={() => handleSubmit("Conveyance")} className='bg-blue-500 text-white md:px-6 px-2 md:py-2 border border-blue-500 rounded-lg'>Submit</button>
            <button onClick={handleDraftSubmit} className='border border-gray-700 text-gray-700 md:px-6 px-2 md:py-2 rounded-lg'>Save as Draft</button>
            <button onClick={handleCancel} className='border border-gray-700 text-gray-700 md:px-6 px-2 md:py-2 rounded-lg'>Cancel</button>
          </div>
          </div>
        )}

        {expenseType === "Travel" && (
          <div className="">
            <div className='flex justify-between mt-12 font-bold text-xl '>
              <h1 className='text-gray-600 mt-2'>Claim Details</h1>
              <button onClick={handleTravelClick}><MdAddBox className='text-blue-500 text-5xl'/></button>
            </div>
            <div className='border border-gray-300 shadow-xl overflow-x-auto md:text-base text-sm'>
            <div className="grid md:grid-cols-8 grid-cols-4 gap-4 mt-2 border-b border-gray-300 p-4">
              <div className="col-name font-semibold">S.No</div>
              <div className="col-name font-semibold">Date</div>
              <div className="col-name font-semibold">Exp Mode</div>
              <div className="col-name font-semibold">From Location</div>
              <div className="col-name font-semibold">To Location</div>
              <div className="col-name font-semibold">Currency</div>
              <div className="col-name font-semibold">Amount</div>
              <div className="col-name font-semibold">Documents</div>
            </div>
            <div className="grid md:grid-cols-8 grid-cols-4 gap-4 mt-2 p-4">
              {expData && expData.map((val, index) => (
                <React.Fragment key={index}>
                  <input className="p-2" name="sNo" value={index+1} readOnly />
                  <input type="date" className='mr-40 w-[150px] border border-gray-300 p-2 md:-ml-12' name="date" value={val.date} onChange={(e) => handleTravelInputChange(e,index)} />
                  <select className="border border-gray-300 p-2" name="expMode" value={val.expMode} onChange={(e) => handleTravelInputChange(e, index)}>
                      <option value="Flight Ticket">Flight Ticket</option>
                      <option value="BUS Ticket">BUS Ticket</option>
                      <option value="Lodging">Lodging</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Coolie & Cart">Coolie & Cart</option>
                      <option value="Cab">Cab</option>
                  </select>

                  <input className="border border-gray-300 p-2" name="fromLocation" value={val.fromLocation} onChange={(e) => handleTravelInputChange(e,index)} />
                  <input className="border border-gray-300 p-2" name="toLocation" value={val.toLocation} onChange={(e) => handleTravelInputChange(e,index)} />
                  <select className="border border-gray-300 p-2" name="currency" value={val.currency} onChange={(e) => handleTravelInputChange(e, index)}>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                  <input className="border border-gray-300 p-2" name="amount" value={val.amount} onChange={(e) => handleTravelInputChange(e,index)} />
                  <div className='flex space-x-12 ml-6 text-xl'>
                      <div className="relative">
                        <input
                          type="file"
                          name="file"
                          onChange={(e) => uploadTravelFile(e, index)}
                          className="absolute opacity-0 cursor-pointer w-6 h-6"
                        />
                        <GrAttachment className="cursor-pointer text-blue-500 hover:text-blue-700" />
                      </div>
                      <div onClick={() => handleTravelDelete(index)}><RiDeleteBin6Line className="cursor-pointer text-red-500 hover:text-red-700" /></div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            </div>
            <div className='text-center md:space-x-4 space-x-3 mt-24'>
            <button onClick={() => handleSubmit("Travel")} className='bg-blue-500 text-white md:px-6 px-2 md:py-2 border border-blue-500 rounded-lg'>Submit</button>
            <button onClick={handleDraftSubmit} className='border border-gray-700 text-gray-700 md:px-6 px-2 md:py-2 rounded-lg'>Save as Draft</button>
            <button onClick={handleCancel} className='border border-gray-700 text-gray-700 md:px-6 px-2 md:py-2 rounded-lg'>Cancel</button>
          </div>
          </div>
        )}

         
        {expenseType === "Food" && (
            <div className="">
              <div className='flex justify-between mt-12 font-bold text-xl '>
                <h1 className='text-gray-600 mt-2'>Claim Details</h1>
                <button onClick={handleFoodClick}><MdAddBox className='text-blue-500 text-5xl'/></button>
              </div>
              <div className='border border-gray-300 shadow-xl'>
              <div className="grid md:grid-cols-6 grid-cols-3 gap-4 mt-2 border-b border-gray-300 p-4">
                <div className="col-name font-semibold">S.No</div>
                <div className="col-name font-semibold">Date</div>
                <div className="col-name font-semibold">Purpose</div>
                <div className="col-name font-semibold">Currency</div>
                <div className="col-name font-semibold">Amount</div>
                <div className="col-name font-semibold">Documents</div>
                
              </div>
              <div className="grid md:grid-cols-6 grid-cols-3 gap-4 mt-2 p-4">
                {expData && expData.map((val, index) => (
                  <React.Fragment key={index}>
                    <input className="p-2" name="sNo" value={index+1} readOnly />
                    <input type="date" className='mr-40 w-[200px] border border-gray-300 h-9 px-2 outline-none' name="date" value={val.date} onChange={(e) => handleFoodInputChange(e, index)} />
                    <input className="border border-gray-300 p-2" name="purpose" value={val.purpose} onChange={(e) => handleFoodInputChange(e, index)} />
                    <select className="border border-gray-300 p-2" name="currency" value={val.currency} onChange={(e) => handleFoodInputChange(e, index)}>
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                    </select>
                    <input className="border border-gray-300 p-2" name="amount" value={val.amount} onChange={(e) => handleFoodInputChange(e, index)} />
                    <div className='flex space-x-12 ml-6 text-xl'>
                      <div className="relative">
                        <input
                          type="file"
                          name="file"
                          onChange={(e) => uploadFoodFile(e, index)}
                          className="absolute opacity-0 cursor-pointer w-6 h-6"
                        />
                        <GrAttachment className="cursor-pointer text-blue-500 hover:text-blue-700" />
                      </div>
                      <div onClick={() => handleFoodDelete(index)}><RiDeleteBin6Line className="cursor-pointer text-red-500 hover:text-red-700" /></div>
                  </div>
                  </React.Fragment>
                ))}
              </div>
              </div>
              <div className='text-center space-x-4 mt-24 '>
            <button onClick={() => handleSubmit("Food")} className='bg-blue-500 text-white px-6 py-2 border border-blue-500 rounded-lg'>Submit</button>
            <button onClick={handleDraftSubmit} className='border border-gray-700 text-gray-700 px-6 py-2 rounded-lg'>Save as Draft</button>
            <button onClick={handleCancel} className='border border-gray-700 text-gray-700 px-6 py-2 rounded-lg'>Cancel</button>
          </div>
            </div>
          )}

          {expenseType === "Mobile" && (
            <div className="">
              <div className='flex justify-between mt-12 font-bold text-xl '>
                <h1 className='text-gray-600 mt-2'>Claim Details</h1>
                <button onClick={handleMobileClick}><MdAddBox className='text-blue-500 text-5xl'/></button>
              </div>
              <div className='border border-gray-300 shadow-xl'>
              <div className="grid md:grid-cols-6 grid-cols-3 gap-4 mt-2 border-b border-gray-300 p-4">
                <div className="col-name font-semibold">S.No</div>
                <div className="col-name font-semibold">Date</div>
                <div className="col-name font-semibold">Purpose</div>
                <div className="col-name font-semibold">Currency</div>
                <div className="col-name font-semibold">Amount</div>
                <div className="col-name font-semibold">Documents</div>
              </div>
              <div className="grid md:grid-cols-6 grid-cols-3 gap-4 mt-2 p-4">
                {expData && expData.map((val, index) => (
                  <React.Fragment key={index}>
                    <input className="p-2" name="sNo" value={index+1} readOnly />
                    <input type="date" className='mr-40 w-[200px] border border-gray-300 h-9 px-2 outline-none' name="date" value={val.date} onChange={(e) => handleMobileInputChange(e, index)} />
                    <input className="border border-gray-300 p-2" name="purpose" value={val.purpose} onChange={(e) => handleMobileInputChange(e, index)} />
                    <select className="border border-gray-300 p-2" name="currency" value={val.currency} onChange={(e) => handleMobileInputChange(e, index)}>
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                    </select>
                    <input className="border border-gray-300 p-2" name="amount" value={val.amount} onChange={(e) => handleMobileInputChange(e, index)} />
                    <div className='flex space-x-12 ml-6 text-xl'>
                      <div className="relative">
                        <input
                          type="file"
                          name="file"
                          onChange={(e) => uploadMobileFile(e, index)}
                          className="absolute opacity-0 cursor-pointer w-6 h-6"
                        />
                        <GrAttachment className="cursor-pointer text-blue-500 hover:text-blue-700" />
                      </div>
                      <div onClick={() => handleMobileDelete(index)}><RiDeleteBin6Line className="cursor-pointer text-red-500 hover:text-red-700" /></div>
                  </div>
                  </React.Fragment>
                ))}
              </div>
              </div>
              <div className='text-center space-x-4 mt-24 '>
            <button onClick={() => handleSubmit("Mobile")} className='bg-blue-500 text-white px-6 py-2 border border-blue-500 rounded-lg'>Submit</button>
            <button onClick={handleDraftSubmit} className='border border-gray-700 text-gray-700 px-6 py-2 rounded-lg'>Save as Draft</button>
            <button onClick={handleCancel} className='border border-gray-700 text-gray-700 px-6 py-2 rounded-lg'>Cancel</button>
          </div>
            </div>
          )}





        {expenseType === "Miscellaneous" && (
          <div className="">
            <div className='flex justify-between mt-12 font-bold text-xl '>
              <h1 className='text-gray-600 mt-2'>Claim Details</h1>
              <button onClick={handleMiscellaneousClick}><MdAddBox className='text-blue-500 text-5xl'/></button>
            </div>
            <div className='border border-gray-300 shadow-xl'>
            <div className="grid md:grid-cols-7 grid-cols-4 gap-4 mt-2 border-b border-gray-300 p-4">
              <div className="col-name font-semibold">S.No</div>
              <div className="col-name font-semibold">Date</div>
              <div className="col-name font-semibold">Exp Mode</div>
              <div className="col-name font-semibold">Purpose</div>
              <div className="col-name font-semibold">Currency</div>
              <div className="col-name font-semibold">Amount</div>
              <div className="col-name md:col-span-1 col-span-2 font-semibold">Documents</div>
            </div>
            <div className="grid md:grid-cols-7 grid-cols-4 gap-4 mt-2 p-4">
              {expData && expData.map((val, index) => (
                <React.Fragment key={index}>
                  <input className="p-2" name="sNo" value={index+1} readOnly />
                  {/* <input className="border border-gray-300 p-2" name="toDate" value={val.toDate} onChange={(e) => handleMiscellaneousInputChange(e, index)} /> */}
                  <input type="date" className='mr-40 w-[200px] border border-gray-300 p2 outline-none -ml-12' name="date" value={val.date} onChange={(e) => handleMiscellaneousInputChange(e, index)} />
                  <select className="border border-gray-300 p-2" name="modeOfExpense" value={val.modeOfExpense} onChange={(e) => handleMiscellaneousInputChange(e, index)}>
                    <option value="Flight Ticket">Telephone</option>
                    <option value="BUS Ticket">Printing & Stationery</option>
                    <option value="Lodging">Spare parts</option>
                    <option value="Food & Beverage">Others</option>
                  </select>
                  <input className="border border-gray-300 p-2" name="purpose" value={val.purpose} onChange={(e) => handleMiscellaneousInputChange(e, index)} />
                  <select className="border border-gray-300 p-2" name="currency" value={val.currency} onChange={(e) => handleMiscellaneousInputChange(e, index)}>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                  <input className="border border-gray-300 p-2" name="amount" value={val.amount} onChange={(e) => handleMiscellaneousInputChange(e, index)} />
                  <div className='flex space-x-12 ml-6 text-xl'>
                      {/* <input type='file' name='file' onChange={(e) => uploadMiscellaneousFile(e, index)}/> */}
                      <div className="relative">
                        <input
                          type="file"
                          name="file"
                          onChange={(e) => uploadMiscellaneousFile(e, index)}
                          className="absolute opacity-0 cursor-pointer w-6 h-6"
                        />
                        {val.fileName ? val.fileName :<GrAttachment className="cursor-pointer text-blue-500 hover:text-blue-700" />}
                      </div>
                      <div onClick={() => handleMiscellaneousDelete(index)}><RiDeleteBin6Line className="cursor-pointer text-red-500 hover:text-red-700" /></div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            </div>
            <div className='text-center space-x-4 mt-24 '>
            <button onClick={() => handleSubmit("Miscellaneous")} className='bg-blue-500 text-white px-6 py-2 border border-blue-500 rounded-lg'>Submit</button>
            <button onClick={handleDraftSubmit} className='border border-gray-700 text-gray-700 px-6 py-2 rounded-lg'>Save as Draft</button>
            <button onClick={handleCancel} className='border border-gray-700 text-gray-700 px-6 py-2 rounded-lg'>Cancel</button>
          </div>
          </div>
        )}


      </div>
      
    </div>
  );
};


export default AddClaims;




