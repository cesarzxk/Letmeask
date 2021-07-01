import NewRoom from './pages/NewRoom';
import Home from './pages/Home';
import Room from './pages/Room';



import './services/firebase';
import './styles/global.scss';

import {BrowserRouter,Route, Switch} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext'



function App() {
  

  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/rooms/new' exact  component={NewRoom}/>
            <Route path='/rooms/:id'  component={Room}/>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
