import {eventsKey, setObjectInStorage} from '../../_utils';
import AddReminder from '../Modal/AddReminder';
import {AppContext} from '../AppContext';
import React, {useContext} from 'react';
import {format} from 'date-fns';
import {Dialogue} from '..';
import './index.scss';

const EventDetails = () => {
   const {setEvents, selectedEvent, selectedDay} = useContext(AppContext);

   const deleteReminder = async (date, reminder) => {
      setEvents((prevReminders) => {
         const updatedReminders = {...prevReminders};
         updatedReminders[selectedEvent?.id] = updatedReminders[selectedEvent?.id].filter((r) => r !== selectedEvent);
         if (updatedReminders[selectedEvent?.id].length === 0) {
            delete updatedReminders[selectedEvent?.id];
         }
         setObjectInStorage(eventsKey, updatedReminders);
         return updatedReminders;
      });
   };

   return (
      <div className="event__details">
         <h3 className="uppercase">selected day info</h3>
         <div className="">{selectedDay ? format(new Date(selectedDay), 'EE, dd-MMM-yyyy') : 'no day selected'}</div>
         <h3 className="uppercase mt-4">event details</h3>
         <div className="">
            {selectedEvent ? (
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
                     <h3 className="mr-1">Date:</h3>
                     <p className="">{format(new Date(selectedEvent?.id), 'EE, dd-MM-yyyy')}</p>
                  </div>
                  <div className="flex items-center">
                     <h3 className="mr-1">Time:</h3>
                     <p className="">{selectedEvent?.time}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                     <AddReminder
                        type="edit"
                        className="mr-4 transition border border-solid text-color-1 border-color-1 hover:border-color-1-hover rounded-4 p-2 capitalize text-xs">
                        edit reminder
                     </AddReminder>
                     <Dialogue
                        description="Delete reminder from your calendar?"
                        title="Delete Reminder?"
                        handleAction={deleteReminder}
                        actionText="Yes, please."
                        rejectText="Cancel"
                        className="bg-color-1 transition hover:bg-color-1-hover border border-color-1 hover:border-color-1-hover rounded-4 p-2 capitalize text-color-white text-xs">
                        delete reminder
                     </Dialogue>
                  </div>
               </div>
            ) : (
               'no event selected'
            )}
         </div>
      </div>
   );
};

export default EventDetails;
