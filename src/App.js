import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './styles/App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LayerLayout from './components/LayerLayout';
import Wallet from './pages/Wallet';
import Transaction from './pages/Transaction';
import Send from './pages/Send';
import Receive from './pages/Receive';
import Setting from './pages/Setting';
import Getwallet from './pages/Getwallet';
import Verifphone from './pages/Verifphone';
import Userverify from './pages/Userverify';
import Addphone from './pages/Addphone';
import VerifyAddphone from './pages/VerifyAddphone';
import MLayout from './components/mobile/MLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Wallet}>
            <MLayout>
              <LayerLayout>
                <Wallet />
              </LayerLayout>
            </MLayout>
          </Route>
          <Route path='/transaction' component={Transaction}>
            <LayerLayout>
              <MLayout>
              <Transaction />
              </MLayout>
            </LayerLayout>
          </Route>
          <Route path='/send' component={Send}>
            <LayerLayout>
              <MLayout>
                <Send />
              </MLayout>
            </LayerLayout>
          </Route>
          <Route path='/receive' component={Receive}>
            <LayerLayout>
              <MLayout>
                <Receive />
              </MLayout>
            </LayerLayout>
          </Route>
          <Route path='/setting' component={Setting}>
            <LayerLayout>
              <MLayout>
                <Setting />
              </MLayout>
            </LayerLayout>
          </Route>
          <Route path='/getwallet' component={Getwallet}>
            <LayerLayout>
              <Getwallet />
            </LayerLayout>
          </Route>
          <Route path='/userverify' component={Userverify}>
            <LayerLayout>
              <Userverify />
            </LayerLayout>
          </Route>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/verifyphone' component={Verifphone}/>
          <Route path='/addphone' component={Addphone}/>
          <Route path='/verifyaddphone' component={VerifyAddphone}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;