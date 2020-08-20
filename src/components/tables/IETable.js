import React, { useState } from 'react'
import './IETable.css'

function IETable() {

  const [selected, setSelected] = useState([])

  let data = [
    {
      No: 1,
      ProductID: 12345,
      ProductName: 'AAAAAAAAA',
      Amount: 1000,
      Time: '',
    },
    {
      No: 2,
      ProductID: 2,
      ProductName: 'B',
      Amount: 2,
      Time: '',
    },
    {
      No: 3,
      ProductID: 3,
      ProductName: 'C',
      Amount: 3,
      Time: '',
    },
    {
      No: 4,
      ProductID: 4,
      ProductName: 'D',
      Amount: 4,
      Time: '',
    },
    {
      No: 5,
      ProductID: 5,
      ProductName: 'D',
      Amount: 5,
      Time: '',
    },
    {
      No: 6,
      ProductID: 4,
      ProductName: 'D',
      Amount: 4,
      Time: '',
    },
    {
      No: 7,
      ProductID: 4,
      ProductName: 'D',
      Amount: 4,
      Time: '',
    },
    {
      No: 8,
      ProductID: 4,
      ProductName: 'D',
      Amount: 4,
      Time: '',
    }
  ]

  return (
    <div className='wrapper'>
      <table cellSpacing='0'>
        <thead>
          <tr >
            <th>No.</th>
            <th>Product_ID</th>
            <th>Product_Name</th>
            <th>Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return <tr key={index} onClick={() => {
              setSelected(data[index])
            }}>
              <td>{a.No}</td>
              <td>{a.ProductID}</td>
              <td>{a.ProductName}</td>
              <td>{a.Amount}</td>
              <td>{a.Time}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default IETable
