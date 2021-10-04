import React                                      from 'react';
import ReactDOM                                   from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reportWebVitals                            from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initConfig }                             from "./service/config/config";
import { Home }                                   from "./feature/home/Home";

const AppWrapper = () => {
    return (
        <Router>
                <Switch>
                    <Route path="/" component={Home}/>
                </Switch>
        </Router>
    )
}

initConfig()
    .then(() => {
        ReactDOM.render(
            (<AppWrapper />),
            document.getElementById('root')
        );
    })
    .catch(err => {
        console.error('App bootstrap stop', err);
    });

reportWebVitals();
