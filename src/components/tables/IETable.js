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
            return <tr key={index} onClick={() => props.select(a.No)}>
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

export default ImportExportTable
