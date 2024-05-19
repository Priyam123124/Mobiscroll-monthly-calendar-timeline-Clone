import React, { useContext, useEffect, useState, useRef } from 'react';
import WebContext from '../context/WebContext';
import ResizableButton from './Dragable';
import deleteIcon from './delete.svg';
import add from '../add.png';

const Dd = () => {
    const context = useContext(WebContext);
    const { month, year, setShowAlert, iwidth, width, setWidth, widflag, setWidflag } = context;
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // State to manage calendar events and other UI states
    const [cvalue, setCvalue] = useState(JSON.parse(localStorage.getItem('cvalue')) || []);
    const [width1, setWidth1] = useState(50)
    const [class123, setClass123] = useState('')
    const [moreres, setMoreres] = useState([]);
    const [rowno, setRowno] = useState(16);
    const [newres, setNewres] = useState(1);
    const [latest, setLatest] = useState('');
    const [h1, setH1] = useState(1); // State for end hour
    const [m1, setM1] = useState(0); // State for end minute
  const resizeStartX = useRef(null); // Ref for storing initial X position during resize
  const initialWidthPos = useRef(null); // Ref for storing initial width position

    // Generate the correct number of days for the current month
    const extraDivs = Array.from({ length: month % 2 === 0 && month !== 2 ? 30 : month % 2 === 0 && month === 2 ? 28 : month % 2 !== 0 && month === 2 ? 29 : 31 }, (_, index) => {
        const todayDate = new Date();
        const todayDay = todayDate.getDate();
        const todayMonth = todayDate.getMonth() + 1;
        const todayYear = todayDate.getFullYear();
        const currentDate = new Date(year, month - 1, index + 1);
        const dayOfWeekIndex = currentDate.getDay();
        const dayOfWeekName = daysOfWeek[dayOfWeekIndex];

        // Highlight the current day
        const background = index + 1 === todayDay && month === todayMonth && todayYear === year ? "#007AFF" : "white";

        return (
            <div key={index} style={{ border: "1px solid black" }}>
                <div style={{ backgroundColor: background, minWidth: "72px", height: "24px", borderRadius: "8px" }}>
                    {index + 1} {dayOfWeekName}
                </div>
            </div>
        );
    });

    // Persist calendar events in local storage
    useEffect(() => {
        localStorage.setItem('cvalue', JSON.stringify(cvalue));
    }, [cvalue]);

    // Handle click to add a new event
    const handleClick = (classes) => {
        if (!cvalue.some(item => item.classes === classes)) {
            const colno = Math.floor(Math.random() * 5) + 1;
            let color = '';
            switch (colno) {
                case 1: color = '#98cc98'; break;
                case 2: color = '#ff7979'; break;
                case 3: color = '#9595cf'; break;
                case 4: color = 'orange'; break;
                case 5: color = '#bfb2b2'; break;
                default: color = 'black';
            }
            setCvalue(prevCvalue => [...prevCvalue, { classes, color }]);
        }
    };

    const onMouseDownAdd = (event, classes) => {
        if(!localStorage.getItem(`${classes}4`)){
        localStorage.setItem(`${classes}4`, 0)
        const num = localStorage.getItem(`${classes}4`)
        if(num==0){
        handleClick(classes);
        resizeStartX.current = event.clientX;
        initialWidthPos.current = width1;
    
        // Define the move and up handlers
        const handleMouseMove = (e) => onMouseMoveAdd(e, classes);
        const handleMouseUp = () => onMouseUpAdd(handleMouseMove, classes, handleMouseUp);
    
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        }
    }
    };
    
    const onMouseMoveAdd = (event, classs) => {
        const deltaX = event.clientX - resizeStartX.current;
        const newWidth = Math.min(Math.max(width1 + deltaX, 50), 10000000);
        setWidth1(newWidth);
        setClass123(classs)

        const pixelsPerHour = 3; // 24 hours over 72 pixels
    const pixelsPerMinute = pixelsPerHour / 60; // 60 minutes in an hour

    const mChange = Math.floor(deltaX / pixelsPerMinute);
    const hChange = Math.floor(deltaX / pixelsPerHour);

    // Update end time based on resize
    if (mChange !== 0) {
      setM1(prevM1 => {
        let newM1 = prevM1 + mChange;
        while (newM1 >= 60) {
          newM1 -= 60;
          setH1(prevH1 => (prevH1 < 24 ? prevH1 + 1 : 1));
        }
        while (newM1 < 0) {
          newM1 += 60;
          setH1(prevH1 => (prevH1 > 1 ? prevH1 - 1 : 24));
        }
        return newM1;
      });
    }

    if (hChange !== 0) {
      setH1(prevH1 => {
        let newH1 = prevH1 + hChange;
        if (newH1 > 24) {
          newH1 = 1;
        } else if (newH1 < 1) {
          newH1 = 24;
        }
        return newH1;
      });
    }

    const time = {
      hour: h1,
      min: m1
    };

      localStorage.setItem(`${classs}2`, JSON.stringify(time));
      localStorage.setItem(classs, newWidth);
        //console.log(`New Width: ${newWidth}`); // Log width during movement
    };

    useEffect(()=>{
        console.log(h1, m1)
        const time = {
            hour: h1,
            min: m1
          };
      
        localStorage.setItem(`${class123}2`, JSON.stringify(time));
    }, [h1, m1])
    
    
    const onMouseUpAdd = (handleMouseMove, classes, handleMouseUp) => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        localStorage.setItem(`${classes}4`, 1)
    };
    
    // Delete a specific event
    const delThis = (classes) => {
        const filtered = cvalue.filter(e => e.classes !== classes);
        setCvalue(filtered);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 1500);
        localStorage.removeItem(classes);
        localStorage.removeItem(`${classes}1`);
        localStorage.removeItem(`${classes}2`);
        localStorage.removeItem(`${classes}3`);
        localStorage.removeItem(`${classes}4`);
    };

    // Generate the calendar grid for a specific resource
    const func = (a) => {
        const divs = [];
        const daysInMonth = month % 2 === 0 && month !== 2 ? 30 : month % 2 === 0 && month === 2 ? 28 : month % 2 !== 0 && month === 2 ? 29 : 31;
        for (let i = 0; i < daysInMonth; i++) {
            const classes = `${i + 1}/${month}/${year}/${a}`;
            const iwidth = localStorage.getItem(classes);
            const npos = localStorage.getItem(`${classes}1`);
            const tm1 = localStorage.getItem(`${classes}3`);
            const tm2 = localStorage.getItem(`${classes}2`);
            const it = tm1 ? JSON.parse(tm1) : {};
            const ft = tm2 ? JSON.parse(tm2) : {};
            //const adwid = localStorage.getItem(`${classes}5`)

            const foundObject = cvalue.find(item => item.classes === classes);
            const coloring = foundObject ? foundObject.color : '';
            const content = foundObject ? (
                <ResizableButton
                    initialWidth={iwidth || 72}
                    minWidth={50}
                    maxWidth={10000000}
                    dragHandleOffset={20}
                    classs={classes}
                    colour={coloring}
                    position={npos}
                    ih={it.hour}
                    im={it.min}
                    fh={ft.hour}
                    fm={ft.min}
                    upwid={width1}
                    hm={h1}
                    mh={m1}
                >
                    New Event <img onClick={() => { delThis(classes) }} src={deleteIcon} />
                </ResizableButton>
            ) : "";

            divs.push(
                <div key={i} onMouseDown={(e)=>{onMouseDownAdd(e, classes)}} className={classes} style={{ border: "1px solid black", minWidth: "72px", height: "60px" }}>
                    {content}
                </div>
            );
        }
        return divs;
    };

    // Add a new resource row
    const addRes = () => {
        setMoreres(prevMoreres => [...prevMoreres, { rowno, newres }]);
        setRowno(rowno + 1);
        setNewres(newres + 1);
    };

    return (
        <div style={{ display: "flex", width: "100%", height: "90%" }}>
            <div style={{ height: "80vh", overflowX: "auto" }}>
                <div style={{ display: "flex" }}>
                    <div style={{ position: "absolute", backgroundColor: "white", border: "1px solid black", minWidth: "170px", height: "24px" }}></div>
                    <div style={{display: "flex", marginLeft: "171px" }}>{extraDivs}</div>
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource A</div>
                    {func(1)}
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource B</div>
                    {func(2)}
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource C</div>
                    {func(3)}
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource D</div>
                    {func(4)}
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource E</div>
                    {func(5)}
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource F</div>
                    {func(6)}
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource G</div>
                    {func(7)}
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource H</div>
                    {func(8)}
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource I</div>
                    {func(9)}
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource J</div>
                    {func(10)}
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource K</div>
                    {func(11)}
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource L</div>
                    {func(12)}
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource M</div>
                    {func(13)}
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource N</div>
                    {func(14)}
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource O</div>
                    {func(15)}
                </div>
                {moreres.map((e)=>{
                    return (
                        <div style={{ display: "flex" }}>
                    <div style={{ border: "1px solid grey", minWidth: "170px", height: "60px", overflowY: "hidden" }}>Resource O{e.newres}</div>
                    {func(e.rowno)}
                </div>
                    )
                })}
                <img onClick={addRes} src = {add} width="40px"/>
            </div>
        </div>
    );
}

export default Dd;
