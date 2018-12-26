import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import store from '../redux/store'
import Register from './Authentication/Register'
import Login from './Authentication/Login'

class App extends Component {
	render() {
		return (
			<Provider store={store}>
      <h1>Header</h1>
				<Router>
					<div className="App">
						<Route path="/auth/register" component={Register} />
            <Route path="/auth/login" component={Login} />
					</div>
				</Router>
			</Provider>
		)
	}
}

export default App
