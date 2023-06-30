
// import React, { useState, useEffect } from 'react';


// function  Table() {
//   const [data, setData] = useState([]);
//   const [sortOrder, setSortOrder] = useState('ascending');

//   useEffect(() => {
//     fetchData();
//   }, []);


//   async function fetchData() {
//     try {
//       const response = await fetch("https://jsonplaceholder.typicode.com/posts"); 

//       const responseData = await response.json();
//       setData(responseData);

//     } catch (error) {
//       console.error(error);
//     }
//   }

//   function sortData() {
//     const sortedData = [...data];
//     if (sortOrder === 'ascending') {
//       sortedData.sort((a, b) => a.id - b.id);
//     } else if (sortOrder === 'descending') {
//       sortedData.sort((a, b) => b.id - a.id);
//     }
//     setData(sortedData);
//   }



//   function handleSortOrderChange(order) {
//         setSortOrder(order);
//      }

//   return (
//     <div>
//       <h1>Data - Table</h1>
//       <button onClick={() => sortData('ascending')}>Ascending</button>
//       <button onClick={() => sortData('descending')}>Descending</button>
//       <table>
//         <thead>
//           <tr>
//             <th>id</th>
//             <th>userId</th>
//             <th>title</th>
//             <th>body</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((rowData) => (
//             <tr key={rowData.id}>
//               <td>{rowData.id}</td>
//               <td>{rowData.userId}</td>
//               <td>{rowData.title}</td>
//               <td>{rowData.body}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Table;

import MaterialTable from "@material-table/core"
function SimpleAction() {
  return (
    <MaterialTable
      title="Simple Action Preview"
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ]}
      data={[
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      ]}        
      actions={[
        {
          icon: 'save',
          tooltip: 'Save User',
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        }
      ]}
    />
  )
}

export default SimpleAction;