import React, { useEffect, useState } from 'react';
// import { useEffect } from 'react';

const CustomerTable = ({ onCustomerSelect }) => {

  const [customer,setCustomer]= useState([])
  const [trans,setTrans]=useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/customers')
    .then((res) => res.json())
    .then((data) => setCustomer(data));

    fetch('http://localhost:3000/transactions')
    .then((res)=>res.json())
    .then((data)=>setTrans(data))
        
}, []);
const handleCustomerClick = (customer) => {
    if (onCustomerSelect) {
      onCustomerSelect(customer);
    }
  };


  return (
    <div>
      <h2 className='cust'>Customer Table</h2>
      <table>
      <thead>
            <tr>
                {/* <th style={{ border: '1px solid black' }}>ID</th> */}
                <th style={{ border: '1px solid black' }}>Customer ID</th>
                <th style={{ border: '1px solid black' }}>Name</th>
                <th style={{ border: '1px solid black' }}>Date</th>
                <th style={{ border: '1px solid black' }}>Amount</th>
            </tr>
        </thead>
        <tbody>
            {trans.map((tran) => (
                
                <tr onClick={()=> handleCustomerClick(tran.customer_id)} key={tran.id}>
                    {/* <td style={{ border: '1px solid black' }}>{tran.id}</td> */}
                    <td style={{ border: '1px solid black' }}>{tran.customer_id}</td>
                   {
                    customer.map((item,index)=>{
                      if(item.id==tran.customer_id){
                        return  <td style={{ border: '1px solid black' }}>{item.name}</td>
                      }
                    })
                   }
                    <td style={{ border: '1px solid black' }}>{tran.date}</td>
                    <td style={{ border: '1px solid black' }}>{tran.amount}</td>
                  
                    </tr>
            ))}
        </tbody>
</table>

    </div>
)
}

export default CustomerTable;

 