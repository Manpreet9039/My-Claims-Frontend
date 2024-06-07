// import React, { useEffect, useState } from 'react';
// import { CgCloseO } from "react-icons/cg";
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';
// import { MdAddBox } from "react-icons/md";
// import { RiDeleteBin6Line } from 'react-icons/ri';
// import { GrAttachment } from 'react-icons/gr';



// const AddAdvance = ({ onClose }) => {

//     // Get the current date
//     const currentDate = new Date();
//     const [advanceType, setAdvanceType] = useState(""); // State to store selected expense type
//     const [advData, setAdvData] = useState([{ toDate: '', purpose: '', currency: '', amount: '', file: null }]); // State for conveyance data
    
//     const advanceTypeOptions = [
//       { value: "RTA", label: "RTA", image: "./user.png" },
//       { value: "IOU", label: "IOU", image: "./office-building.png" },
//     ];
//     const [info, setInfo] = useState([]);
//     const [totalAmounts, setTotalAmounts] = useState({ rta: 0, iou: 0 }); 
    
   
  


//   useEffect(() => {
//     axios.get("http://localhost:8080/api/emp-info/get-info")
//       .then(response => {
//         setInfo(response.data);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);
    

//     // Function to handle expense type selection
//     const handleAdvanceTypeChange = (selectedOption) => {
//       setAdvanceType(selectedOption.value);
//   };

//   console.log(advanceType,"advanceType");

//   // useEffect(() => {
//   //   console.log(advanceType,"inside advanceType");
//   //   axios.get(`http://localhost:8080/getByExpType/${advanceType}`)
//   //   .then(res=>setAdvData(res.data))
//   //     .catch(error => console.error('Error fetching data:', error));
//   // }, [advanceType]);


//   useEffect(() => {
//     // Fetch data only if advData is empty
//     if (advData.length === 0) {
//       axios.get(`http://localhost:8080/getByExpType/${advanceType}`)
//         .then(res => setAdvData(res.data))
//         .catch(error => console.error('Error fetching data:', error));
//     }
//   }, [advanceType, advData]);
  


//   console.log(advData,"rtaData");
  

//   // Function to handle adding a new dynamic input row for conveyance
//   const handleRtaClick = () => {
//     setAdvData([...advData, {  toDate: '', purpose: '', currency: '', amount: '', file: null }]);
// };

//   // Function to handle adding a new dynamic input row for conveyance
//   const handleIouClick = () => {
//     setAdvData([...advData, {  toDate: '', purpose: '', currency: '', amount: '', file: null }]);
//   };

  

//   // Function to handle deleting a dynamic input row for travel
//   const handleRtaDelete = (index) => {
//     const updatedRtaData = [...advData];
//     updatedRtaData.splice(index, 1);
//     setAdvData(updatedRtaData);
// };

//   // Function to handle deleting a dynamic input row for travel
//   const handleIouDelete = (index) => {
//     const updatedIouData = [...advData];
//     updatedIouData.splice(index, 1);
//     setAdvData(updatedIouData);
//   };

//   // Update the input change handler functions to update the corresponding state object
//   const handleRtaInputChange = (e, index) => {
//     const { name, value, files } = e.target;
//     const newData = [...advData];
//     newData[index] = { ...newData[index], [name]: name === 'file' && files ? files[0] : value };
//     setAdvData(newData);
// };

//   // Update the input change handler functions to update the corresponding state object
//   const handleIouInputChange = (e, index) => {
//     const { name, value, files } = e.target;
//     const newData = [...advData];
//     newData[index] = { ...newData[index], [name]: name === 'file' && files ? files[0] : value };
//     setAdvData(newData);
//   };
//   const [file, setFile] = useState([]);

//   const uploadRtaFile = (e, index) => {
//     const {files} = e.target;
//     const newData = [...advData];
//     newData[index]["file"] = files[0]; // Update file property
//     setAdvData(newData);
//     console.log("RTA Data after file upload:", newData); // Log the updated RTA data
// };

// const uploadIouFile = (e, index) => {
//   const {files} = e.target;
//   const newData = [...advData];
//   newData[index]["file"] = files[0]; // Update file property
//   setAdvData(newData);
//   console.log("RTA Data after file upload:", newData); // Log the updated RTA data
// };




// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const formData = new FormData();

//     if (advanceType === "RTA") {
//       // Append JSON data for RTA
//       const rtaDataWithExpenseType = advData.map(data => ({ ...data, expenseType: advanceType }));
//       formData.append(
//           "data",
//           new Blob([JSON.stringify(rtaDataWithExpenseType)], { type: "application/json" })
//       );

//       // Append files for RTA
//       advData.forEach(data => {
//           if (data.file) {
//               formData.append("files", data.file);
//           }
//       });
//     } else if (advanceType === "IOU") {
//       // Append JSON data for IOU
//       const iouDataWithExpenseType = advData.map(data => ({ ...data, expenseType: advanceType }));
//       formData.append(
//           "data",
//           new Blob([JSON.stringify(iouDataWithExpenseType)], { type: "application/json" })
//       );

//       // Append files for IOU
//       advData.forEach(data => {
//           if (data.file) {
//               formData.append("files", data.file);
//           }
//       });
//     }

//     const response = await axios.post("http://localhost:8080/submitDraftClaim", formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     });
//     console.log("Form data submitted successfully:", response.data);
//   } catch (error) {
//     console.error("Error occurred while submitting form data:", error);
//   }
// };


// const handleDraftSubmit = (e) => {
//   e.preventDefault();

//   const formData = new FormData();

//   if (advanceType === "RTA") {
//     // Append JSON data for RTA
//     const rtaDataWithExpenseType = advData.map(data => ({ ...data, expenseType: advanceType }));
//     formData.append(
//         "data",
//         new Blob([JSON.stringify(rtaDataWithExpenseType)], { type: "application/json" })
//     );

//     // Append files for RTA
//     advData.forEach(data => {
//         if (data.file) {
//             formData.append("files", data.file);
//         }
//     });
//   } else if (advanceType === "IOU") {
//     // Append JSON data for IOU
//     const iouDataWithExpenseType = advData.map(data => ({ ...data, expenseType: advanceType }));
//     formData.append(
//         "data",
//         new Blob([JSON.stringify(iouDataWithExpenseType)], { type: "application/json" })
//     );

//     // Append files for IOU
//     advData.forEach(data => {
//         if (data.file) {
//             formData.append("files", data.file);
//         }
//     });
//   }
  
//   axios.post("http://localhost:8080/uploadDraftClaim", formData, {
//       headers: {
//           'Content-Type': 'multipart/form-data'
//       }
//   })
//   .then(response => {
//     console.log("Form data submitted successfully:", response.data);
//   })
//   .catch(error => {
//       console.error("Error occurred while submitting form data:", error);
//   });
// };







//   useEffect(() => {
//     // Calculate total amount for RTA whenever rtaData changes
//     const totalRtaAmount = advData.reduce((total, entry) => total + parseFloat(entry.amount || 0), 0);
    
//     // Calculate total amount for IOU whenever iouData changes
//     const totalIouAmount = advData.reduce((total, entry) => total + parseFloat(entry.amount || 0), 0);

//     // Update total amounts in state
//     setTotalAmounts(prevState => ({
//         ...prevState,
//         rta: totalRtaAmount,
//         iou: totalIouAmount
//     }));
// }, [advData]);



// // Function to handle cancel button click within Advance form
// const handleCancel = () => {
//   setAdvanceType(""); // Reset advanceType to hide the RTA form
// };



// // const closePopup = () => {
// //   setShowPopup(false);
// // };


  


  
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
//       <div className="bg-white md:p-8 p-3 rounded-lg h-full md:w-full w-[412px] flex flex-col overflow-y-auto">
//         <div className="flex justify-between items-center pb-4">
//           <h2 className="text-lg font-semibold">Create New Advance Request</h2>
//           <button onClick={onClose}><CgCloseO className='text-red-600 size-6'/></button>
//         </div>
//         {/* Add your form content here */}
//         {info.map((info ) => (
//         <div className='grid md:grid-cols-11 grid-cols-6'>
//           <div className='md:col-span-6 col-span-6 mt-4 border border-gray-300 shadow-xl p-3'>
//             <div className=''>
//               <div className=' grid grid-cols-6 border-b-[1px] border-gray-200 p-3'>
//                 <div className='col-span-2 text-gray-500 font-medium'>Employee Name</div>
//                 <div className='col-span-4 font-medium text-gray-700'>{info.empName}</div>
//               </div>
//               <div className='grid grid-cols-6 border-b-[1px] border-gray-200 p-3'>
//                 <div className='col-span-2 text-gray-500 font-medium'>Email</div>
//                 <div className='col-span-4 font-medium text-gray-700'>{info.email}</div>
//               </div>
//               <div className=' grid grid-cols-6 border-b-[1px] border-gray-200 p-3'>
//                 <div className='col-span-2 text-gray-500 font-medium'>Employee Code</div>
//                 <div className='col-span-4 font-medium text-gray-700'>{info.empCode}</div>
//               </div>
//               <div className=' grid grid-cols-6 border-b-[1px] border-gray-200 p-3'>
//                 <div className='col-span-2 text-gray-500 font-medium'>Reporting manager</div>
//                 <div className='col-span-4 font-medium text-gray-700'>{info.manager}</div>
//               </div>
//               <div className=' grid grid-cols-6 border-b-[1px] border-gray-200 p-3'>
//                 <div className='col-span-2 text-gray-500 font-medium'>Mobile Number</div>
//                 <div className='col-span-4 font-medium text-gray-700'>{info.mobile}</div>
//               </div>
//               <div className='flex md:space-x-36 space-x-[70px] p-3 mt-3'>
//                   <div className='font-medium text-gray-700'>WBS</div>
//                   <input type="text" id="wbsInput" className='border border-gray-300'/>
//               </div>
//               <div className='p-3'>
//                 <h4 className='md:my-2 my-4 text-sm text-gray-500 font-medium'>Choose Expense Type to Continue</h4>
//                 {/* {rtaData.map((val, index) => ( */}
//                                 <div className='flex md:space-x-20 space-x-2'>
//                                     <h3 className='font-medium text-gray-700'>Advance Type</h3>
//                                     {/* <Dropdown
//                                         className="md:w-[185px] w-40"
//                                         options={advanceTypeOptions.map(option => ({ value: option, label: option }))}
//                                         onChange={handleAdvanceTypeChange}
//                                         value={advanceType}
//                                     /> */}
//                                     <Dropdown
//                                       className="md:w-[185px] w-40"
//                                       options={advanceTypeOptions.map(option => ({
//                                         value: option.value,
//                                         label: (
//                                           <div className="flex items-center">
//                                             <img
//                                               src={option.image}
//                                               alt={option.label}
//                                               className="w-[46px] pr-3"
//                                             />
//                                             <span>{option.label}</span>
//                                           </div>
//                                         )
//                                       }))}
//                                       onChange={handleAdvanceTypeChange}
//                                       value={advanceType}
//                                     />
//                                 </div>
//                                 {/* ))} */}
//               </div>
//               <div className='flex md:space-x-24 space-x-6 p-3 '>
//                 <h3 className='font-medium text-gray-700'>Description</h3>
//                 <input type="text" id="desc" className='h-[80px] w-[380px] border border-gray-300'/>
//               </div>
//             </div>
//           </div>
//           <div className='md:col-span-5 col-span-6 p-5 md:ml-8'>
//               <h3 className='font-medium text-gray-700'>Types of Advances you can claim</h3>
              
//               <div className='grid grid-cols-6 mt-4'>
//                 <div className='col-span-2 space-y-2'>
//                   <img src="./user.png" alt="RTA" className='w-[86px] shadow-xl px-5 py-1'/>
//                   <p className='pb-3 text-sm px-8 text-blue-500 font-semibold'>RTA</p>
//                 </div>
//                 <div className='col-span-2 space-y-2'>
//                   <img src="../office-building.png" alt="IOU" className='w-[86px] shadow-xl px-5 py-1'/>
//                   <p className='pb-3 text-sm px-8 font-semibold text-blue-500'>IOU</p>
//                 </div>
//               </div>
//               {/* Conditionally render the div based on the selected expense type */}
//               {advanceType && (
//                   <div className='border border-gray-300 shadow-lg w-60 h-36 text-center md:mt-28 mt-4 p-4 lg:ml-32 md:ml-[18px] sm:ml-12'> 
//                       <h1 className='mt-5 font-medium'>Total Advance Amount</h1>
//                       <div className='text-red-500 mt-2 text-xl'>INR {advanceType === 'RTA' ? totalAmounts.rta : totalAmounts.iou}</div>
//                   </div>
//               )}
//           </div>
          

//         </div>
//         ))}


//         {/* Conditionally render dynamic input fields based on selected expense type */}
        
//         {advanceType === "RTA" && (
//           <div className="">
//             <div className='flex justify-between mt-12 font-bold text-xl '>
//               <h1 className='text-gray-600 mt-2'>Advance Details</h1>
//               <button onClick={handleRtaClick}><MdAddBox className='text-blue-500 text-5xl'/></button>
//             </div>
//             <div className='border border-gray-300 shadow-xl'>
//             <div className="grid md:grid-cols-6 grid-cols-3 gap-4 mt-2 border-b border-gray-300 p-4">
//               <div className="col-name font-semibold ">S.No</div>
//               <div className="col-name font-semibold md:-ml-8">Date</div>
//               <div className="col-name font-semibold">Purpose</div>
//               <div className="col-name font-semibold">Currency</div>
//               <div className="col-name font-semibold">Amount</div>
//               <div className="col-name font-semibold">Documents</div>
//             </div>
//             <div className="grid md:grid-cols-6 grid-cols-3 gap-4 mt-2 p-4">
//               {advData.map((val, index) => (
//                 <React.Fragment key={index}>
//                   <input className="p-2 mr-2 w-10" name="sNo" value={index+1} readOnly />
//                   <input type="date" className='mr-40 w-[150px] border border-gray-300 h-9 px-2 outline-none' name="toDate" value={val.toDate} onChange={(e) => handleRtaInputChange(e, index)} />
//                   <input className="border border-gray-300 p-2" name="purpose" value={val.purpose} onChange={(e) => handleRtaInputChange(e, index)} />
//                   <select className="border border-gray-300 p-2" name="currency" value={val.currency} onChange={(e) => handleRtaInputChange(e, index)}>
//                     <option value="INR">INR</option>
//                     <option value="USD">USD</option>
//                   </select>
//                   <input className="border border-gray-300 p-2" name="amount" value={val.amount} onChange={(e) => handleRtaInputChange(e, index)} />
//                   <div className='flex space-x-12 ml-6 text-xl'>
//                       {/* <input type='file' name='file' onChange={(e) => uploadRtaFile(e, index)}/> */}
//                       <div className="relative">
//                         <input
//                           type="file"
//                           name="file"
//                           onChange={(e) => uploadRtaFile(e, index)}
//                           className="absolute opacity-0 cursor-pointer w-6 h-6"
//                         />
//                         <GrAttachment className="cursor-pointer text-blue-500 hover:text-blue-700" />
//                       </div>
//                       {/* <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleRtaDelete(index)}>Delete</button> */}
//                       <div onClick={() => handleRtaDelete(index)}><RiDeleteBin6Line className="cursor-pointer text-red-500 hover:text-red-700" /></div>
            
//                   </div>
                  
//                 </React.Fragment>
//               ))}
//             </div>
            
//             </div>
//             <div className='text-center space-x-4 mt-24 '>
//             <button onClick={handleSubmit} className='bg-blue-500 text-white px-6 py-2 border border-blue-500 rounded-lg'>Submit</button>
//             <button onClick={handleDraftSubmit} className='border border-gray-700 text-gray-700 px-6 py-2 rounded-lg'>Save as Draft</button>
//             <button onClick={handleCancel} className='border border-gray-700 text-gray-700 px-6 py-2 rounded-lg'>Cancel</button>
//           </div>
//           </div>
//         )}

//         {advanceType === "IOU" && (
//           <div className="">
//             <div className='flex justify-between mt-12 font-bold text-xl '>
//               <h1 className='text-gray-600 mt-2'>Advance Details</h1>
//               <button onClick={handleIouClick}><MdAddBox className='text-blue-500 text-5xl'/></button>
//             </div>
//             <div className='border border-gray-300 shadow-xl'>
//             <div className="grid md:grid-cols-6 grid-cols-3 gap-4 mt-2 border-b border-gray-300 p-4">
//               <div className="col-name font-semibold ">S.No</div>
//               <div className="col-name font-semibold md:-ml-8">Date</div>
//               <div className="col-name font-semibold">Purpose</div>
//               <div className="col-name font-semibold">Currency</div>
//               <div className="col-name font-semibold">Amount</div>
//               <div className="col-name font-semibold">Documents</div>
//             </div>
//             <div className="grid md:grid-cols-6 grid-cols-3 gap-4 mt-2 p-4">
//               {advData.map((val, index) => (
//                 <React.Fragment key={index}>
//                   <input className="p-2" name="sNo" value={index+1} readOnly />
//                   <input type="date" className='mr-40 w-[200px] border border-gray-300 h-9 px-2 outline-none' name="toDate" value={val.toDate} onChange={(e) => handleIouInputChange(e, index)} />
//                   <input className="border border-gray-300 p-2" name="purpose" value={val.purpose} onChange={(e) => handleIouInputChange(e, index)} />
//                   <select className="border border-gray-300 p-2" name="currency" value={val.currency} onChange={(e) => handleIouInputChange(e, index)}>
//                     <option value="INR">INR</option>
//                     <option value="USD">USD</option>
//                   </select>
//                   <input className="border border-gray-300 p-2" name="amount" value={val.amount} onChange={(e) => handleIouInputChange(e, index)} />
//                   <div className='flex space-x-12 ml-6 text-xl'>
//                       {/* <input type='file' name='file' onChange={(e) => uploadIouFile(e, index)}/> */}
//                       <div className="relative">
//                         <input
//                           type="file"
//                           name="file"
//                           onChange={(e) => uploadIouFile(e, index)}
//                           className="absolute opacity-0 cursor-pointer w-6 h-6"
//                         />
//                         <GrAttachment className="cursor-pointer text-blue-500 hover:text-blue-700" />
//                       </div>
//                       {/* <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleIouDelete(index)}>Delete</button> */}
//                       <div onClick={() => handleIouDelete(index)}><RiDeleteBin6Line className="cursor-pointer text-red-500 hover:text-red-700" /></div>
            
//                   </div>
//                 </React.Fragment>
//               ))}
//             </div>
//             </div>
//             <div className='text-center space-x-4 mt-24 '>
//             <button onClick={handleSubmit} className='bg-blue-500 text-white px-6 py-2 border border-blue-500 rounded-lg'>Submit</button>
//             <button onClick={handleDraftSubmit} className='border border-gray-700 text-gray-700 px-6 py-2 rounded-lg'>Save as Draft</button>
//             <button onClick={handleCancel} className='border border-gray-700 text-gray-700 px-6 py-2 rounded-lg'>Cancel</button>
//           </div>
//           </div>
//         )}


        

//       </div>
      
//     </div>
//   );
// };


// export default AddAdvance;