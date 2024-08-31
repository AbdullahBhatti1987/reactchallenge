import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState("");
  const [textColor, setTextColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [boxes, setBoxes] = useState([]); 

  const handlerBgColor = (e) => {
    setBgColor(e.target.value);
  };

  const handlerTextColor = (e) => {
    setTextColor(e.target.value);
  };

  const handlerShowBox = () => {
    const newBox = {
      id: Date.now(),
      status: status,
      textColor: textColor,
      bgColor: bgColor,
      time: 30,
    };
    setStatus("")
    setTextColor("#ffffff")
    setBgColor("#000000")
    setBoxes((prevBoxes) => [...prevBoxes, newBox]); // Add the new box to the array
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBoxes((prevBoxes) =>
        prevBoxes
          .map((box) =>
            box.time > 0 ? { ...box, time: box.time - 1 } : box
          )
          .filter((box) => box.time > 0)
      );
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <>
      <div className="flex gap-3 items-center justify-between p-5 mt-6 mb-3 border-4 w-10/12 m-auto">
        <div className="flex gap-2 items-center">
          <label htmlFor="statustext">Status Text</label>
          <input
            type="text"
            className="border border-2 py-2 px-3 rounded-lg border-indigo-300 w-56"          
            value={status}
           
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="bgColor">Background Color</label>
          <input
            type="color"
            name="bgColor"
            id="bgColor"
            className="w-20 p-0 m-0"
            value={bgColor}

            onChange={handlerBgColor}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="textColor">Text Color</label>
          <input
            type="color"
            name="textColor"
            id="textColor"
            className="w-20 p-0 m-0"
            value={textColor}
            onChange={handlerTextColor}
          />
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="bg-blue-600 p-3 rounded-lg text-white shadow hover:bg-blue-800"
            onClick={handlerShowBox}
          >
            Add Status
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center p-5 pt-10 border-4 w-10/12 m-auto">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="relative w-48 h-48 border-4 rounded-xl flex justify-center items-center"
            style={{ backgroundColor: box.bgColor }}
          >
            <h1 className="text-6xl" style={{ color: box.textColor }}>
              {box.status}
            </h1>
            <p className="absolute end-2 bottom-2" style={{ color: box.textColor }}>{box.time}s</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
