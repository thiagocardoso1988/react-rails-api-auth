import React, { Component } from 'react'
import axios from 'axios'

export default class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            password_confirmation: '',
            registration_errors: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event){
        const { email, password, password_confirmation } = this.state
        const data = {
            user: {
                email,
                password,
                password_confirmation
            }
        }
        const config = {
            withCredentials: true
        }

        axios.post('http://localhost:3001/registrations', data, config)
            .then(response => {
                if (response.data.status === 'created') {
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
                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Password confirmation"
                        value={this.state.password_confirmation}
                        onChange={this.handleChange}
                        required
                    />

                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }
}