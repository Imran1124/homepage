import React from 'react';
import { Link } from "react-router-dom";
export class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serch: ''
        }

    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <>
                <div>
                    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                        <span className="navbar-brand" style={{ color: 'red' }}><Link className="navbar-nav" to="/home" style={{color:'red', textDecoration:'none' }}>MovieFlix</Link></span>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <span className="nav-link" ><Link className="navbar-nav" to="/home" style={{ textDecoration:'none' }}>Home</Link></span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link" ><Link className="navbar-nav" to="/upload" style={{textDecoration:'none'}}>Upload</Link></span>
                                </li>
                            </ul>

                            <div className="form-inline" style={{ float: 'left' }}>
                                <form>
                                    <div className="input-group mb-12">
                                        <input className="form-control form-control-sm" name="serch" value={this.state.serch} onChange={this.changeHandler} type="text" placeholder="Serch by movie title..." />
                                        <div className="input-group-append">
                                            <a href={'/filter/' + this.state.serch} className="btn btn-outline-primary btn-sm">Serch</a>
                                        </div>
                                    </div>
                                </form>
                            </div>


                        </div>

                    </nav>
                </div>
            </>
        )
    }

}