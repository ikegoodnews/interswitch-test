import {eventsKey, getObjectFromStorage} from './_utils';
import {AddReminder, AppContext, Calendar, DayEvents, EventDetails} from './_components';
import React, {useContext, useEffect, useState} from 'react';
import {format} from 'date-fns';

function App() {
   const {events, setEvents, dayEvents, setDayEvents, selectedEvent, setSelectedEvent} = useContext(AppContext);
   const [selectedDay, setSelectedDay] = useState(null);

   const onDaySelect = (dayInfo, events) => {
      console.log(`dayInfo=====>`, dayInfo);
      console.log(`events=====>`, events);
      setDayEvents(events ? events : null);
      setSelectedDay(dayInfo ? dayInfo : null);
   };

   const onEventSelect = (eventInfo) => {
      console.log(`eventInfo=====>`, eventInfo);
      setSelectedEvent(eventInfo ? eventInfo : null);
   };

   return (
      <div className="w-full h-screen flex items-center justify-center app__wrapper">
         <div className="container mx-auto flex items-center justify-center">
            <DayEvents onEventSelect={onEventSelect} />

            <div className="p-lg-8 p-4">
               <Calendar onDaySelect={onDaySelect} onEventSelect={onEventSelect} />
            </div>

            <div className="relative h-[80vh] w-1/4 bg-color-white text-color-dark p-lg-8 p-4">
               <EventDetails dayEvents={dayEvents} selectedDay={selectedDay} selectedEvent={selectedEvent} />
               <AddReminder
                  events={events}
                  setEvents={setEvents}
                  selectedDay={selectedDay}
                  className="absolute bg-color-dark text-color-white font-bold bottom-6 right-6 h-12 w-12 hover:bg-color-btn-hover transition duration-300 rounded-50">
                  +
               </AddReminder>
            </div>
         </div>
      </div>
   );
}

export default App;
