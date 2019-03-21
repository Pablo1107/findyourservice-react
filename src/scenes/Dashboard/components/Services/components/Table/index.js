import React from 'react';
import { Link } from "react-router-dom";

const Table = ({ services, match, auth }) =>
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
                { auth ?
                    <Link to={`/admin/services/${item.id}`}>{item.id}</Link> :
                    `${item.id}`
                }
              </td>
              <td>
                { auth ?
                    <Link to={`/admin/services/${item.id}`}>{item.title}</Link> :
                    `${item.title}`
                }
              </td>
              <td>
                { auth ?
                    <Link to={`/admin/services/${item.id}`}>{item.city}</Link> :
                    `${item.city}`
                }
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>

export default Table;
