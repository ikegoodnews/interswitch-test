import {AppContext} from '../AppContext';
import React, {useContext} from 'react';
import {format} from 'date-fns';
import './index.scss';
import AddReminder from '../Modal/AddReminder';

const EventDetails = () => {
   const {dayEvents, selectedEvent, selectedDay} = useContext(AppContext);

   return (
      <div className="event__details">
         <h3 className="uppercase">selected day info</h3>
         <div className="">{selectedDay ? format(new Date(selectedDay), 'EE, dd-MMM-yyyy') : 'no day selected'}</div>
         <h3 className="uppercase mt-4">event details</h3>
         <div className="">
            {dayEvents?.length && selectedEvent ? (
               <div className="content mt-1">
                  <div className="flex items-center">
                     <h3 className="mr-1">Title:</h3>
                     <p className="">{selectedEvent?.title}</p>
                  </div>
                  <div className="flex items-center">
                     <h3 className="mr-1">City:</h3>
                     <p className="">{selectedEvent?.city}</p>
                  </div>
                  <div className="flex items-center">
                     <h3 className="mr-1">Time:</h3>
                     <p className="">{selectedEvent?.time}</p>
                  </div>

                  <AddReminder type="edit" className="">
                     edit
                  </AddReminder>
               </div>
            ) : (
               'no event selected'
            )}
         </div>
      </div>
   );
};

export default EventDetails;
