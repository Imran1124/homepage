import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import {ApiUrl} from '../Components/Api';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            pic: ''
        }
    }
    componentDidMount() {
        fetch(ApiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                console.log(JSON.parse(data))
                this.setState({ item: JSON.parse(data) })
            })
    }


    render() {
        return (
            <>
                <br />
                <div className="container">
                    <br />
                    <div className='row'>
                        {this.state.item.map((e, key) =>
                            <div className='col-md-4' key={key}>
                                <br />
                                
                                <div className="card" style={{ width: '370px' }}>
                                    <img className="card-img-top" src={e.image} alt={e.image} style={{ width: '100%' }} />
                                    <div className="card-body">
                                        <h4 className="card-title">{e.title}</h4>
                                        <img className="card-img-top" src="https://th.bing.com/th/id/OIP.ltajFjUQtHvaTQFrRl-zgAHaDj?pid=Api&rs=1" alt={e.image} style={{ width: '15%' }} />
                                        <span className='text text-success'><strong>&nbsp;{e.imdb}</strong></span>
                                        <p className='card-text'><strong>Description:</strong> {e.desc}</p>
                                        <a href={e.video} type='button' className="btn btn-outline-primary btn-sm">Play Online</a>
                                    </div>
                                </div>
                                
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
    }
}

export class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            desc: '',
            imdb: '',
            image: null,
            video: null
        }

        this.state.handleChange = (e) => {
            this.setState({
                [e.target.id]: e.target.value
            })
        };

        this.state.handleImageChange = (e) => {
            this.setState({
                image: e.target.files[0]
            })
        };

        this.state.handleVideoChange = (e)=>{
            this.setState({
                video: e.target.files[0]
            })
        }

        this.state.handleSubmit = (e) => {
            e.preventDefault();
            console.log(this.state);
            let form_data = new FormData();
            form_data.append('image', this.state.image, this.state.image.name);
            form_data.append('video', this.state.video, this.state.video.name);
            form_data.append('title', this.state.title);
            form_data.append('content', this.state.content);
            form_data.append('desc', this.state.desc);
            form_data.append('imdb', this.state.imdb);
            let url = ApiUrl;
            axios.post(url, form_data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then(response => alert('Successfully Inserted')).then(response => { this.props.history.push('/home'); })
                .catch(err => console.log(err))
        };
    }
    render() {
        return (
            <>
                <div className="container">
                    <hr />
                    <form onSubmit={this.state.handleSubmit}>
                        <div className='row'>
                            <div className='col-md-4'>
                                <label>Title</label>
                                <input type="text" className='form-control form-control-sm' placeholder='Title' id='title' value={this.state.title} onChange={this.state.handleChange} required />
                                <hr />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <label>Content</label>
                                <input type="text" className='form-control form-control-sm' placeholder='Content' id='content' value={this.state.content} onChange={this.state.handleChange} required />
                                <hr />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <label>Description</label>
                                <input type="text" className='form-control form-control-sm' placeholder='Description' id='desc' value={this.state.desc} onChange={this.state.handleChange} required />
                                <hr />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <label>IMDb</label>
                                <input type="text" className='form-control form-control-sm' placeholder='IMDb' id='imdb' value={this.state.imdb} onChange={this.state.handleChange} required />
                                <hr />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <input type="file" id="image" accept="image/png, image/jfif, image/jpeg" onChange={this.state.handleImageChange} required />
                                <hr />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-4'>
                                <input type="file" id="video" onChange={this.state.handleVideoChange} required />
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
}


export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            pic: ''
        }
    }

    componentDidMount() {
        let { id } = this.props.match.params;
        axios.get(ApiUrl+'?search=' + id)
            .then(res => {
                this.setState({ item: res.data });
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    render() {
        return (
            <>
                <br />
                <div className="container">
                    <br />
                    <div className='row'>
                        {this.state.item.map((e, key) =>
                            <div className='col-md-4' key={key}>
                                <br />
                                <div className="card" style={{ width: '370px' }}>
                                    <img className="card-img-top" src={e.image} alt={e.image} style={{ width: '100%' }} />
                                    <div className="card-body">
                                        <h4 className="card-title">{e.title}</h4>
                                        <img className="card-img-top" src="https://th.bing.com/th/id/OIP.ltajFjUQtHvaTQFrRl-zgAHaDj?pid=Api&rs=1" alt={e.image} style={{ width: '20%' }} />
                                        <span className='text text-success'><strong>&nbsp;{e.imdb}</strong></span>
                                        <p className='card-text'><strong>Description:</strong> {e.desc}</p>
                                        <a href={e.video} type='button' className="btn btn-outline-primary btn-sm">Play Online</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
    }
}