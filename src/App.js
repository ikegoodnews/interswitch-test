import {AddReminder, Calendar, DayEvents, EventDetails} from './_components';
import React from 'react';

function App() {
   return (
      <div className="w-full h-screen flex items-center justify-center app__wrapper">
         <div className="container mx-auto flex items-center justify-center">
            <DayEvents />

            <div className="p-lg-8 p-4">
               <Calendar />
            </div>

            <div className="relative h-[80vh] w-1/4 bg-color-white text-color-dark p-lg-8 p-4">
               <EventDetails />
               <AddReminder className="absolute bg-color-dark text-color-white font-bold bottom-6 right-6 h-12 w-12 hover:bg-color-btn-hover transition duration-300 rounded-50">
                  +
               </AddReminder>
            </div>
         </div>
      </div>
   );
}

export default App;
