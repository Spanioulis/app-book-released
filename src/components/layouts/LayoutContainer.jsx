import { Outlet } from 'react-router-dom';

const LayoutContainer = () => {
   return (
      <div className="container mx-auto">
         <Outlet />
      </div>
   );
};

export default LayoutContainer;
