import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from './Pages/Dashboard';
import { OrderNew, OrderDetails } from './Pages/Order';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/createorder" component={OrderNew} />
                    <Route exact path="/order/:id" component={OrderDetails} />
                </Switch>
            </div>
        );
    }
}

export default App;
