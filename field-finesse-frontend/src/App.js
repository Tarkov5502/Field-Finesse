import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CallCenterPage from './pages/CallCenterPage';
import WorkOrdersPage from './pages/WorkOrdersPage';
import TechniciansPage from './pages/TechniciansPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={CallCenterPage} />
        <Route path="/work-orders" component={WorkOrdersPage} />
        <Route path="/technicians" component={TechniciansPage} />
      </Switch>
    </Router>
  );
};

export default App;

