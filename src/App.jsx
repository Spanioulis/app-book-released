import { useContext } from 'react';
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
import ProtectedRoute from './components/layouts/ProtectedRoute';
import LayoutContainer from './components/layouts/LayoutContainer';

import ScrollToTop from './utils/ScrollToTop';

import './App.css';

function App() {
   const { user } = useContext(UserContext);

   if (user === false) {
      return <div className="spinner"></div>;
   }

   return (
      <>
         <div className="container-app bg-silver dark:bg-dark min-h-screen text-metal dark:text-tahiti">
            <Navbar />
            <ScrollToTop />
            <Routes>
               <Route element={<ProtectedRoute />}>
                  {/* <Route index element={<Home />} /> */}
                  <Route path="/home" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/upload" element={<UploadBook />} />
                  <Route path="/search/:q" element={<Search />} />
                  <Route path="/chat" element={<Chat />} />
               </Route>

               <Route element={<LayoutContainer />}>
                  {/* <Route path="/" element={<Landing />} /> */}
                  <Route index element={<Landing />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/edmundo" element={<Edmundo />} />
                  <Route path="*" element={<NotFound />} />
               </Route>
            </Routes>
         </div>
      </>
   );
}

export default App;
