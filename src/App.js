import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  // State variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const recordsPerPage = 10;

  // Function to fetch data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      
      setData(response.data);

      setTotalPages(Math.ceil(response.data.length / recordsPerPage));

    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className='app'>
      <h1>Employee Data Table</h1>
      
      {loading ? <p>Loading...</p> : (
        <div style={{width:'100%'}}>
          <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginBottom: '20px' }}>
            <thead>
              <tr style={{background:'green',color:'white',textAlign:'left'}}>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='btnContainer'>
            <button style={{background:'green',color:'white',borderRadius:'5px'}} onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span style={{background:'green',color:'white',borderRadius:'5px',width:'30px',textAlign:'center',margin:'0 10px'}}>{currentPage}</span>
            <button style={{background:'green',color:'white',borderRadius:'5px'}} onClick={nextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
