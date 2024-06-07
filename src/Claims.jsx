import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { FiUpload } from "react-icons/fi";
import { SiAddthis } from "react-icons/si";

import axios from 'axios';
import { format } from 'date-fns'; // Import the format function
import AddAdvance from './AddAdvance';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { useLocalStorage } from 'react-use';
import * as XLSX from 'xlsx';
import AddClaims from './AddClaims';
import { CiSearch } from "react-icons/ci";
import Service from './Service';







const Claims = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [filteredAdvClaims, setFilteredAdvClaims] = useState([]);
  const options = [currentYear.toString(), (currentYear - 1).toString()];
  const [selectedSection, setSelectedSection] = useState('expense');
  const [showAddClaims, setShowAddClaims] = useState(false);
  const [showAdvance, setShowAdvance] = useState(false);
  const [advClaims, setAdvClaims] = useState([]);
  const [expenseTotals, setExpenseTotals] = useState({ approved: 0, claimed: 0, rejected: 0, pending: 0});
  const [advanceTotals, setAdvanceTotals] = useState({ approved: 0, claimed: 0, rejected: 0, pending: 0});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [currentAdvPage, setCurrentAdvPage] = useState(1);
  const advItemsPerPage = 5;
  const [value, setValue] = useLocalStorage('expType', 'exp');
  const [searchQuery, setSearchQuery] = useState('');



  const getTypeBackgroundColor = (status) => {
    switch (status) {
      case 'Saved as Draft':
        return '#c9c4c4';
      case 'Awaiting approval':
        return '#b2d8f5';
      case 'Rejected':
        return '#fbafa3';
      case 'Approved':
        return '#faff9e';
      case 'Claimed':
        return '#bdfd9b';
      default:
        return 'transparent';
    }
  };


  useEffect(() => {
    // Helper function to filter claims by year
    const filterByYear = (claims, year) => {
      return claims.filter(claim => {
        const claimYear = new Date(claim.createdDate).getFullYear().toString();
        return claimYear === year;
      });
    };
  
    // Function to calculate expense totals
    const calculateExpenseTotals = (filteredClaims) => {
      const approved = filteredClaims.reduce((total, claim) => (claim.status === 'Approved' ? total + claim.amount : total), 0);
      const claimed = filteredClaims.reduce((total, claim) => (claim.status === 'Claimed' ? total + claim.amount : total), 0);
      const rejected = filteredClaims.reduce((total, claim) => (claim.status === 'Rejected' ? total + claim.amount : total), 0);
      const pending = filteredClaims.reduce((total, claim) => (claim.status === 'Awaiting approval' ? total + claim.amount : total), 0);
      setExpenseTotals({ approved, claimed, rejected, pending });
    };
  
    // Function to calculate advance totals
    const calculateAdvanceTotals = (filteredAdvClaims) => {
      const approved = filteredAdvClaims.reduce((total, advClaim) => (advClaim.status === 'Approved' ? total + advClaim.amount : total), 0);
      const claimed = filteredAdvClaims.reduce((total, advClaim) => (advClaim.status === 'Claimed' ? total + advClaim.amount : total), 0);
      const rejected = filteredAdvClaims.reduce((total, advClaim) => (advClaim.status === 'Rejected' ? total + advClaim.amount : total), 0);
      const pending = filteredAdvClaims.reduce((total, advClaim) => (advClaim.status === 'Awaiting approval' ? total + advClaim.amount : total), 0);
      setAdvanceTotals({ approved, claimed, rejected, pending });
    };
  
    // Filter claims and advClaims based on the selected year
    const filteredClaims = filterByYear(claims, selectedYear);
    const filteredAdvClaims = filterByYear(advClaims, selectedYear);
  
    // Calculate the totals
    calculateExpenseTotals(filteredClaims);
    calculateAdvanceTotals(filteredAdvClaims);
  }, [claims, advClaims, selectedYear]);


// useEffect(() => {
//     const fetchData = (apiUrl) => {
//       return axios.get(apiUrl)
//         .then(response => response.data)
//         .catch(error => {
//           console.error('Error fetching data:', error);
//           return []; // Return an empty array if there's an error
//         });
//     };

//     const fetchAllData = () => {
//       //const conveyancePromise = fetchData("http://localhost:8080/conveyance");
//        const uploadMiscellaneousPromise = fetchData("http://localhost:8080/miscellaneous");
//        const conveyancePromise = Service.getConveyanceData();
//       // const uploadMiscellaneousPromise = Service.getUploadMiscellaneousData();
//       const foodItemsPromise = fetchData("http://localhost:8080/food_items");
//       const mobileItemsPromise = fetchData("http://localhost:8080/mobile");
//       const travelPromise = fetchData("http://localhost:8080/travel");

//       // Wait for all promises to resolve and merge their results into a single array
//       return Promise.all([conveyancePromise, uploadMiscellaneousPromise, foodItemsPromise, mobileItemsPromise, travelPromise])
//         .then(results => results.flat()); // Merge the arrays
//     };

//     fetchAllData()
//       .then(mergedData => {
//         setClaims(mergedData); // Update claims state with merged data
//       });
//   }, []);

useEffect(() => {
  const fetchData = (apiUrl) => {
    return axios.get(apiUrl)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching data:', error);
        return []; // Return an empty array if there's an error
      });
  };

  const fetchAllData = () => {
    const conveyancePromise = Service.getConveyanceData();
    const miscellaneousPromise = Service.getMiscellaneousData();
    const foodItemsPromise = Service.getFoodItemsData();
    const mobileItemsPromise = Service.getMobileData();
    const travelPromise = Service.getTravelData();

    // Wait for all promises to resolve and merge their results into a single array
    Promise.all([
      conveyancePromise,
      miscellaneousPromise,
      foodItemsPromise,
      mobileItemsPromise,
      travelPromise,
    ])
      .then(results => {
        setClaims(results.flat()); // Update claims state with merged data
      })
      .catch(error => {
        console.error('Error fetching all data:', error);
      });
  };

  fetchAllData();
}, []);


  // useEffect(() => {
  //   const fetchClaimsData = () => {
  //     return axios.get("http://localhost:8080/advClaims")
  //       .then(response => response.data)
  //       .catch(error => {
  //         console.error('Error fetching data:', error);
  //         return []; // Return an empty array if there's an error
  //       });
  //   };
  
  //   fetchClaimsData()
  //     .then(claimsData => {
  //       setClaims(claimsData); // Update claims state with fetched data
  //     });
  // }, []);
  


// Function to filter claims based on search query and selected year
useEffect(() => {
    // Filter claims based on the selected year
    const filteredClaims = claims.filter(claim => {
      const claimYear = new Date(claim.createdDate).getFullYear().toString(); // Extract year from the date
      return claimYear === selectedYear;
    });

    // Filter claims based on the search query
    const filteredClaimsBySearch = searchQuery.trim() === '' ? filteredClaims : filteredClaims.filter(claim => {
      return Object.entries(claim).some(([key, value]) => {
        if (typeof value === 'number' || value instanceof Date) {
          return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
        } else if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });
    });

    setFilteredClaims(filteredClaimsBySearch);
  }, [claims, selectedYear, searchQuery]);

// Function to filter advClaims based on search query and selected year
useEffect(() => {
  // Filter advClaims based on the selected year
  const filteredAdvClaims = advClaims.filter(advClaim => {
    const advClaimYear = new Date(advClaim.createdDate).getFullYear().toString(); // Extract year from the date
    return advClaimYear === selectedYear;
  });

  // Filter advClaims based on the search query
  const filteredAdvClaimsBySearch = searchQuery.trim() === '' ? filteredAdvClaims : filteredAdvClaims.filter(advClaim => {
    return Object.entries(advClaim).some(([key, value]) => {
      if (typeof value === 'number' || value instanceof Date) {
        return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
      } else if (typeof value === 'string') {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
  });

  setFilteredAdvClaims(filteredAdvClaimsBySearch);
}, [advClaims, selectedYear, searchQuery]);

     

   // Event handler for updating searchQuery state
   const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };

    const handleDropdownChange = (event) => {
      const selectedYear = event.target.value;
      setSelectedYear(selectedYear);
    };


  const toggleSection = (section) => {
    setSelectedSection(section === selectedSection ? null : section);
  };

  const handleAddExp = () => {
    setShowAddClaims(true);
  };

  const closeAddClaims = () => {
      setShowAddClaims(false);
  };

  const handleAddAdv = () => {
    setShowAdvance(true);
  };

  const closeAdvance = () => {
    setShowAdvance(false);
  };




// Calculate total number of pages
const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = Math.min(startIndex + itemsPerPage, filteredClaims.length); // Ensure endIndex doesn't exceed filteredClaims.length
const currentClaims = filteredClaims.slice(startIndex, endIndex);

const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
};
const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
};


//Export to Excel
const exportDataToExcel = (data, sheetName, fileName) => {
  if (!Array.isArray(data)) {
      console.error('The data argument is not an array:', data);
      return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
};
const exportToExcel = () => {
  exportDataToExcel(filteredClaims, 'Claims', 'claims_data.xlsx');
};
// const exportAdvToExcel = () => {
//   exportDataToExcel(currentAdvClaims, 'Advance Claims', 'advance_claims_data.xlsx');
// };

  return (
    <div className='w-full h-screen bg-gray-200 absolute overflow-x-auto'>
      <div className='bg-white text-black rounded-md relative top-1 m-2 md:p-6 p-2 '>
        <h1 className='font-semibold text-lg'>Reimbursement / Advance</h1>
        <div className='flex justify-center mt-4 border md:mx-[580px] mx-[116px]'>
        <select value={selectedYear} onChange={handleDropdownChange}>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
        </div>
        <div className='flex justify-center mt-4'>
          <div className='flex md:text-med text-sm font-semibold text-gray-600 gap-2'>           
            <div onClick={() => {toggleSection('expense'); setValue('exp')}} className={`cursor-pointer mr-4 ${value=='exp' ? 'text-blue-400 underline lg:underline-offset-4' : ''}`}>
              My Expense
            </div>
            <div onClick={() => {toggleSection('advance'); ; setValue('adv')}} className={`cursor-pointer ${value == 'adv' ? 'text-blue-400 underline md:underline-offset-4' : ''}`}>
              My Advance
            </div>
          </div>
        </div>

        <div className='border-b-[1px] border-gray-300 mt-4 -ml-6'></div> {/* Add this line */}       
        {value=="exp" ? (
          <div className="mt-4">
          {/* Render Expense content here */}
          <h2 className='font-semibold mb-4'>Expense Overview</h2>          
            <div className='grid md:grid-cols-10 grid-cols-6 space-x-3'>
              <div className='col-span-6 border border-gray-300 shadow-xl'>
                <div className='grid grid-cols-6  md:p-[10px] p-1'>
                  {/* First 2 columns */}
                  <div className='col-span-2 text-center border-r-[1px] border-gray-300'>
                    <h2 className='text-med lg:mt-8 md:mt-3 sm:mt-2 text-yellow-500 font-semibold'>Approved</h2>
                    <p className='md:p-3 p-2 md:text-lg text-med md:mb-6'>{expenseTotals.approved}</p>
                  </div>
                  <div className='col-span-2 text-center border-r-[1px] border-gray-300'>
                    <h2 className='text-med lg:mt-8 md:mt-3 sm:mt-2 text-green-500 font-semibold'>Claimed</h2>
                    <p className='md:p-3 p-2 md:text-lg text-med md:mb-6'>{expenseTotals.claimed}</p>
                  </div>
                  <div className='col-span-2 text-center'>
                    <h2 className='text-med lg:mt-8 md:mt-3 sm:mt-2 text-red-500 font-semibold '>Rejected</h2>
                    <p className='md:p-3 p-2 md:text-lg text-med md:mb-6'>{expenseTotals.rejected}</p>
                  </div>
                </div>
              </div>
              <div className='col-span-4 md:ml-2 ml-12 md:mr-0 -mr-16'>
                <div className='grid grid-cols-4 md:mt-0 mt-2 md:mr-0 -mr-16'>
                  <div className='col-span-2 text-center border border-gray-300 lg:p-[8px] md:p-[2px] sm:p-0 shadow-xl'>
                    <img src='/money-in-wallet-icon-psd-53169.jpg' alt='Money in Wallet Icon' className='md:w-10 w-7 md:mx-[88px] mx-[51px] md:mt-2 mt-4'/>
                    <h2 className='md:font-semibold md:text-med lg:mt-2 md:mt-3 sm:mt-2 text-gray-700'>Pending Claim Amount</h2>
                    <p className='md:p-2 p-2 md:text-xl text-base text-blue-500 font-medium'>INR {expenseTotals.pending}</p> 
                  </div>
                  <div className='flex md:pl-16  mt-2'>
                    <img src='/reports.png' alt='reports' className='rounded-full md:w-[50px] w-30px md:h-[50px] h-[30px] mt-1 md:ml-0 ml-20' />
                    <div className='md:text-lg text-sm col-span-2 text-blue-400 md:font-semibold border border-blue-400 mb-24 md:px-7 md:py-1 mt-2 text-center'>Reports</div>
                  </div>
              </div>
            </div>
          </div>
          <div className='md:p-2 p-1 mt-4 border border-gray-300 '>
            <div className='flex justify-between'>
              <h2 className='font-semibold'>My Expenses</h2>
              <div className='flex md:space-x-8 space-x-3 md:text-3xl text-2xl'>
                <button onClick={exportToExcel}><FiUpload className='text-blue-600'/></button>
                <button  onClick={handleAddExp}><SiAddthis className='text-blue-600'/></button> {/* Add onClick handler */}
              </div>
              {/* Render PopupForm if showPopup is true */}
              {showAddClaims && <AddClaims onClose={closeAddClaims} />}
            </div>
            <div className="flex justify-between md:px-[124px] px-2 border-b-2 md:py-6 py-4">
              <div className='flex'>
              <CiSearch className='md:mt-[13px] mt-[8px] z-[5px] md:ml-12 text-gray-400 '/>
            <input
                type="text"
                placeholder="Search in expense"
                value={searchQuery}
                onChange={handleSearchChange}
                className='border md:w-[400px] w-40 md:px-14 px-5 md:-ml-10 -ml-4 text-sm shadow-md md:py-1'
                
            /> 
            </div>
            <div className='flex justify-between mt-4 md:text-base text-sm'>
                <span className='pagination-info mr-3'>
                  {currentPage}-{totalPages} / {totalPages}
                </span>
              <div className='flex items-center space-x-4'>
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className='pagination-button'
                >
                  <GrPrevious />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className='pagination-button'
                >
                  <GrNext />
                </button>
              </div>
            </div>
            </div>
            <div className='overflow-y-auto h-80'>
            {currentClaims.map((claim) => (
            <div key={claim.id} className='mt-2'>
              <div className='card border border-gray-300 my-6 md:mx-2 mx-0 grid md:grid-cols-12 grid-cols-12 space-x-4 p-1 md:pb-1 shadow-xl'>
              {claim.expenseType === 'Conveyance' ? (
                    <div className='md:col-span-1 col-span-1 md:text-base text-xs md:p-5 py-12'>
                      <img src="/fuel-pump.png" alt="Conveyance" className="md:w-12 w-6 md:h-12 h-6" />
                    </div>
                  ) : claim.expenseType === 'Travel' ? (
                    <div className='md:col-span-1 col-span-1 md:text-base text-xs md:p-5 py-12'>
                      <img src="/airplane.png" alt="Travel" className="md:w-12 w-6 md:h-12 h-6" />
                    </div>
                  ) : claim.expenseType === 'Food' ? (
                    <div className='md:col-span-1 col-span-1 md:text-base text-xs md:p-5 py-12'>
                      <img src="/burger.png" alt="Food" className="md:w-12 w-6 md:h-12 h-6" />
                    </div>
                  ) : claim.expenseType === 'Mobile' ? (
                    <div className='md:col-span-1 col-span-1 md:text-base text-xs md:p-5 py-12'>
                      <img src="/smartphone.png" alt="Food" className="md:w-12 w-6 md:h-12 h-6" />
                    </div>
                  ) : claim.expenseType === 'Miscellaneous' ? (
                    <div className='md:col-span-1 col-span-1 md:text-base text-xs md:p-5 py-12'>
                      <img src="/belongings.png" alt="Food" className="md:w-12 w-6 md:h-12 h-6" />
                    </div>
                  ) : 
                    <div className='md:col-span-1 col-span-1 md:text-base text-xs md:p-5 py-12'>                     
                    </div>
                    }
                <div className='md:col-span-2 col-span-2 space-y-2 md:text-base text-[10px]'>
                  <div className='flex mt-1 md:ml-0 -ml-2'>
                      <div className='text-gray-500 font-semibold'>Request No. </div>
                      <div className='font-semibold ml-1'> {claim.requestNo}</div> 
                    </div>
                    <div className='text-gray-500 font-semibold md:ml-0 -ml-2'>Type of expense</div>
                    <div className='font-semibold pb-4 md:ml-0 -ml-2'>{claim.expenseType}</div>
                  </div>                 
                  <div className='md:col-span-2 col-span-2 space-y-2 md:text-base text-[10px] md:pl-5 -pl-4'>
                    <div className='flex mt-[5.25px] md:ml-0 ml-3'>
                      <div className='text-gray-500 font-semibold'>WBS. </div>
                      <div className='font-semibold ml-1'> {claim.wbsId}</div> 
                    </div>
                    <div className=' text-gray-500 font-semibold md:ml-0 ml-3'>Date</div>
                    <div className='pb-4 font-semibold md:ml-0 ml-3'>{format(new Date(claim.createdDate), 'dd-MM-yyyy')}</div>
                  </div>
                <div className='md:col-span-3 col-span-3 break-words space-y-2 md:text-base text-[10px] '>
                    <div className='md:mt-8 mt-[5.25px] text-gray-500 font-semibold'>Description</div>
                    <div className='font-semibold'>bdbckdsbdskvbkvdskj bdjsk</div>
                  </div>
                <div className='md:col-span-2 col-span-2 space-y-2 md:text-base text-[10px]'>
                  <div className='mt-8 text-gray-500 font-semibold md:ml-0 -ml-2'>Amount</div>
                  <div className='font-semibold md:ml-0 -ml-2'>{claim.amount}</div>
                </div>
                <div className='md:col-span-2 col-span-2 space-y-2 md:text-base text-[10px]'>
                  <div className='mt-8 md:ml-0 -ml-2 text-gray-500 font-semibold'>Status</div>
                  <div style={{ backgroundColor: getTypeBackgroundColor(claim.status) }} className='md:w-[150px] w-[48px] text-center md:p-[2.5px] p-[1.5px] rounded-md md:ml-0 -ml-3'>{claim.status}</div>
                </div>
              </div>             
            </div>           
            ))}
            </div>
          </div>          
        </div>
        ):""}
        { value=="adv" ? (
          <div className="mt-4">
          {/* Render Advance content here */}
          <h2 className='font-semibold mb-4'>Advance Overview</h2>
          <div className='grid md:grid-cols-10 grid-cols-6 space-x-3'>
              <div className='col-span-6 border border-gray-300 shadow-xl'>
                <div className='grid grid-cols-6  md:p-[10px] p-1'>
                  {/* First 2 columns */}
                  <div className='col-span-2 text-center border-r-[1px] border-gray-300'>
                    <h2 className='text-med lg:mt-8 md:mt-3 sm:mt-2 text-yellow-500 font-semibold'>Approved</h2>
                    <p className='md:p-3 p-2 md:text-lg text-med md:mb-6'>{advanceTotals.approved}</p>
                  </div>
                  <div className='col-span-2 text-center border-r-[1px] border-gray-300'>
                    <h2 className='text-med lg:mt-8 md:mt-3 sm:mt-2 text-green-500 font-semibold'>Claimed</h2>
                    <p className='md:p-3 p-2 md:text-lg text-med md:mb-6'>{advanceTotals.claimed}</p>
                  </div>
                  <div className='col-span-2 text-center'>
                    <h2 className='text-med lg:mt-8 md:mt-3 sm:mt-2 text-red-500 font-semibold '>Rejected</h2>
                    <p className='md:p-3 p-2 md:text-lg text-med md:mb-6'>{advanceTotals.rejected}</p>
                  </div>
                </div>
              </div>
              <div className='col-span-4 md:ml-2 ml-12 md:mr-0 -mr-16 '>
                <div className='grid grid-cols-4 md:mt-0 mt-2 md:mr-0 -mr-16'>
                  <div className='col-span-2 text-center border border-gray-300 lg:p-[8px] md:p-[2px] sm:p-0 shadow-xl'>
                    <img src='/money-in-wallet-icon-psd-53169.jpg' alt='Money in Wallet Icon' className='md:w-10 w-7 md:mx-[88px] mx-[51px] md:mt-2 mt-4'/>
                    <h2 className='md:font-semibold md:text-med lg:mt-2 md:mt-3 sm:mt-2 text-gray-700'>Pending Advance Amount</h2>
                    <p className='md:p-2 p-2 md:text-xl text-base text-blue-500 font-medium'>INR {advanceTotals.pending}</p> 
                  </div>
                  <div className='flex md:pl-16  mt-2'>
                    <img src='/reports.png' alt='reports' className='rounded-full md:w-[50px] w-30px md:h-[50px] h-[30px] mt-1 md:ml-0 ml-20' />
                    <div className='md:text-lg text-sm col-span-2 text-blue-400 md:font-semibold border border-blue-400 mb-24 md:px-7 md:py-1 mt-2 text-center'>Reports</div>
                  </div>
              </div>
              </div>
            </div>
            <div className='md:p-2 p-1 mt-8 border border-gray-300'>
              <div className='flex justify-between'>
                <h2 className='font-semibold'>My Advances</h2>
                <div className='flex md:space-x-8 space-x-3 md:text-3xl text-2xl'>
                  {/* <button onClick={exportAdvToExcel}><FiUpload className='text-blue-600'/></button> */}
                  <button><FiUpload className='text-blue-600'/></button>
                  <button  onClick={handleAddAdv}><SiAddthis className='text-blue-600'/></button> {/* Add onClick handler */}
                </div>
                {/* Render PopupForm if showPopup is true */}
                {showAdvance && <AddAdvance onClose={closeAdvance} />}
              </div>
              <div className="flex mt-2 justify-between md:px-[124px] px-2 border-b-2 py-8">
              <div className='flex'>
                  <CiSearch className='md:mt-[13px] mt-[7px] z-10 md:ml-12 text-gray-400 '/>
                  <input
                    type="text"
                    placeholder="Search in advance"
                    value={searchQuery}
                    onChange={handleSearchChange}    
                    className='border md:w-[400px] px-14 md:-ml-10 -ml-5 text-sm shadow-md py-1'            
                  />
                  </div>
                  <div className='justify-between mt-4 md:text-base text-sm'>Filters</div>
                  {/* <div className='flex justify-between mt-4'> 
                        <span className='pagination-info mr-3'>
                            {currentAdvPage} - {advTotalPages} / {advTotalPages}
                        </span>
                        <div className='flex items-center space-x-4'>
                            <button
                                onClick={handleAdvPreviousPage}
                                disabled={currentAdvPage === 1}
                                className='pagination-button'
                            >
                                <GrPrevious />
                            </button>                      
                            <button
                                onClick={handleAdvNextPage}
                                disabled={currentAdvPage === advTotalPages}
                                className='pagination-button'
                            >
                                <GrNext />
                            </button>
                        </div>
                    </div> */}

              </div>
              <div className='overflow-y-auto h-80'>
              {advClaims && advClaims.map((advClaim ) => (
              <div key={advClaim.id} className=' mt-4'>
                <div className='card border border-gray-300 my-8 md:mx-2 mx-0 grid md:grid-cols-12 grid-cols-12 space-x-4 p-2 pb-4 shadow-xl'>
                  {advClaim.expenseType === 'RTA' ? (
                    <div className='md:col-span-1 col-span-1 md:text-base text-xs p-5'>
                      <img src="/user.png" alt="RTA" className="w-12 h-12" />
                    </div>
                  ) : advClaim.expenseType === 'IOU' ? (
                    <div className='md:col-span-1 col-span-1 md:text-base text-xs p-5'>
                      <img src="/office-building.png" alt="IOU" className="w-12 h-12" />
                    </div>
                  ) : 
                  <div className='md:col-span-1 col-span-1 md:text-base text-xs p-5'>                    
                  </div>
                  }
                  <div className='md:col-span-2 col-span-2 space-y-2 md:text-base text-xs'>
                    <div className='flex mt-1'>
                      <div className='text-gray-500 font-semibold'>Request No. </div>
                      <div className='font-semibold ml-1'>12345</div> 
                    </div>
                    <div className='text-gray-500 font-semibold'>Type of Advance</div>
                    <div className='font-semibold pb-4'>{advClaim.expenseType}</div>
                  </div>
                  <div className='md:col-span-2 col-span-2 space-y-2 md:text-base text-xs md:pl-5 -pl-4'>
                    <div className='flex mt-1'>
                      <div className='text-gray-500 font-semibold'>WBS. </div>
                      <div className='font-semibold ml-1'>123</div> 
                    </div>
                    <div className='md:ml-0 -ml-3 text-gray-500 font-semibold'>Date</div>
                    <div className='pb-4 md:ml-0 -ml-3 font-semibold'>{format(new Date(advClaim.createdDate), 'dd-MM-yyyy')}</div>
                  </div>
                  <div className='md:col-span-3 col-span-3 break-words space-y-2 md:text-base text-xs md:pl-0  '>
                    <div className='md:mt-8 text-gray-500 font-semibold'>Description</div>
                    <div className='font-semibold'>bdbckdsbdskvbkvdskj bdjsk bdvbdkjsvbdjk vdjs vd</div>
                  </div>
                  <div className='md:col-span-2 col-span-2 space-y-2 md:text-base text-xs md:pl-2 pl-5'>
                    <div className='md:mt-8 text-gray-500 font-semibold'>Amount</div>
                    <div className='font-semibold'>{advClaim.amount}</div>
                  </div>
                  <div className='md:col-span-2 space-y-2 md:text-base text-xs'>
                    <div className='mt-8 md:ml-0 -ml-2 text-gray-500 font-semibold'>Status</div>
                    <div style={{ backgroundColor: getTypeBackgroundColor(advClaim.status) }} className='bg-gray-300 md:w-[150px] w-[80px] text-center  md:p-[2.5px] p-[1.5px] rounded-md md:-ml-2 -ml-4'>Draft</div>
                  </div>
                </div>    
              </div>
              ))}
            </div>
            </div>
          </div>
        ):""}
      </div>
    </div>
  );
};

export default Claims;