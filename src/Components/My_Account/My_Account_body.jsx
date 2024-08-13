import React, { useEffect, useState } from 'react'
import './My_Account_body.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from '../Button/Button';
import { listData } from '../../lib/dummydata';
import Card from './card/card'
import RegisterModal from '../RegisterModal';
import { Link } from 'react-router-dom';
import { myaccData } from '../../lib/myaccount'
import questionmark from '../../assets/questionmark.svg';
import QRCode from 'react-qr-code';
import LogoutModal from '../LogoutModal';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/UserSlice";
import { useDispatch } from "react-redux";
import {logout} from "../../features/UserSlice"
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function My_Account_body() {
    
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const data = listData;
    const my_account_Data = myaccData;
    const item = my_account_Data.find((d) => d.id == '1');
    
    const [btn1, setbtn1] = useState(true);
    const [btn2, setbtn2] = useState(false);
    const [btn3, setbtn3] = useState(false);
    
    const user = useSelector(selectUser);
    const [values, setvalues] = useState(null);
    const [code, setcode] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [phone, setphone] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const token = user?.token;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    async function getacount() {
        try {
            const {data } = await axios.get('/API/Auth/UserInfo', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setvalues(data.data);
             console.log(fname);

            setcode(data.code);
            // setfname(data.fname);
            // setlname(data.lname);
            // setphone(data.phone);
            // setpassword(data.password);
            // setemail(data.email);
            // setProfileData(data)
        } catch (error) {
            console.error('Error fetching account information:', error);
        }
    }

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleChange = (e) => {
        const { email, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [email]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
          const {data}=await axios.post('/API/Auth/UpdateProfile',{
            headers: {
                Authorization: `Bearer ${token}`,
                Accept:"application/json"
            }
          }) 
          console.log("karim",data);
           
        } catch (error) {
            console.log(error);
            
        }
    };
    
    


    useEffect(() => {
        getacount()
    }, []);

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

    const handleDelete = async () => {
        try {
            const {data} = await axios.post(
                `/API/Auth/${code}/deleteUser`, 
                {}, // Data object (empty in this case)
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Handle success (e.g., dispatching logout, navigating)
            dispatch(logout());
            navigate('/'); 
            console.log("lll",data);
        } catch (err) {
            console.log('Error deleting user:', err);
        }
    }
    
  return (
    <>
        <div className='container mt-5 px-3'>
            <div className="row">
                <div className="d-flex justify-content-between align-items-center wrapper">
                    <p className="fw-normal ps-5 home-slash">
                        Home/ <span className="fw-medium slash">My Account</span>
                    </p>
                    <div className='sign-out-btn-top'>
                        <Button className="log-out-btn" buttonStyle="btn--circular2" onClick={handleDelete}>
                            Delete My Account
                        </Button>
                    </div>
                </div>
                <div className="col-md-3 mb-5 px-4">
                    <div className="card my-count-btns-card">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title fw-semibold mt-2 ms-3 lh-base hello-msg">Hello {fname}</h5>
                            <hr/>
                            <div className="d-flex flex-column flex-grow-1">
                                <button onClick={SetButtone} className={btn1 ? 'btn btn-myacc-active text-start fw-semibold' : 'btn btn-myacc text-start fw-semibold'}>My Account</button>
                                <button onClick={SetButttwo} className={btn2 ?'btn btn-myacc-events-active text-start fw-semibold' : 'btn btn-myacc-events text-start fw-semibold'}>Events</button>
                                <button onClick={handleOpen} className={btn3 ?'btn btn-myacc-signout-active text-start fw-semibold' : 'btn btn-myacc-signout text-start fw-semibold'}>Sign Out</button>
                            </div>
                            <Link to='/contactus'>
                                <Button className="log-out-btn mt-auto" buttonStyle="btn--circular2">
                                    Contact Us <img src={questionmark} alt="" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                
                    {btn1 ? 
                    <>
                    <div className="col-md-9">
                        <div className="card mb-5">
                            <div className="card-body">
                                <div className="first-section-myacc-edit d-flex">
                                    <label for="exampleFormControlInput1" className="form-label my-profile-lab text-start fw-semibold lh-sm">My Profile</label>
                                    <div className="inputs-fsme w-75">
                                        <input className="form-control disabled-textfield bg-white mb-2 border-0 text-start fw-semibold lh-sm" type="text" value={`${fname} ${lname}`} aria-label="Disabled input example" disabled readOnly/>
                                        <input className="form-control disabled-textfield bg-white border-0 text-start fw-semibold lh-sm" type="text" value={email} aria-label="Disabled input example" disabled readOnly/>
                                    </div>
                                    <QRCode
                                        size={90}
                                        bgColor='white'
                                        fgColor= '#012572'
                                        value={code}
                                    />
                                </div>
                                <hr/>
                                <div className="second-section-myacc-edit d-flex">
                                    <label for="exampleFormControlInput1" className="form-label my-profile-lab text-start fw-semibold lh-sm">General Info</label>
                                    <div className="inputs-fsme w-50 ms-5">
                                        <label for="exampleFormControlInput1" className="form-label general-info-lab text-start fw-medium lh-sm">First Name</label>
                                        <input onChange={handleChange.profileData} 
                                                className="form-control disabled-textfield bg-white mb-2  text-start fw-semibold lh-sm" 
                                                type="text" id="exampleFormControlInput1" 
                                                placeholder=""
                                                />
                                        <label for="exampleFormControlInput1" className="form-label general-info-lab text-start fw-medium lh-sm">Last Name</label>
                                        <input onChange={handleChange.profileData} className="form-control disabled-textfield bg-white text-start fw-semibold lh-sm" type="text" id="exampleFormControlInput1" placeholder=""/>
                                        <div className="general-info-btns d-flex mt-4 justify-content-center">
                                            <Button className="" buttonStyle="btn--circular-line">
                                                Cancel
                                            </Button>
                                            <div className="ms-1 w-50">
                                                <Button onClick={handleSubmit} className="log-out-btn" buttonStyle="btn--circular2">
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <form onSubmit={handleSubmit} className="third-section-myacc-edit d-flex">
                                    <label for="exampleFormControlInput1" className="form-label my-profile-lab text-start fw-semibold lh-sm">Security</label>
                                    <div className="inputs-fsme w-50 ms-5">
                                        <div className="label-plus-change-btn d-flex justify-content-between">    
                                            <label for="exampleFormControlInput1" className="form-label general-info-lab fw-medium lh-sm">Email</label>
                                            <button type='sumbit' className='orange-no-border-btn border-0 bg-transparent'>change address</button>
                                        </div>
                                        <input onChange={handleChange}  className="form-control security-textfield bg-white mb-2 text-start fw-normal lh-sm" type="text" id="exampleFormControlInput1" placeholder="Karem.tukhi@watanfd.com"/>
                                        <div className="label-plus-change-btn d-flex justify-content-between">
                                            <label for="exampleFormControlInput1" className="form-label general-info-lab fw-medium lh-sm">Password</label>
                                            <button type='sumbit' className='orange-no-border-btn border-0 bg-transparent'>change Password</button>
                                        </div>
                                        <input onChange={handleChange}  className="form-control security-textfield bg-white text-start fw-normal lh-sm" type="text" id="exampleFormControlInput1" placeholder="********"/>
                                        <div className="label-plus-change-btn d-flex justify-content-between">
                                            <label for="exampleFormControlInput1" className="form-label general-info-lab fw-medium lh-sm">Phone number</label>
                                            <button type='sumbit' className='orange-no-border-btn border-0 bg-transparent'>change phone number</button>
                                        </div>
                                        <input onChange={handleChange}  className="form-control security-textfield bg-white text-start fw-normal lh-sm" type="text" id="exampleFormControlInput1" placeholder="+12 23457873920"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    </>
                    :
                    <></>    
                    }
                    {btn2 ? 
                    <>
                        {
                            data.map((d)=>{
                                {
                                    if (d.user_id === '25') {
                                        return (
                                            <>
                                                <div className="col-md-4 px-4 mb-5 mx-auto">
                                                    <Card className="" item={d} key={d.id}/>
                                                </div>
                                            </>
                                        ); 
                                    }
                                    return null;
                                }
                                })
                        }
                    </>
                    :
                    <></>    
                    }
            </div>
        </div>
        <LogoutModal
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
    </>        
  )
}

export default My_Account_body
{/* <RegisterModal
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          setcurrentPage={setcurrentPage}
        /> */}