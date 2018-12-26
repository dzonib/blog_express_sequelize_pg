import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loginUser } from '../../redux/actions/user/auth'

class Login extends Component {
	state = {
		email: '',
		password: ''
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit = (e) => {
        e.preventDefault()
        this.props.loginUser(this.state)
	}

	render() {
		console.log(this.state)
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<p>email</p>
					<input type="text" name="email" onChange={this.onChange} />
					<p>password</p>
					<input type="password" name="password" onChange={this.onChange} />
					<button>Login</button>
				</form>
			</div>
		)
	}
}

export default connect(null, {loginUser})(Login)
