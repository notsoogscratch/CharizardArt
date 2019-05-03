import React from 'react';
import { Route, Redirect, Link, BrowserRouter as Router } from 'react-router-dom'; // removed Switch, Redirect
import { Provider } from 'react-redux';
import Signin from './components/Signin';
import Main from './containers/MainContainer';
import Home from './components/Home';
import Signup from './components/Signup';
import Chart from './components/Chart'
import Chat from './components/Chat'
import store from './store';

require('./styles.css')

//IMPORTANT - any new components added that will be displayed upon rerouting, must make route here first. Follow pattern below. 
const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Route path='/' component={Main} />
            <Route path='/signin' component={Signin} />
            <Route path='/home' component={Home} />
            <Route path='/signup' component={Signup} />
            <Route path='/stats' component={Chart} />
            <Route path='/chat' component={Chat} />
        </Router>
    </Provider>
)

export default Root;