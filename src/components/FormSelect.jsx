import { forwardRef } from 'react';

export const FormSelect = forwardRef(({ onChange, onBlur, name, label }, ref) => (
   <>
      <label>{label}</label>
      <select
         className="select select-bordered placeholder:font-light font-bold mx-3 md:mx-0 max-w-xs mt-5 dark:text-gray-300 dark:bg-gray-600"
         name={name}
         ref={ref}
         onChange={onChange}
         onBlur={onBlur}
      >
         <option value="">--Selecciona distrito--</option>
         <option value="Ciutat Vella">Ciutat Vella</option>
         <option value="Sant Martí">Sant Martí</option>
         <option value="Eixample">Eixample</option>
         <option value="Sants-Montjuïc">Sants-Montjuïc</option>
         <option value="Les Corts">Les Corts</option>
         <option value="Sarrià-Sant Gervasi">Sarrià-Sant Gervasi</option>
         <option value="Gràcia">Gràcia</option>
         <option value="Horta-Guinardó">Horta-Guinardó</option>
         <option value="Nou Barris">Nou Barris</option>
         <option value="Sant Andreu">Sant Andreu</option>
      </select>
   </>
));
