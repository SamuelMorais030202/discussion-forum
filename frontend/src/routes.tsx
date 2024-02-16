import { Route, Routes as Switch, Navigate }  from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Profile from  './pages/profile';
import Topic from './pages/topic';
import NewProfile from './pages/new-profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" element={ <Home /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/topic/:id" element={ <Topic /> } />
      <Route path='/new-profile' element={ <NewProfile /> } />
      <Route path="" element={ <Navigate to="/login" /> } />
      <Route path="*" element={ <Navigate to="/login" /> } />
    </Switch>
  )
}