import NewRoom from './pages/NewRoom';
import Home from './pages/Home';

import './services/firebase';
import './styles/global.scss';

import {BrowserRouter,Route} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext'



function App() {
  

  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Route path='/' exact component={Home}/>
          <Route path='/rooms/new'  component={NewRoom}/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
