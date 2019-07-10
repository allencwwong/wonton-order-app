import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from './Pages/Dashboard';
import { OrderNew, OrderDetails } from './Pages/Order';
import PrintProvider, { NoPrint } from 'react-easy-print';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/createorder" component={OrderNew} />
                    <PrintProvider>
                        <NoPrint>
                            <Route
                                exact
                                path="/order/:id"
                                component={OrderDetails}
                            />
                        </NoPrint>
                    </PrintProvider>
                </Switch>
            </div>
        );
    }
}

export default App;
