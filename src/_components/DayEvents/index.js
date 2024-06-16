import {AppContext} from '../AppContext';
import React, {useContext} from 'react';
import './index.scss';

const DayEvents = () => {
   const {dayEvents, onEventSelect} = useContext(AppContext);

   return (
      <div className="daily__events h-[80vh] w-1/4 bg-color-white text-color-dark p-lg-8 p-4">
         <h3 className="uppercase">events</h3>
         <ul className="pt-4">
            {dayEvents?.length ? (
               dayEvents?.map((event, index) => (
                  <li key={index} className="mb-2 p-1" onClick={(e) => onEventSelect(e, event)}>
                     {event?.title}
                  </li>
               ))
            ) : (
               <li>No event for this day</li>
            )}
         </ul>
      </div>
   );
};

export default DayEvents;
