// import {useEffect, useState} from 'react';
// const DateList = () => {
//     const [LEARN, setLEARN] = useState({
//         L: '',
//         E: '',
//         A: '',
//         R: '',
//         N: ''
//     });

//     const fetchLEARNData = async (date: string) => {
//         try {
//             const response = await fetch(`http://localhost:5001/api/learn/${date}`);
//             if (response.ok) {
//                 const data = await response.json();
//                 setLEARN({
//                     L: data.l,
//                     E: data.e,
//                     A: data.a,
//                     R: data.r,
//                         N: data.n
//                 });
//             } else {
//                 alert('No data found');
//             }
//         } catch (error) {
//             console.error('Error fetching LEARN data: ', error);
//             alert('Error fetching LEARN data');
//         }
//     };
    
    
//     return (
//         <div className="date-list">
//             <h3>Select a Date:</h3>
//             {dates.map((date, index) => (
//                 <button key={index} onClick={() => fetchLEARNData(date)} className="date-button">{date}</button>
//             ))}
//         </div>
//     );
// };

// export default DateList;