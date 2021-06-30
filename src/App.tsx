import NewRoom from './pages/NewRoom';
import Home from './pages/Home';

import './services/firebase';
import './styles/global.scss';

import {BrowserRouter,Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path='/' exact component={Home}/>
        <Route path='/rooms/new'  component={NewRoom}/>
      </BrowserRouter>
      
      
      
    </div>
  );
}

export default App;
