import React from 'react';

const Table = ({ services }) =>
  <div>
    <h2>Services</h2>
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>city</th>
          </tr>
        </thead>
        <tbody>
          {services.map(item =>
            <tr key={item.id}>
              <td>
                <a href={'/services/' + item.id}>{item.id}</a> 
              </td>
              <td>
                <a href={'/services/' + item.id}>{item.title}</a>
              </td>
              <td>
                <a href={'/services/' + item.id}>{item.city}</a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>

export default Table;
