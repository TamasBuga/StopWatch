

import React, { useEffect, useState } from 'react';
import './App.css';
import { v4 } from 'uuid';



function App() {



  const [isActive, setIsActive] = useState(false);
  const [records, setRecords] = useState([]);

  const [milsec, setMilsec] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);


  const handleClick = () => {
    setIsActive(!isActive);
    setStart(Date.now());
  }



  useEffect(() => {

    let millisecs = setInterval(() => {

      if (isActive) {

        const d = Date.now();
        setMilsec(((d + end) - start));

      } else {
        setEnd(milsec);
      }

    }, 1);

    setSec(Math.floor(milsec / 1000));
    setMin(Math.floor(milsec / 60000));

    return () => clearInterval(millisecs);

  }, [isActive, milsec]);




  return (
    <div className='app'>
      <div className='stopper'>


        <div className='controller'>


          <div className='time'>
            <p className='timer'>{min > 9 ? min : '0' + min}</p>
            <p>:</p>
            <p className='timer'>{sec % 60 > 9 ? sec % 60 : '0' + sec % 60}</p>
            <p>:</p>
            <p className='timer'>{milsec % 1000 > 9 ? milsec % 1000 : '0' + milsec % 1000}</p>
          </div>



          <div className='stopper-items'>
            <span
              className="material-symbols-outlined active"
              onClick={handleClick}>
              {isActive ? 'pause' : 'play_arrow'}
            </span>
            <span
              className="material-symbols-outlined"
              onClick={() => {
                setIsActive(false);
                setMilsec(0);
                setSec(0);
                setMin(0);
              }}
            >
              stop
            </span>
            <span
              className="material-symbols-outlined"
              onClick={() => {
                const uuid = v4();
                setRecords(r => [...r, {
                  recordId: uuid,
                  time: (min > 9 ? min : '0' + min) + ' : ' + (sec % 60 > 9 ? sec % 60 : '0' + sec % 60) + ' : ' + (milsec % 1000 > 9 ? milsec % 1000 : '0' + milsec % 1000)
                }])
              }}
            >
              fiber_manual_record
            </span>
          </div>


        </div>



        {records.length > 0 ?
          <>
            <div className='records'>
              {records.map((item, index) => {
                return (
                  <div className='record-row' key={index}>
                    <p className='record-index'>{index + 1}</p>
                    <p className='record-item'>{item.time}</p>
                    <div className='delete-btn'>
                      <span className="material-symbols-outlined"
                        onClick={() => {
                          const filteredArray = records.filter(record => record.recordId !== item.recordId);
                          setRecords(filteredArray);
                        }}
                      >
                        delete_forever
                      </span>
                    </div>
                  </div>
                )
              })}
              <button onClick={() => setRecords([])}>Reset</button>
            </div>
          </>
          :
          <></>
        }


      </div>
    </div>
  )
}

export default App
