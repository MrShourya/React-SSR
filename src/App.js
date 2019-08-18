import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Home from './pages/homePageComponent';
import About from './pages/aboutPageComponent';
import DLSComponent from './pages/DLSComponent';

class App extends React.Component {

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dls">DLS Component</NavLink>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/" render={props => (<Home {...props} />)} />
                    <Route path="/about" render={props => (<About {...props} />)} />
                    <Route path="/dls" render={props => (<DLSComponent {...props} />)} />
                </Switch>
            </div>
        )
    }
}

export default App;