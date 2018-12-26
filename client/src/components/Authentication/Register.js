import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../redux/actions/user/auth'



class Register extends Component {
	state = {
		name: '',
		email: '',
		password: ''
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit = (e) => {
		e.preventDefault()
		this.props.registerUser(this.state)
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<p>name</p>
					<input type="text" name="name" onChange={this.onChange} />
					<p>email</p>
					<input type="text" name="email" onChange={this.onChange} />
					<p>password</p>
					<input type="password" name="password" onChange={this.onChange} />
					<button>Register</button>
				</form>
			</div>
		)
	}
}

export default connect(null, {registerUser})(Register)
