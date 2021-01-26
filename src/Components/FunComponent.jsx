import React, { useEffect , useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {ApiUrl} from '../Components/Api';

export const HomePage = () =>{
    const [home, setHome] = useState({
       item: []
    })
    useEffect(() => {
        loadData()
    }, []);
    const loadData = async () => {
        const result = await axios.get(ApiUrl);
        setHome({item:result.data.reverse()});
    }
    return(
        <>
        <br />
                <div className="container">
                    <br />
                    <div className='row'>
                        {home.item.map((home, key) =>(
                            <div className='col-md-4' key={key}>
                                <br />
                                
                                <div className="card" style={{ width: '370px' }}>
                                    <img className="card-img-top" src={home.image} alt={home.image} style={{ width: '100%' }} />
                                    <div className="card-body">
                                        <h4 className="card-title">{home.title}</h4>
                                        <img className="card-img-top" src="https://th.bing.com/th/id/OIP.ltajFjUQtHvaTQFrRl-zgAHaDj?pid=Api&rs=1" alt={home.image} style={{ width: '15%' }} />
                                        <span className='text text-success'><strong>&nbsp;{home.imdb}</strong></span>
                                        <p className='card-text'><strong>Description:</strong> {home.desc}</p>
                                        <a href={home.video} type='button' className="btn btn-outline-primary btn-sm">Play Online</a>
                                    </div>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
        </>
    )
}

export const UploadMovie = () =>{
    const [addmovie, setMovie] = useState({
        title: '',
        content: '',
        desc: '',
        imdb: '',
        image: null,
        video: null
    });
    let history = useHistory();
    const handleChange = (e) => {
        setMovie({
            ...addmovie, [e.target.name]: e.target.value
        })
    };
    const handleImageChange = async (e) => {
        setMovie({
            ...addmovie,image: e.target.files[0]
        })
    };
    const handleVideoChange = async (e) =>{
        setMovie({
            ...addmovie,video: e.target.files[0]
        })
    };
    const SubmitChange = (e) => {
        e.preventDefault();
        console.log(addmovie);
        let form_data = new FormData();
        form_data.append('image', addmovie.image,addmovie.image.name);
        form_data.append('video', addmovie.video, addmovie.video.name);
        form_data.append('title', addmovie.title);
        form_data.append('content', addmovie.content);
        form_data.append('desc', addmovie.desc);
        form_data.append('imdb', addmovie.imdb);
        let url = ApiUrl;
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(response => alert('Successfully Inserted')).then(response => { history.push('/homepage'); })
            .catch(err => console.log(err))
    };
    return(
        <>
        <div className="container">
                    <hr />
                    <form onSubmit={SubmitChange}>
                        <div className='row'>
                            <div className='col-md-4'>
                                <label>Title</label>
                                <input type="text" className='form-control form-control-sm' name='title'
                                placeholder='Title' id='title' value={addmovie.title} 
                                onChange={handleChange} required />
                                <hr />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <label>Content</label>
                                <input type="text" className='form-control form-control-sm' name='content'
                                placeholder='Content' id='content' value={addmovie.content} 
                                onChange={handleChange} required />
                                <hr />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <label>Description</label>
                                <input type="text" className='form-control form-control-sm' name='desc'
                                placeholder='Description' id='desc' value={addmovie.desc} 
                                onChange={handleChange} required />
                                <hr />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <label>IMDb</label>
                                <input type="text" className='form-control form-control-sm' name='imdb'
                                placeholder='IMDb' id='imdb' value={addmovie.imdb} 
                                onChange={handleChange} required />
                                <hr />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <input type="file" id="image" name='image'
                                accept="image/png, image/jfif, image/jpeg"
                                onChange={handleImageChange} required />
                                <hr />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <input type="file" id="video" name='video'
                                onChange={handleVideoChange} required />
                                <hr />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <input type="submit" className='btn btn-outline-info' />
                            </div>
                        </div>
                    </form>
                </div>
        </>
    )
}