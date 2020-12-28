import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            registration_errors: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event){
        const { email, password } = this.state
        const config = { withCredentials: true }
        const data = {
            user: {
                email,
                password
            }
        }

        axios.post('http://localhost:3001/sessions', data, config)
            .then(response => {
                if (response.data.logged_in) {
                    this.props.handleSuccessfulAuth(response.data)
                }
            })
            .catch(err => console.error({err}))
        event.preventDefault();
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}