import { Outlet } from 'react-router-dom';

export const LayoutContainer = () => {
   return (
      <div className="container mx-auto">
         <Outlet />
      </div>
   );
};
