import React from "react";
// import { database } from "../database/firebase";
import './index.css';
import { withRouter, BrowserRouter as Router, Route, } from "react-router-dom";
import { database } from "../../database/firebase";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            getValInFireStore: '',
            userStore: '',
            passStore: '',
            user: '',
            pass: '',
        };

    }

    getDataFirebase = (path, state) => {
        database.ref(`/${path}`).on('value', (snapshot) => {
            switch (state) {
                case 'getValUserInFireStore':
                    return (
                        this.setState({
                            userStore: snapshot.val(),
                        }, () => {
                            // console.log(this.state.userStore);
                        })
                    )
                case 'getValPassInFireStore':
                    return (
                        this.setState({
                            passStore: snapshot.val(),
                        }, () => {
                            // console.log(this.state.passStore);
                        })
                    )
            }
        });
    }

    componentDidMount() {
        this.getDataFirebase('account/user', 'getValUserInFireStore');
        this.getDataFirebase('account/pass', 'getValPassInFireStore');
        // database.ref("/CountDown").on('value', (snapshot) => {
        //   this.setState({
        //     getDateTime: snapshot.val(),
        //   })
        // });
        //database.ref("hello").set('tw12');
        // database.ref().update({hello: 'two'});
    }

    handleChange = (e, type) => {
        switch (type) {
            case 'user':
                this.setState({
                    user: e.target.value
                })
                break;
            case 'pass':
                this.setState({
                    pass: e.target.value
                })
                break;

            default:
                break;
        }
    }

    handleLogin = (event) => {
        event.preventDefault()

        const { user, pass, userStore, passStore } = this.state;
        if (user == userStore && pass == passStore) {
            this.props.history.push("/blog-overview");
        } else {
            alert('Tài khoản hay mật khẩu không đúng vui lòng kiểm tra lại')
        }
    }

    render() {
        return (
            <div className="mainpage">
                <div className="container-style">
                    <div className="form-box">
                        <h3 className="title-style">Smart Agriculture</h3>
                        <div className="header-form">
                            <h4 className="text-primary text-center"><i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i></h4>
                            <div className="image">
                            </div>
                        </div>
                        <div className="body-form">
                            <form>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-user"></i></span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        // style="color: black;"
                                        // value={state.value}
                                        onChange={(e) => this.handleChange(e, 'user')}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-lock"></i></span>
                                    </div>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={(e) => this.handleChange(e, 'pass')}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-secondary btn-block"
                                    onClick={this.handleLogin}
                                >LOGIN</button>
                                <div className="message">
                                    <div><input type="checkbox" /> Remember me</div>
                                    <div><a href="#">Forgot your password</a></div>
                                </div>
                            </form>
                            <div className="social">
                                <a href="#"><i className="fa fa-facebook"></i></a>
                                <a href="#"><i className="fa fa-twitter-square"></i></a>
                                <a href="#"><i className="fa fa-google"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginPage);
