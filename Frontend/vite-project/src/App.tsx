// import "./App.css";
// import heroImage from "./assets/image.png";
// import bankLogo from "./assets/image.png";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const API_BASE_URL = import.meta.env.DEV
//   ? "http://localhost:3000"
//   : "https://toofanloan.onrender.com";

// const MIN_DISBURSE_DATE = "2025-10-25";
// const MAX_DISBURSE_DATE = "2030-12-31";
// const FRESH_TARGET = 10.5 * 10000000; // 10.5 Crores (50% of 21 Cr)
// const REPEAT_TARGET = 10.5 * 10000000; // 10.5 Crores (50% of 21 Cr)
// // Combined Total Target = 21 Crores

// interface Data {
//   name: string;
//   cases: number;
//   amount: number;
//   repayAmount: number;
//   receivedAmount: number;
//   receivePercent: number;
//   date?: string;
// }

// function App() {

//     const [fresh, setFresh] = useState<Data[]>([]);
//     const [repeat, setRepeat] = useState<Data[]>([]);
//     const [month, setMonth] = useState(() => {
//     // Get current month on load
//     const now = new Date();
//     const year = now.getFullYear();
//     //const monthNum = String(now.getMonth() + 1).padStart(2, '0');
//     const shortYear = String(year).slice(-2);
//     const months = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ];
//     return `${months[now.getMonth()]}'${shortYear}`;
//   });
//     const [searchTerm, setSearchTerm] = useState("");
//     const [viewMode, setViewMode] = useState("All");
//     const [dateFrom, setDateFrom] = useState("");
//     const [dateTo, setDateTo] = useState("");
//     const [appliedFrom, setAppliedFrom] = useState("");
//     const [appliedTo, setAppliedTo] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
//     const [filtersCollapsed, setFiltersCollapsed] = useState(false);

//     const fetchLeaderboard = () => {
//     setLoading(true);

//     const query = new URLSearchParams();

//   if (month !== "All") {
//     query.set("month", month);
//   }

//   if (appliedFrom) {
//     query.set("fromDate", appliedFrom);
//   }

//   if (appliedTo) {
//     query.set("toDate", appliedTo);
//   }

//   axios
//     .get(`${API_BASE_URL}/api/leaderboard?${query.toString()}`)
//     .then((res) => {
//       setFresh(
//         res.data.fresh.map((item: any) => ({
//           ...item,
//           repayAmount: item.actualRepayAmount ?? 0,
//         }))
//       );
//       setRepeat(
//         res.data.repeat.map((item: any) => ({
//           ...item,
//           repayAmount: item.actualRepayAmount ?? 0,
//         }))
//       );
//       setLastUpdated(new Date());
//     })
//     .catch((err) => {
//       console.error(err);
//     })
//     .finally(() => {
//       setLoading(false);
//     });
// };

//   useEffect(() => {
//   fetchLeaderboard();
// }, [month, appliedFrom, appliedTo]);

// const applyDateRange = () => {
//   setAppliedFrom(dateFrom);
//   setAppliedTo(dateTo);
//   setMonth("All");
// };

// const filteredFresh = fresh.filter((item) =>
//   item.name.toLowerCase().includes(searchTerm.toLowerCase())
// );

// const filteredRepeat = repeat.filter((item) =>
//   item.name.toLowerCase().includes(searchTerm.toLowerCase())
// );

// const showFresh =
//   viewMode === "All" ||
//   viewMode === "Fresh";

// const showRepeat =
//   viewMode === "All" ||
//   viewMode === "Repeat";

// // ============================
// // CALCULATE ACHIEVEMENTS
// // ============================

// const freshTotal = filteredFresh.reduce((sum, item) => sum + item.amount, 0);
// const repeatTotal = filteredRepeat.reduce((sum, item) => sum + item.amount, 0);

// const freshPercent = (freshTotal / FRESH_TARGET) * 100;
// const repeatPercent = (repeatTotal / REPEAT_TARGET) * 100;
// const combinedTargetPercent =
//   ((freshTotal + repeatTotal) / (FRESH_TARGET + REPEAT_TARGET)) * 100;

// const visibleData = [
//   ...(showFresh ? filteredFresh : []),
//   ...(showRepeat ? filteredRepeat : []),
// ];

// const overallAmount = visibleData.reduce((sum, item) => sum + item.amount, 0);
// const overallRepayAmount = visibleData.reduce(
//   (sum, item) => sum + item.repayAmount,
//   0
// );
// const overallReceivedAmount = visibleData.reduce(
//   (sum, item) => sum + item.receivedAmount,
//   0
// );
// const overallReceivedPercent =
//   overallRepayAmount > 0
//     ? (overallReceivedAmount / overallRepayAmount) * 100
//     : 0;

// // ============================
// // TARGET CARD (SINGLE CARD)
// // ============================

// const renderTargetCard = () => (
//   <div className="target-card-main">
//     <h2 className="target-main-title">🎯 Current Target & Achievement</h2>

//     <div className="target-grid">
//       {/* FRESH SECTION */}
//       {showFresh && (
//         <div className="target-item fresh-target">
//           <div className="target-item-header">
//             <h3>Fresh Loans</h3>
//             <span className="achievement-percent">{freshPercent.toFixed(1)}%</span>
//           </div>

//           <div className="progress-bar">
//             <div
//               className="progress-fill fresh"
//               style={{ width: `${Math.min(freshPercent, 100)}%` }}
//             ></div>
//           </div>

//           <div className="amount-row">
//             <div className="amount-item">
//               <span className="label">Achieved</span>
//               <span className="value">₹ {(freshTotal / 10000000).toFixed(2)}Cr</span>
//             </div>
//             <div className="amount-item">
//               <span className="label">Target</span>
//               <span className="value">₹ {(FRESH_TARGET / 10000000).toFixed(1)}Cr</span>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* REPEAT SECTION */}
//       {showRepeat && (
//         <div className="target-item repeat-target">
//           <div className="target-item-header">
//             <h3>Repeat Loans</h3>
//             <span className="achievement-percent">{repeatPercent.toFixed(1)}%</span>
//           </div>

//           <div className="progress-bar">
//             <div
//               className="progress-fill repeat"
//               style={{ width: `${Math.min(repeatPercent, 100)}%` }}
//             ></div>
//           </div>

//           <div className="amount-row">
//             <div className="amount-item">
//               <span className="label">Achieved</span>
//               <span className="value">₹ {(repeatTotal / 10000000).toFixed(2)}Cr</span>
//             </div>
//             <div className="amount-item">
//               <span className="label">Target</span>
//               <span className="value">₹ {(REPEAT_TARGET / 10000000).toFixed(1)}Cr</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>

//     {/* COMBINED INFO */}
//     {showFresh && showRepeat && (
//       <div className="target-combined">
//         <div className="combined-stat">
//           <span className="combined-label">Target Achievement</span>
//           <span className="combined-value">₹ {((freshTotal + repeatTotal) / 10000000).toFixed(2)}Cr</span>
//         </div>
//         <div className="combined-stat">
//           <span className="combined-label">Total Target Achievement</span>
//           <span className="combined-value">₹ {((FRESH_TARGET + REPEAT_TARGET) / 10000000).toFixed(1)}Cr</span>
//         </div>
//         <div className="combined-stat">
//           <span className="combined-label">Overall Achievement %</span>
//           <span className="combined-percentage">{combinedTargetPercent.toFixed(1)}%</span>
//         </div>
//         <div className="summary-progress-row">
//           <div className="summary-progress">
//             <div
//               className="summary-progress-fill target"
//               style={{ width: `${Math.min(combinedTargetPercent, 100)}%` }}
//             ></div>
//           </div>
//         </div>
//       </div>
//     )}

//     <div className="overall-summary">
//       <h3>Overall Amount Summary</h3>
//       <div className="overall-grid">
//         <div className="overall-stat">
//           <span className="overall-label">Total Amount</span>
//           <span className="overall-value">₹ {overallAmount.toLocaleString()}</span>
//         </div>
//         <div className="overall-stat">
//           <span className="overall-label">Total Repay Amount</span>
//           <span className="overall-value">₹ {overallRepayAmount.toLocaleString()}</span>
//         </div>
//         <div className="overall-stat">
//           <span className="overall-label">Total Received Amount</span>
//           <span className="overall-value">₹ {overallReceivedAmount.toLocaleString()}</span>
//         </div>
//         <div className="overall-stat highlight">
//           <span className="overall-label">Overall Received %</span>
//           <span className="overall-percent">{overallReceivedPercent.toFixed(2)}%</span>
//         </div>
//         <div className="summary-progress-row">
//           <div className="summary-progress">
//             <div
//               className="summary-progress-fill received"
//               style={{ width: `${Math.min(overallReceivedPercent, 100)}%` }}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

//   // ==========================
//   // TOP 3
//   // ==========================

//   const renderTop3 = (
//     data: Data[],
//     title: string,
//     type: string
//   ) => {

//     const top3 = data.slice(0, 3);
//     const renderOrder = [1, 0, 2].filter((index) => index < top3.length);

//     return (

//       <div className={`top-box ${type}`}>

//         <h2>{title}</h2>

//         <div className="top-cards">

//           {renderOrder.map((originalIndex) => {
//             const item = top3[originalIndex];
//             return (
//               <div
//                 key={originalIndex}
//                 className={`top-card ${
//                   originalIndex === 0
//                     ? "gold"
//                     : originalIndex === 1
//                     ? "silver"
//                     : "bronze"
//                 }`}
//               >

//                 <div className="medal">
//                   {originalIndex === 0
//                     ? "🥇"
//                     : originalIndex === 1
//                     ? "🥈"
//                     : "🥉"}
//                 </div>

//                 <h3>{originalIndex + 1} PLACE</h3>

//                 <h4>{item.name}</h4>

//                 <p>
//                   ₹ {item.amount.toLocaleString()}
//                 </p>

//                 <span>
//                   {item.cases} Cases
//                 </span>

//               </div>
//             );
//           })}

//         </div>

//       </div>

//     );

//   };

//   // ==========================
//   // TABLE
//   // ==========================

//   const renderTable = (
//     data: Data[],
//     title: string,
//     type: string
//   ) => (

//     <div className={`card ${type}`}>

//       <h2>{title}</h2>

//       <div className="table-panel">

//         <div className="table-wrapper">

//         <table>

//           <thead>

//             <tr>

//               <th>#</th>

//               <th>Executive Name</th>

//               <th>No of Cases</th>

//               <th>Total Section Amount</th>

//               <th>Total Repay Amt</th>

//               <th>Total Received Amt</th>

//               <th>% Received</th>

//             </tr>

//           </thead>

//           <tbody>

//             {data.map((item, i) => (

//               <tr key={i}>

//                 <td>
//                   {i === 0
//                     ? "🥇"
//                     : i === 1
//                     ? "🥈"
//                     : i === 2
//                     ? "🥉"
//                     : i + 1}
//                 </td>

//                 <td>{item.name}</td>

//                 <td>{item.cases}</td>

//                 <td>
//                   ₹ {item.amount.toLocaleString()}
//                 </td>

//                 <td>
//                   ₹ {item.repayAmount.toLocaleString()}
//                 </td>

//                 <td>
//                   ₹ {item.receivedAmount.toLocaleString()}
//                 </td>

//                 <td>
//                   {item.receivePercent.toFixed(2)}%
//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//         </div>

//       </div>

//     </div>

//   );

//   return (
//     <div className="app">
//       <header className="app-header">
//         <div className="logo-block">
//           <div className="logo-mark">
//             <img src={bankLogo} alt="Bank logo" />
//           </div>
//           <div className="logo-copy">
//             <strong>Toofan Loan</strong>
//             <span>Smart Collections Dashboard</span>
//           </div>
//         </div>

//         <div className="header-actions">
//           <button
//             className="refresh-button"
//             onClick={fetchLeaderboard}
//             disabled={loading}
//           >
//             {loading ? "Refreshing..." : "Refresh"}
//           </button>
//           {lastUpdated && (
//             <div className="updated-info">
//               Last refreshed: {lastUpdated.toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
//             </div>
//           )}
//         </div>
//       </header>

//       <section className="dashboard-banner">
//         <img src={heroImage} alt="Dashboard" className="dashboard-image" />
//         <div className="dashboard-title">
//           <h1>Sanction Leaderboard Dashboard</h1>
//           <p>Centered high-value ranking view with fresh and repeat performance.</p>
//         </div>
//       </section>

//       {/* TARGET CARD - SINGLE CARD */}
//       {renderTargetCard()}

//       <div className={`split-layout ${filtersCollapsed ? "filters-collapsed" : ""}`}>
//         <aside className={`side-panel ${filtersCollapsed ? "collapsed" : ""}`}>
//           <div className={`filter-box ${filtersCollapsed ? "collapsed" : ""}`}>
//             <div className="filter-heading">
//               <h3>Custom Filters</h3>
//               <button
//                 type="button"
//                 className="filter-toggle"
//                 onClick={() => setFiltersCollapsed((current) => !current)}
//                 aria-expanded={!filtersCollapsed}
//                 aria-label={filtersCollapsed ? "Maximize filters" : "Minimize filters"}
//               >
//                 <span className="filter-toggle-icon" aria-hidden="true"></span>
//               </button>
//             </div>

//             {!filtersCollapsed && (
//               <div className="filter-content">
//                 <label>
//               Month
//               <select
//                 className="month-select"
//                 value={month}
//                 onChange={(e) => setMonth(e.target.value)}
//               >
//                 <option value="All">All Months</option>
//                 <option value="Oct'25">Oct'25</option>
//                 <option value="Nov'25">Nov'25</option>
//                 <option value="Dec'25">Dec'25</option>
//                 <option value="Jan'26">Jan'26</option>
//                 <option value="Feb'26">Feb'26</option>
//                 <option value="Mar'26">Mar'26</option>
//                 <option value="Apr'26">Apr'26</option>
//                 <option value="May'26">May'26</option>
//                 <option value="Jun'26">Jun'26</option>
//                 <option value="Jul'26">Jul'26</option>
//                 <option value="Aug'26">Aug'26</option>
//                 <option value="Sep'26">Sep'26</option>
//                 <option value="Oct'26">Oct'26</option>
//                 <option value="Nov'26">Nov'26</option>
//                 <option value="Dec'26">Dec'26</option>
//               </select>
//                 </label>

//                 <label>
//                   Executive Name
//                   <input
//                     className="search-input"
//                     type="text"
//                     placeholder="Search by name"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </label>

//                 <label>
//                   Date Range
//                   <div className="date-row">
//                     <input
//                       className="date-input"
//                       type="date"
//                       min={MIN_DISBURSE_DATE}
//                       max={MAX_DISBURSE_DATE}
//                       value={dateFrom}
//                       onChange={(e) => setDateFrom(e.target.value)}
//                     />
//                     <span className="date-separator">to</span>
//                     <input
//                       className="date-input"
//                       type="date"
//                       min={dateFrom || MIN_DISBURSE_DATE}
//                       max={MAX_DISBURSE_DATE}
//                       value={dateTo}
//                       onChange={(e) => setDateTo(e.target.value)}
//                     />
//                   </div>
//                   <button
//                     type="button"
//                     className="apply-button"
//                     onClick={applyDateRange}
//                   >
//                     Apply
//                   </button>
//                 </label>

//                 <label>
//                   Board View
//                   <select
//                     className="month-select"
//                     value={viewMode}
//                     onChange={(e) => setViewMode(e.target.value)}
//                   >
//                     <option value="All">Show All</option>
//                     <option value="Fresh">Fresh Only</option>
//                     <option value="Repeat">Repeat Only</option>
//                   </select>
//                 </label>
//               </div>
//             )}
//           </div>
//         </aside>

//         <main className="main-panel">
//           <div className="top-section">
//             {showFresh && renderTop3(filteredFresh, "FRESH TOP 3", "fresh")}
//             {showRepeat && renderTop3(filteredRepeat, "REPEAT TOP 3", "repeat")}
//           </div>

//           <div className="container">
//             {showFresh && renderTable(filteredFresh, "🔥 Fresh Performance", "fresh")}
//             {showRepeat && renderTable(filteredRepeat, "♻️ Repeat Performance", "repeat")}
//           </div>
//         </main>
//       </div>
//     </div>
//   );

// }

// export default App;


import "./App.css";
import heroImage from "./assets/image.png";
import bankLogo from "./assets/image.png";
import axios from "axios";
import { useEffect, useState } from "react";
import Papa from "papaparse";

const API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000"
  : "https://toofanloan.onrender.com";

const MIN_DISBURSE_DATE = "2025-10-25";
const MAX_DISBURSE_DATE = "2030-12-31";
const FRESH_TARGET = 10.5 * 10000000;
const REPEAT_TARGET = 10.5 * 10000000;

interface Data {
  name: string;
  cases: number;
  amount: number;
  repayAmount: number;
  receivedAmount: number;
  receivePercent: number;
  date?: string;
}

function App() {

    const [fresh, setFresh] = useState<Data[]>([]);
    const [repeat, setRepeat] = useState<Data[]>([]);
    const [month, setMonth] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const shortYear = String(year).slice(-2);
    const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
    return `${months[now.getMonth()]}'${shortYear}`;
  });
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState("All");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [appliedFrom, setAppliedFrom] = useState("");
    const [appliedTo, setAppliedTo] = useState("");
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [filtersCollapsed, setFiltersCollapsed] = useState(false);

    const fetchLeaderboard = () => {
    setLoading(true);

    const query = new URLSearchParams();

  if (month !== "All") {
    query.set("month", month);
  }

  if (appliedFrom) {
    query.set("fromDate", appliedFrom);
  }

  if (appliedTo) {
    query.set("toDate", appliedTo);
  }

  axios
    .get(`${API_BASE_URL}/api/leaderboard?${query.toString()}`)
    .then((res) => {
      setFresh(
        res.data.fresh.map((item: any) => ({
          ...item,
          repayAmount: item.actualRepayAmount ?? 0,
        }))
      );
      setRepeat(
        res.data.repeat.map((item: any) => ({
          ...item,
          repayAmount: item.actualRepayAmount ?? 0,
        }))
      );
      setLastUpdated(new Date());
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setLoading(false);
    });
};

  useEffect(() => {
  fetchLeaderboard();
}, [month, appliedFrom, appliedTo]);

const applyDateRange = () => {
  setAppliedFrom(dateFrom);
  setAppliedTo(dateTo);
  setMonth("All");
};

const filteredFresh = fresh.filter((item) =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredRepeat = repeat.filter((item) =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);

const showFresh =
  viewMode === "All" ||
  viewMode === "Fresh";

const showRepeat =
  viewMode === "All" ||
  viewMode === "Repeat";

const freshTotal = filteredFresh.reduce((sum, item) => sum + item.amount, 0);
const repeatTotal = filteredRepeat.reduce((sum, item) => sum + item.amount, 0);

const freshPercent = (freshTotal / FRESH_TARGET) * 100;
const repeatPercent = (repeatTotal / REPEAT_TARGET) * 100;
const combinedTargetPercent =
  ((freshTotal + repeatTotal) / (FRESH_TARGET + REPEAT_TARGET)) * 100;

const visibleData = [
  ...(showFresh ? filteredFresh : []),
  ...(showRepeat ? filteredRepeat : []),
];

const overallAmount = visibleData.reduce((sum, item) => sum + item.amount, 0);
const overallRepayAmount = visibleData.reduce(
  (sum, item) => sum + item.repayAmount,
  0
);
const overallReceivedAmount = visibleData.reduce(
  (sum, item) => sum + item.receivedAmount,
  0
);
const overallReceivedPercent =
  overallRepayAmount > 0
    ? (overallReceivedAmount / overallRepayAmount) * 100
    : 0;

// ============================
// DOWNLOAD REPORTS
// ============================

const downloadFullReport = () => {
  const reportData = [];

  reportData.push(["TOOFAN LOAN - FULL REPORT"]);
  reportData.push(["Generated on", new Date().toLocaleString()]);
  if (appliedFrom || appliedTo) {
    reportData.push(["Date Range", `${appliedFrom || "Start"} to ${appliedTo || "End"}`]);
  }
  if (month !== "All") {
    reportData.push(["Month Filter", month]);
  }
  reportData.push([]);

  reportData.push(["SUMMARY STATISTICS"]);
  reportData.push(["Fresh Target Achievement", `${freshPercent.toFixed(2)}%`, `₹ ${(freshTotal / 10000000).toFixed(2)}Cr`, `Target: ₹ ${(FRESH_TARGET / 10000000).toFixed(1)}Cr`]);
  reportData.push(["Repeat Target Achievement", `${repeatPercent.toFixed(2)}%`, `₹ ${(repeatTotal / 10000000).toFixed(2)}Cr`, `Target: ₹ ${(REPEAT_TARGET / 10000000).toFixed(1)}Cr`]);
  reportData.push(["Combined Achievement", `${combinedTargetPercent.toFixed(2)}%`, `₹ ${((freshTotal + repeatTotal) / 10000000).toFixed(2)}Cr`, `Target: ₹ ${((FRESH_TARGET + REPEAT_TARGET) / 10000000).toFixed(1)}Cr`]);
  reportData.push([]);

  reportData.push(["OVERALL AMOUNT SUMMARY"]);
  reportData.push(["Total Amount", `₹ ${overallAmount.toLocaleString()}`]);
  reportData.push(["Total Repay Amount", `₹ ${overallRepayAmount.toLocaleString()}`]);
  reportData.push(["Total Received Amount", `₹ ${overallReceivedAmount.toLocaleString()}`]);
  reportData.push(["Overall Received %", `${overallReceivedPercent.toFixed(2)}%`]);
  reportData.push([]);
  reportData.push([]);

  if (showFresh && filteredFresh.length > 0) {
    reportData.push(["FRESH PERFORMANCE"]);
    reportData.push(["Rank", "Executive Name", "No of Cases", "Total Amount", "Total Repay Amt", "Total Received Amt", "% Received"]);
    filteredFresh.forEach((item, idx) => {
      reportData.push([
        idx + 1,
        item.name,
        item.cases,
        `₹ ${item.amount.toLocaleString()}`,
        `₹ ${item.repayAmount.toLocaleString()}`,
        `₹ ${item.receivedAmount.toLocaleString()}`,
        `${item.receivePercent.toFixed(2)}%`
      ]);
    });
    reportData.push([]);
    reportData.push([]);
  }

  if (showRepeat && filteredRepeat.length > 0) {
    reportData.push(["REPEAT PERFORMANCE"]);
    reportData.push(["Rank", "Executive Name", "No of Cases", "Total Amount", "Total Repay Amt", "Total Received Amt", "% Received"]);
    filteredRepeat.forEach((item, idx) => {
      reportData.push([
        idx + 1,
        item.name,
        item.cases,
        `₹ ${item.amount.toLocaleString()}`,
        `₹ ${item.repayAmount.toLocaleString()}`,
        `₹ ${item.receivedAmount.toLocaleString()}`,
        `${item.receivePercent.toFixed(2)}%`
      ]);
    });
  }

  const csv = Papa.unparse(reportData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `Toofan_Full_Report_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const downloadIncentiveReport = () => {
  const incentiveData = [];

  // Filter for 80%+ only
  const freshIncentive = filteredFresh.filter(item => item.receivePercent >= 80);
  const repeatIncentive = filteredRepeat.filter(item => item.receivePercent >= 80);
  const allIncentive = [...freshIncentive, ...repeatIncentive];

  // Sort by received percentage descending
  allIncentive.sort((a, b) => b.receivePercent - a.receivePercent);

  // Header
  incentiveData.push(["TOOFAN LOAN - INCENTIVE REPORT (80%+ RECEIVED)"]);
  incentiveData.push(["Generated on", new Date().toLocaleString()]);
  incentiveData.push(["Filter Criteria", "Received Percentage >= 80%"]);
  
  if (appliedFrom || appliedTo) {
    incentiveData.push(["Date Range", `${appliedFrom || "Start"} to ${appliedTo || "End"}`]);
  }
  if (month !== "All") {
    incentiveData.push(["Month Filter", month]);
  }
  
  incentiveData.push([]);

  // Summary
  const totalEligible = allIncentive.length;
  const totalCases = allIncentive.reduce((sum, item) => sum + item.cases, 0);
  const totalAmount = allIncentive.reduce((sum, item) => sum + item.amount, 0);
  const totalRepay = allIncentive.reduce((sum, item) => sum + item.repayAmount, 0);
  const totalReceived = allIncentive.reduce((sum, item) => sum + item.receivedAmount, 0);
  const avgPercent = totalEligible > 0 ? (allIncentive.reduce((sum, item) => sum + item.receivePercent, 0) / totalEligible) : 0;

  incentiveData.push(["INCENTIVE ELIGIBLE SUMMARY"]);
  incentiveData.push(["Total Eligible Executives", totalEligible]);
  incentiveData.push(["Total Cases", totalCases]);
  incentiveData.push(["Total Amount", `₹ ${totalAmount.toLocaleString()}`]);
  incentiveData.push(["Total Repay Amount", `₹ ${totalRepay.toLocaleString()}`]);
  incentiveData.push(["Total Received Amount", `₹ ${totalReceived.toLocaleString()}`]);
  incentiveData.push(["Average Received %", `${avgPercent.toFixed(2)}%`]);
  incentiveData.push([]);
  incentiveData.push([]);

  // Data Table
  if (allIncentive.length > 0) {
    incentiveData.push(["ELIGIBLE EXECUTIVES (80%+ RECEIVED)"]);
    incentiveData.push(["Rank", "Executive Name", "No of Cases", "Total Amount", "Total Repay Amt", "Total Received Amt", "% Received", "Type", "Eligible for Incentive"]);
    
    allIncentive.forEach((item, idx) => {
      const type = freshIncentive.includes(item) ? "Fresh" : "Repeat";
      incentiveData.push([
        idx + 1,
        item.name,
        item.cases,
        `₹ ${item.amount.toLocaleString()}`,
        `₹ ${item.repayAmount.toLocaleString()}`,
        `₹ ${item.receivedAmount.toLocaleString()}`,
        `${item.receivePercent.toFixed(2)}%`,
        type,
        "YES ✓"
      ]);
    });
  } else {
    incentiveData.push([]);
    incentiveData.push(["NO ELIGIBLE EXECUTIVES", "No executives with 80%+ received percentage in selected filters"]);
  }

  const csv = Papa.unparse(incentiveData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  
  let fileName = `Toofan_Incentive_Report_${new Date().toISOString().split('T')[0]}`;
  if (appliedFrom) fileName += `_from_${appliedFrom}`;
  if (appliedTo) fileName += `_to_${appliedTo}`;
  fileName += ".csv";
  
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ============================
// TARGET CARD
// ============================

const renderTargetCard = () => (
  <div className="target-card-main">
    <h2 className="target-main-title">🎯 Current Target & Achievement</h2>

    <div className="target-grid">
      {showFresh && (
        <div className="target-item fresh-target">
          <div className="target-item-header">
            <h3>Fresh Loans</h3>
            <span className="achievement-percent">{freshPercent.toFixed(1)}%</span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill fresh"
              style={{ width: `${Math.min(freshPercent, 100)}%` }}
            ></div>
          </div>

          <div className="amount-row">
            <div className="amount-item">
              <span className="label">Achieved</span>
              <span className="value">₹ {(freshTotal / 10000000).toFixed(2)}Cr</span>
            </div>
            <div className="amount-item">
              <span className="label">Target</span>
              <span className="value">₹ {(FRESH_TARGET / 10000000).toFixed(1)}Cr</span>
            </div>
          </div>
        </div>
      )}

      {showRepeat && (
        <div className="target-item repeat-target">
          <div className="target-item-header">
            <h3>Repeat Loans</h3>
            <span className="achievement-percent">{repeatPercent.toFixed(1)}%</span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill repeat"
              style={{ width: `${Math.min(repeatPercent, 100)}%` }}
            ></div>
          </div>

          <div className="amount-row">
            <div className="amount-item">
              <span className="label">Achieved</span>
              <span className="value">₹ {(repeatTotal / 10000000).toFixed(2)}Cr</span>
            </div>
            <div className="amount-item">
              <span className="label">Target</span>
              <span className="value">₹ {(REPEAT_TARGET / 10000000).toFixed(1)}Cr</span>
            </div>
          </div>
        </div>
      )}
    </div>

    {showFresh && showRepeat && (
      <div className="target-combined">
        <div className="combined-stat">
          <span className="combined-label">Target Achievement</span>
          <span className="combined-value">₹ {((freshTotal + repeatTotal) / 10000000).toFixed(2)}Cr</span>
        </div>
        <div className="combined-stat">
          <span className="combined-label">Total Target Achievement</span>
          <span className="combined-value">₹ {((FRESH_TARGET + REPEAT_TARGET) / 10000000).toFixed(1)}Cr</span>
        </div>
        <div className="combined-stat">
          <span className="combined-label">Overall Achievement %</span>
          <span className="combined-percentage">{combinedTargetPercent.toFixed(1)}%</span>
        </div>
        <div className="summary-progress-row">
          <div className="summary-progress">
            <div
              className="summary-progress-fill target"
              style={{ width: `${Math.min(combinedTargetPercent, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    )}

    <div className="overall-summary">
      <h3>Overall Amount Summary</h3>
      <div className="overall-grid">
        <div className="overall-stat">
          <span className="overall-label">Total Amount</span>
          <span className="overall-value">₹ {overallAmount.toLocaleString()}</span>
        </div>
        <div className="overall-stat">
          <span className="overall-label">Total Repay Amount</span>
          <span className="overall-value">₹ {overallRepayAmount.toLocaleString()}</span>
        </div>
        <div className="overall-stat">
          <span className="overall-label">Total Received Amount</span>
          <span className="overall-value">₹ {overallReceivedAmount.toLocaleString()}</span>
        </div>
        <div className="overall-stat highlight">
          <span className="overall-label">Overall Received %</span>
          <span className="overall-percent">{overallReceivedPercent.toFixed(2)}%</span>
        </div>
        <div className="summary-progress-row">
          <div className="summary-progress">
            <div
              className="summary-progress-fill received"
              style={{ width: `${Math.min(overallReceivedPercent, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

  // ==========================
  // TOP 3
  // ==========================

  const renderTop3 = (
    data: Data[],
    title: string,
    type: string
  ) => {

    const top3 = data.slice(0, 3);
    const renderOrder = [1, 0, 2].filter((index) => index < top3.length);

    return (

      <div className={`top-box ${type}`}>

        <h2>{title}</h2>

        <div className="top-cards">

          {renderOrder.map((originalIndex) => {
            const item = top3[originalIndex];
            return (
              <div
                key={originalIndex}
                className={`top-card ${
                  originalIndex === 0
                    ? "gold"
                    : originalIndex === 1
                    ? "silver"
                    : "bronze"
                }`}
              >

                <div className="medal">
                  {originalIndex === 0
                    ? "🥇"
                    : originalIndex === 1
                    ? "🥈"
                    : "🥉"}
                </div>

                <h3>{originalIndex + 1} PLACE</h3>

                <h4>{item.name}</h4>

                <p>
                  ₹ {item.amount.toLocaleString()}
                </p>

                <span>
                  {item.cases} Cases
                </span>

              </div>
            );
          })}

        </div>

      </div>

    );

  };

  // ==========================
  // TABLE
  // ==========================

  const renderTable = (
    data: Data[],
    title: string,
    type: string
  ) => (

    <div className={`card ${type}`}>

      <h2>{title}</h2>

      <div className="table-panel">

        <div className="table-wrapper">

        <table>

          <thead>

            <tr>

              <th>#</th>

              <th>Executive Name</th>

              <th>No of Cases</th>

              <th>Total Section Amount</th>

              <th>Total Repay Amt</th>

              <th>Total Received Amt</th>

              <th>% Received</th>

            </tr>

          </thead>

          <tbody>

            {data.map((item, i) => (

              <tr key={i}>

                <td>
                  {i === 0
                    ? "🥇"
                    : i === 1
                    ? "🥈"
                    : i === 2
                    ? "🥉"
                    : i + 1}
                </td>

                <td>{item.name}</td>

                <td>{item.cases}</td>

                <td>
                  ₹ {item.amount.toLocaleString()}
                </td>

                <td>
                  ₹ {item.repayAmount.toLocaleString()}
                </td>

                <td>
                  ₹ {item.receivedAmount.toLocaleString()}
                </td>

                <td>
                  {item.receivePercent.toFixed(2)}%
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        </div>

      </div>

    </div>

  );

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo-block">
          <div className="logo-mark">
            <img src={bankLogo} alt="Bank logo" />
          </div>
          <div className="logo-copy">
            <strong>Toofan Loan</strong>
            <span>Smart Collections Dashboard</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="button-group">
            <button
              className="refresh-button"
              onClick={fetchLeaderboard}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
            <button
              className="download-button full-report"
              onClick={downloadFullReport}
              title="Download full dashboard report with all data"
            >
              📥 Full Report
            </button>
            <button
              className="download-button incentive-report"
              onClick={downloadIncentiveReport}
              title="Download incentive report (80%+ received)"
            >
              💰 Incentive (80%+)
            </button>
          </div>
          {lastUpdated && (
            <div className="updated-info">
              Last refreshed: {lastUpdated.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          )}
        </div>
      </header>

      <section className="dashboard-banner">
        <img src={heroImage} alt="Dashboard" className="dashboard-image" />
        <div className="dashboard-title">
          <h1>Sanction Leaderboard Dashboard</h1>
          <p>Centered high-value ranking view with fresh and repeat performance.</p>
        </div>
      </section>

      {renderTargetCard()}

      <div className={`split-layout ${filtersCollapsed ? "filters-collapsed" : ""}`}>
        <aside className={`side-panel ${filtersCollapsed ? "collapsed" : ""}`}>
          <div className={`filter-box ${filtersCollapsed ? "collapsed" : ""}`}>
            <div className="filter-heading">
              <h3>Custom Filters</h3>
              <button
                type="button"
                className="filter-toggle"
                onClick={() => setFiltersCollapsed((current) => !current)}
                aria-expanded={!filtersCollapsed}
                aria-label={filtersCollapsed ? "Maximize filters" : "Minimize filters"}
              >
                <span className="filter-toggle-icon" aria-hidden="true"></span>
              </button>
            </div>

            {!filtersCollapsed && (
              <div className="filter-content">
                <label>
              Month
              <select
                className="month-select"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="All">All Months</option>
                <option value="Oct'25">Oct'25</option>
                <option value="Nov'25">Nov'25</option>
                <option value="Dec'25">Dec'25</option>
                <option value="Jan'26">Jan'26</option>
                <option value="Feb'26">Feb'26</option>
                <option value="Mar'26">Mar'26</option>
                <option value="Apr'26">Apr'26</option>
                <option value="May'26">May'26</option>
                <option value="Jun'26">Jun'26</option>
                <option value="Jul'26">Jul'26</option>
                <option value="Aug'26">Aug'26</option>
                <option value="Sep'26">Sep'26</option>
                <option value="Oct'26">Oct'26</option>
                <option value="Nov'26">Nov'26</option>
                <option value="Dec'26">Dec'26</option>
              </select>
                </label>

                <label>
                  Executive Name
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </label>

                <label>
                  Date Range
                  <div className="date-row">
                    <input
                      className="date-input"
                      type="date"
                      min={MIN_DISBURSE_DATE}
                      max={MAX_DISBURSE_DATE}
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                    />
                    <span className="date-separator">to</span>
                    <input
                      className="date-input"
                      type="date"
                      min={dateFrom || MIN_DISBURSE_DATE}
                      max={MAX_DISBURSE_DATE}
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="apply-button"
                    onClick={applyDateRange}
                  >
                    Apply
                  </button>
                </label>

                <label>
                  Board View
                  <select
                    className="month-select"
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value)}
                  >
                    <option value="All">Show All</option>
                    <option value="Fresh">Fresh Only</option>
                    <option value="Repeat">Repeat Only</option>
                  </select>
                </label>
              </div>
            )}
          </div>
        </aside>

        <main className="main-panel">
          <div className="top-section">
            {showFresh && renderTop3(filteredFresh, "FRESH TOP 3", "fresh")}
            {showRepeat && renderTop3(filteredRepeat, "REPEAT TOP 3", "repeat")}
          </div>

          <div className="container">
            {showFresh && renderTable(filteredFresh, "🔥 Fresh Performance", "fresh")}
            {showRepeat && renderTable(filteredRepeat, "♻️ Repeat Performance", "repeat")}
          </div>
        </main>
      </div>
    </div>
  );

}

export default App;
