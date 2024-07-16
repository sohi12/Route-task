import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerTable from './comopnents/CustomerTable';  
import TransactionGraph from './comopnents/TransactionGraph';  // Correct p
import './App.css'
import { MDBInputGroup } from 'mdb-react-ui-kit';


function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {


    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const customersResponse = await axios.get('http://localhost:3000/customers');
      const transactionsResponse = await axios.get('http://localhost:3000/transactions');
      setCustomers(customersResponse.data);
      setTransactions(transactionsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const onSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
        fetchData();
    }
};

const onHandelSubmit = () => {
    if (search === '') {
        fetchData();
        return;
    }
    fetch('http://localhost:3000/transactions')
        .then((res) => res.json())
        .then((data) => {
            const filteredData = data.filter((item) => {
                const customer = customers.find(c => c.id == item.customer_id);
                return (
                    item.amount == search ||
                    (customer && customer.name.toLowerCase().includes(search.toLowerCase()))
                );
            });
            setTransactions(filteredData);
        });
};

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  // Filter transactions based on the selected customer
  const filteredTransactions = selectedCustomer
    ? transactions.filter(transaction => transaction.customerId === selectedCustomer.id)
    : transactions;

  return (
    <div>
       { <MDBInputGroup className='input1 d-flex justify-content-center w-100 h-100'>
                    <input
                        className='input2 mt-2 me-2 bar bg-white rounded-2'
                        placeholder='Search by Amount or Name'
                        onChange={onSearchChange}
                    />
                    <button
                    
                        onClick={onHandelSubmit}
                       className='btn btn-outline-info search text-white h-25 rounded-2' 
                    >
                        <i className='icon fa-solid fa-search'></i>
                        
                    </button>
                </MDBInputGroup> }
      <CustomerTable
        customers={customers}
        onCustomerSelect={handleCustomerSelect}  
      />
      {filteredTransactions.length > 0 ? (
        <TransactionGraph data={filteredTransactions} />
      ) : (
        <p>Select a customer to view their transactions</p>
      )}
    </div>
  );
}

export default App;
