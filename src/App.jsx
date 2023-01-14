import { useContext } from 'react';
import { UserContext } from './context/UserProvider';
import { Routes, Route } from 'react-router-dom';
import { ChatAPI, Edmundo, Home, Landing, Login, NotFound, Profile, Register, Search, UploadBook } from './routes';
import { Navbar } from './components';
import { ProtectedRoute, LayoutContainer } from './components/layouts';
import { ScrollToTop } from './utils';

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
                  <Route path="/chat" element={<ChatAPI />} />
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
