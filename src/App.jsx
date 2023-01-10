import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserProvider';
import { Routes, Route } from 'react-router-dom';

import Home from './routes/Home';
import Landing from './routes/Landing';
import Login from './routes/Login';
import Register from './routes/Register';
import Profile from './routes/Profile';
import NotFound from './routes/NotFound';
import Edmundo from './routes/Edmundo';
import UploadBook from './routes/UploadBook';
import Search from './routes/Search';
import Chat from './routes/Chat';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import ScrollToTop from './utils/ScrollToTop';

import './App.css';
// import './styles/loading.css';

function App() {
   const { user } = useContext(UserContext);
   // console.log('user', user);
   //* Enviar esta información a cada componente donde se vaya a usar...

   if (user === false) {
      return <div className="spinner"></div>;
   }

   return (
      <>
         <div className="container-app bg-silver dark:bg-dark min-h-screen text-metal dark:text-tahiti">
            <Navbar />
            <ScrollToTop />
            <Routes>
               <Route path="/" element={<ProtectedRoute />}>
                  <Route index element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/upload" element={<UploadBook />} />
                  <Route path="/search/:q" element={<Search />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/chat" element={<Chat />} />
               </Route>

               <Route>
                  {/* Hacer un Landing (public) */}
                  <Route path="/landing" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/edmundo" element={<Edmundo />} />
                  <Route path="*" element={<NotFound />} />
               </Route>
               {/* Crea componente 404notFound */}
            </Routes>
         </div>
      </>
   );
}

export default App;
