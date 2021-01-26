import React, { useEffect, useState } from "react";
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { countryApi, stateApi, cityApi, singupApi } from '../Components/Api';

export const CreateUser = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        selectCountry: [],
        selectState: [],
        selectCity: [],
    });
    let history = useHistory();
    useEffect(() => {
        LoadData()
    }, []);
    const LoadData = async (e) => {
        let cApi = countryApi
        const result = await axios.get(cApi);
        setUser({
            ...user, selectCountry: result.data
        });
        console.log(user.selectCountry);
    }
    const handleChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    };
    const countrychange = async (e) => {
        let sApi = stateApi
        const result = await axios.get(sApi + e.target.value);
        setUser({
            ...user, selectState: result.data,
            country: e.target.value
        });
        console.log(user.selectState);
    }

    const changeState = async (e) => {
        let cApi = cityApi
        const result = await axios.get(cApi + e.target.value);
        setUser({ ...user, selectCity: result.data, state: e.target.value });
        console.log(user.selectCity);
    }
    const changeCity = async (e) => {
        setUser({ ...user, city: e.target.value })
    }

    const SubmitChange = (e) => {
        e.preventDefault();
        console.log(user);
        let form_data = new FormData();
        form_data.append('name', user.name);
        form_data.append('email', user.email);
        form_data.append('mobile', user.mobile);
        form_data.append('address', user.address);
        form_data.append('country', user.country);
        form_data.append('state', user.state);
        form_data.append('city', user.city);
        let url = singupApi;
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(response => alert('Successfully Inserted')).then(response => { history.push('/create'); })
            .catch(err => console.log(err))
    };


    return (
        <>
            <div className="container">
                <br></br>
                <form onSubmit={SubmitChange}>
                    <div className="row">
                        <div className="col-md-4">
                            <label>Name</label>
                            <input type="text" className='form-control form-control-sm' name='name'
                                placeholder='Name' id='username' value={user.username}
                                onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label>Email</label>
                            <input type="text" className='form-control form-control-sm' name='email'
                                placeholder='Email' id='email' value={user.email}
                                onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label>Mobile</label>
                            <input type="text" className='form-control form-control-sm' name='mobile'
                                placeholder='Mobile' id='mobile' value={user.mobile}
                                onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label>Address</label>
                            <input type="text" className='form-control form-control-sm' name='address'
                                placeholder='Address' id='address' value={user.address}
                                onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label>Country</label>
                            <select className="custom-select custom-select-sm" name="country" onChange={e => countrychange(e)}>
                                <option>--Select--</option>
                                {user.selectCountry.map((e, key) => {
                                    return <option key={key} value={e.id}>{e.country_name}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label>State</label>
                            <select className="custom-select custom-select-sm" name="state" onChange={changeState}>
                                <option>--Select--</option>
                                {user.selectState.map((e, key) => {
                                    return <option key={key} value={e.id}>{e.state_name}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label>City</label>
                            <select className="custom-select custom-select-sm" name="city" onChange={changeCity}>
                                <option>--Select--</option>
                                {user.selectCity.map((e, key) => {
                                    return <option key={key} value={e.id}>{e.city_name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <div className='col-md-4'>
                            <input type="submit" className='btn btn-outline-info btn-sm' />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}


export const ViewUser = () => {
    const [listUser, setListUser] = useState({
        item: []
    });
    useEffect(()=>{
        loadData();
    },[])

    const loadData = async () =>{
        const result = await axios.get("http://192.168.43.219:8000/singup/");
        setListUser({item:result.data.reverse()});
    }

    return (
        <>
        <div className="container">
            <br></br>
            <div className="row">
                <div className="col-md-12">
                    <div class="card">
                        <div class="card-header">List User</div>
                        <div class="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>Address</th>
                                            <th>Country</th>
                                            <th>State</th>
                                            <th>City</th>
                                            <th>Edit</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {listUser.item.map((listUser, key) =>(
                                            <tr key={key}>
                                                <td>{key+1}</td>
                                                <td>{listUser.name}</td>
                                                <td>{listUser.email}</td>
                                                <td>{listUser.mobile}</td>
                                                <td>{listUser.address}</td>
                                                <td>{listUser.country}</td>
                                                <td>{listUser.state}</td>
                                                <td>{listUser.city}</td>
                                                <td><Link to={`/edit1/${listUser.id}`} className="btn btn-outline-primary btn-sm">Edit</Link></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export const Edit = () =>{
    const[user1, setUser1]=useState({
        // name: '',
        // email: '',
        // mobile: '',
        // address: '',
        // country:'',
        // state:'',
        // city:'',
        selectCountry: [],
        selectState: [],
        selectCity: [],
    });
    let history = useHistory();
    let { id } = useParams();
    useEffect(() => {
        Editdata()
        LoadData()
    }, []);

    // 
    const LoadData = async (e) => {
        let cApi = countryApi
        const result = await axios.get(cApi);
        setUser1({
            ...user1, selectCountry: result.data
        });
        console.log(user1.selectCountry);
    }
    const countrychange = async (e) => {
        let sApi = stateApi
        const result = await axios.get(sApi + e.target.value);
        setUser1({
            ...user1, selectState: result.data,
            country: e.target.value
        });
        console.log(user1.selectState);
    };

    const changeState = async (e) => {
        let cApi = cityApi
        const result = await axios.get(cApi + e.target.value);
        setUser1({ ...user1, selectCity: result.data, state: e.target.value });
        console.log(user1.selectCity);
    };
    const changeCity = async (e) => {
        setUser1({ ...user1, city: e.target.value })
    };
    //
     const handleChange = async (e) => {
        setUser1({
            ...user1, [e.target.name]: e.target.value
        })
    };
    const Editdata = async (e) => {
        const result = await axios.get(`http://192.168.43.219:8000/singup/${id}/`);
        setUser1({
            ...user1, name:result.data.name, email: result.data.email,
        mobile: result.data.mobile, address: result.data.address,
    country: result.data.country, state: result.data.state, city: result.data.city})
    }; 
   //
    const SubmitChange = (e) => {
        e.preventDefault();
        console.log(user1);
        let form_data = new FormData();
        form_data.append('name', user1.name);
        form_data.append('email', user1.email);
        form_data.append('mobile', user1.mobile);
        form_data.append('address', user1.address);
        form_data.append('country', user1.country);
        form_data.append('state', user1.state);
        form_data.append('city', user1.city);
        let url = singupApi;
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(response => alert('Successfully Inserted')).then(response => { history.push('/create'); })
            .catch(err => console.log(err))
    };
    return (
        <>
            <div className="container">
                <br></br>
                <form onSubmit={SubmitChange}>
                    <div className="row">
                        <div className="col-md-4">
                            <label>Name</label>
                            <input type="text" className='form-control form-control-sm' name='name'
                                placeholder='Name' id='name' value={user1.name}
                                onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label>Email</label>
                            <input type="text" className='form-control form-control-sm' name='email'
                                placeholder='Email' id='email' value={user1.email}
                                onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label>Mobile</label>
                            <input type="text" className='form-control form-control-sm' name='mobile'
                                placeholder='Mobile' id='mobile' value={user1.mobile}
                                onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label>Address</label>
                            <input type="text" className='form-control form-control-sm' name='address'
                                placeholder='Address' id='address' value={user1.address}
                                onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label>Country</label>
                            <select className="custom-select custom-select-sm" name="country" onChange={countrychange}>
                                <option value={user1.country}>{user1.country}</option>
                                <option>--Select--</option>
                                {user1.selectCountry.map((user1, key) => {
                                    return <option key={key} value={user1.id}>{user1.country_name}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label>State</label>
                            <select className="custom-select custom-select-sm" name="state" onChange={changeState}>
                            <option value={user1.state}>{user1.state}</option>
                                <option>--Select--</option>
                                {user1.selectState.map((e, key) => {
                                    return <option key={key} value={e.id}>{e.state_name}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label>City</label>
                            <select className="custom-select custom-select-sm" name="city" onChange={changeCity}>
                            <option value={user1.city}>{user1.city}</option>
                                <option>--Select--</option>
                                {user1.selectCity.map((e, key) => {
                                    return <option key={key} value={e.id}>{e.city_name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <div className='col-md-4'>
                            <input type="submit" className='btn btn-outline-info btn-sm' />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
