import { Route, Routes as Switch, Navigate }  from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Profile from  './pages/profile';
import Topic from './pages/topic';

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" element={ <Login /> } />
      <Route path="/home" element={ <Home /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/topic" element={ <Topic /> } />
      <Route path="" element={ <Navigate to="/login" /> } />
      <Route path="*" element={ <Navigate to="/login" /> } />
    </Switch>
  )
}