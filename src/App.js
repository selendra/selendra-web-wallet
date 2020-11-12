import React, { useEffect } from 'react';
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
import AxiosInstance from './helpers/AxiosInstance';
import { useStateValue } from './StateProvider';

function App() {
  const [state, dispatch] = useStateValue();

  // useEffect(() => {
  //   AxiosInstance().get('/userprofile')
  //   .then((res) => {
  //     dispatch({
  //       type: 'SET_USER',
  //       user: res.data
  //     })
  //   })
  // }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Wallet}>
            <LayerLayout>
              <Wallet />
            </LayerLayout>
          </Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/signup' component={SignUp}></Route>
          <Route path='/verifyphone' component={Verifphone}></Route>
          <Route path='/transaction' component={Transaction}>
            <LayerLayout>
              <Transaction />
            </LayerLayout>
          </Route>
          <Route path='/send' component={Send}>
            <LayerLayout>
              <Send />
            </LayerLayout>
          </Route>
          <Route path='/receive' component={Receive}>
            <LayerLayout>
              <Receive />
            </LayerLayout>
          </Route>
          <Route path='/setting' component={Setting}>
            <LayerLayout>
              <Setting />
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;