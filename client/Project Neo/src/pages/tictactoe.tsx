// import {
//   useState,
//   useEffect,
//   // FormEvent,
//   // ChangeEvent,
//   // MouseEventHandler,
//   ReactNode,
// } from "react";
// import { io } from "socket.io-client";


// const socket = io("http://localhost:3000");

// function App() {
//   // const [serverMessage, setServerMessage] = useState<string[]>([]);
//   // const [inputValue, setInputValue] = useState("");
//   const [matrix, setMatrix] = useState<number[][]>([
//     [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
//   ]);
//   const [user, setUserType] = useState('')
//   const [dice, setDice] = useState<ReactNode[]>()

//   useEffect(() => {
//   const handleSocketMatrix = (data:any) => {
//   setMatrix(data);
//   }
//   socket.on("matrix",handleSocketMatrix)
//   return()=>{
//     socket.off("matrix",handleSocketMatrix)
//   }
//   }, []);

//   const handleMatrix = (data: any) => {
//     const [col, row] = data.target.value.split("|");
//     const parseCol = parseInt(col, 10);
//     const parseRow = parseInt(row, 10);
//     if (user === "red") {
//       setMatrix((prevMatrix) => {
//         const newMatrix = [...prevMatrix];
//         newMatrix[parseRow][parseCol] = 1;
//         socket.emit("sendMatrix", newMatrix);
//         return newMatrix;
//       });

//       // sendMatrixToServer(matrix)
//     }
//     if (user === "green") {
//       setMatrix((prevMatrix) => {
//         const newMatrix = [...prevMatrix];
//         newMatrix[parseRow][parseCol] = 2;
//         socket.emit("sendMatrix", newMatrix);
//         return newMatrix;
//       });
//       // sendMatrixToServer(matrix)
//     }
//   };

//   const setUserTypeRed = () =>{
//     setUserType('red')
//   }

//   const setUserTypeGreen = () =>{
//     setUserType('green')
//   }

//   const resetGameHandler = () =>{
//     const resetMatrix = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
//     setMatrix(resetMatrix)
//     socket.emit("sendMatrix", resetMatrix)
//   }

//   const diceHandle = () =>{
//     const dotsContent:React.ReactNode[] = []
//     const diceValue = [0,1,2,3,4,5,6]
//     for(let i = 0 ; i< diceValue[Math.ceil(Math.random() * 6)] ; i++){
//       dotsContent.push(<li key={i} className="h-5 w-5 rounded-full bg-white"/>)
//     }
//     setDice(dotsContent)
//   }

//   return (
//     <div className="w-screen h-screen flex flex-col items-center justify-center">
//       <div>
//       <button type="button" onClick={setUserTypeRed}>
//       Red
//       </button>
//       <button type="button" onClick={setUserTypeGreen}>
//       green
//       </button>
//       <button type="button" onClick={resetGameHandler}>
//         reset
//       </button>
//       </div>
//       <ul className="w-1/2 sm:w-3/4 h-3/4 bg-purple-500 grid grid-cols-4 grid-rows-4 place-items-center rounded-md">
//         {matrix.map((row: number[], mainCol) => {
//           return row.map((col, index) => (
//             <li
//               className={` m-4 rounded-lg`}
//               key={Math.random() * 100}
//             >
//               <button
//                 type="button"
//                 value={`${index} | ${mainCol}`}
//                 onClick={handleMatrix}
//                 className={`w-20 h-20 ${col === 1 && "bg-red-400"} ${
//                   col === 2 && "bg-green-400"
//                 } hover:outline-none border-none focus:outline-none text-3xl grid place-content-center
//                 focus:w-28 focus:h-28
//                 ${
//                   col === 0 && "hover:bg-blue-900"
//                 } bg-blue-400 transition-all duration-200`}
//               >
//                 {col == 0 ? "" : col === 1 ? "X" : "O"}
//               </button>
//             </li>
//           ));
//         })}
//       </ul>
//       <div>
//           <ul onClick={diceHandle} className={`w-32 h-32 rounded-md bg-red-950 grid place-items-center items-center ${dice && dice.length <= 3?"":"grid-cols-3 grid-rows-2"}
//           `}>
//             {
//             dice
//             }
//           </ul>
//       </div>
//     </div>
//   );
// }

// export default App;
