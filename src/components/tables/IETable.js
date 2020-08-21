import React from 'react'
import './IETable.css'

function ImportExportTable(props) {

  return (
    <div className='wrapper'>
      <table cellSpacing='0'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Product_ID</th>
            <th>Product_Name</th>
            <th>Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((a, index) => {
            return <tr key={index} onClick={() => props.select(a.no)}>
              <td>{a.no}</td>
              <td>{a.productid}</td>
              <td>{a.productname}</td>
              <td>{a.amount}</td>
              <td>{a.time}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export { ImportExportTable }
