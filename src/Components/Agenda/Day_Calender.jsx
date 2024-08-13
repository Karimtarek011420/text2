import React, { useState } from 'react'
import './Day_Calender.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import right from '../../assets/right.png';
import left from '../../assets/left.png';
import { listData } from '../../lib/dummydata.jsx';
import { faL } from '@fortawesome/free-solid-svg-icons';
import Card from './card/card.jsx';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";


function Day_Calender() {

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedToday = `${mm}/${dd}/${yyyy}`;
    console.log("todays"+formattedToday); 

    const data = listData;
    const [btn1, setbtn1] = useState(true);
    const [btn2, setbtn2] = useState(false);
    const [btn3, setbtn3] = useState(false);
    const [count, setcount] = useState(0);
    
    const previous = ()=> {
        const btnnum = (count - 1 + 3) % 3;
        setcount(btnnum);
        updatebtns(btnnum)
        console.log(count)
    }

    const next = ()=> {
        const btnnum = Math.abs((count + 1) % 3);
        setcount(btnnum);
        updatebtns(btnnum)
        console.log(count)
    }

    const updatebtns =(btnnum)=>{
        if(btnnum === 0)
        {
            setbtn1(true);
            setbtn2(false);
            setbtn3(false);
        }
        else if(btnnum === 1)
        {
            setbtn1(false);
            setbtn2(true);
            setbtn3(false);
        }
            else if(btnnum === 2)
        {
            setbtn1(false);
            setbtn2(false);
            setbtn3(true);
        }
    }

    const SetButtone=()=>{
        setbtn1(true);
        setbtn2(false);
        setbtn3(false);
    };
    const SetButttwo=()=>{
        setbtn1(false);
        setbtn2(true);
        setbtn3(false);
    };
    const SetButtthree=()=>{
        setbtn1(false);
        setbtn2(false);
        setbtn3(true);
    };

    const date1 = "3 Jan 2025";
    const date2 = "18 May 2025";
    const date3 = "17 Dec 2025";

    return (
    <div className="container day_cal_con">
        <div className="btn-nex-prev text-end">
            <button className='btn-prev-dc me-2' onClick={previous}><FaArrowLeft/></button>
            <button className='btn-nex-dc' onClick={next}><FaArrowRight/></button>
        </div>
        <div className="row justify-content-center mb-5">
            <div className="col-md-9">
                <div className="btn-three-days text-center fw-normal  lh-base">
                    <button onClick={SetButtone} className={btn1 ? 'btn-day1-active px-3 mb-2': 'btn-day1 me-2'}>{date1}</button>
                    <button onClick={SetButttwo} className={btn2 ? 'btn-day2-active px-3 mb-2': 'btn-day1 me-2'}>{date2}</button>
                    <button onClick={SetButtthree} className={btn3 ? 'btn-day3-active px-3 mb-2': 'btn-day1 me-2'}>{date3}</button>
                </div>
            </div>
        </div>
        <div className="row mb-5 justify-content-center">
            {btn1 &&
                data.map((d) => {
                if (d.date_details === date1) {
                    return (
                    <div className="col-12 col-sm-8 col-md-4 mb-5 mx-auto" key={d.id}>
                        <Card item={d} />
                    </div>
                    );
                }
                return null;
                })}

            {btn2 &&
                data.map((d) => {
                if (d.date_details === date2) {
                    return (
                    <div className="col-12 col-sm-8 col-md-4 mb-5 mx-auto" key={d.id}>
                        <Card item={d} />
                    </div>
                    );
                }
                return null;
                })}

            {btn3 &&
                data.map((d) => {
                if (d.date_details === date3) {
                    return (
                    <div className="col-12 col-sm-8 col-md-4 mb-5 mx-auto" key={d.id}>
                        <Card item={d} />
                    </div>
                    );
                }
                return null;
                })}
        </div>


    </div>
    )
}

export default Day_Calender


