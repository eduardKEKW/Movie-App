import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalProvider } from 'Providers';

import { Home, Movie } from 'pages';

const App  = ({  }) => {
    return (
        <Router>
            <GlobalProvider>
                <Switch>
                    <Route exact path='/' exact render={Home} /> 
                    <Route exact path='/movie/:slug' exact render={(props) => <Movie initialState={props} />} />
                </Switch>
            </GlobalProvider>
        </Router>
    );
}

export default App;
