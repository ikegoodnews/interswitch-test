import {format} from 'date-fns';
import React from 'react';
import './index.scss';

const EventDetails = (props) => {
   return (
      <div className="event__details">
         <h3 className="uppercase">selected day info</h3>
         <div className="">{props?.selectedDay ? format(new Date(props?.selectedDay), 'EE, dd-MMM-yyyy') : 'no day selected'}</div>
         <h3 className="uppercase mt-4">event details</h3>
         <div className="">
            {props?.dayEvents?.length && props?.selectedEvent ? (
               <div className="content mt-1">
                  <div className="flex items-center">
                     <h3 className="mr-1">Title:</h3>
                     <p className="">{props?.selectedEvent?.title}</p>
                  </div>
                  <div className="flex items-center">
                     <h3 className="mr-1">City:</h3>
                     <p className="">{props?.selectedEvent?.city}</p>
                  </div>
                  <div className="flex items-center">
                     <h3 className="mr-1">Time:</h3>
                     <p className="">{props?.selectedEvent?.time}</p>
                  </div>

                  <button className="">edit</button>
               </div>
            ) : (
               'no event selected'
            )}
         </div>
      </div>
   );
};

export default EventDetails;
