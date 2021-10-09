import React                                      from 'react';
import ReactDOM                                   from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reportWebVitals                            from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initConfig }                             from "./service/config/config";
import { Home }                                   from "./feature/home/Home";
import { Template }                               from "./feature/home/components/layout/Template";
import { Ingredients }                            from "./feature/home/components/ingredient/Ingredients";
import { Recipes }                                from "./feature/home/components/recipe/Recipes";

const AppWrapper = () => {
    return (
        <Router>
            <Template>
                <Switch>
                    <Route path="/ingredient" component={Ingredients}/>
                    <Route path="/recipe" component={Recipes}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </Template>
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
