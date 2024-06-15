import {eventsKey, getObjectFromStorage, setObjectInStorage} from './_utils';
import React, {useEffect, useState} from 'react';
import {AddReminder, Calendar} from './_components';
import {format} from 'date-fns';

function App() {
   const [events, setEvents] = useState({});
   const [dayEvents, setDayEvents] = useState([]);
   const [selectedDay, setSelectedDay] = useState(null);
   const [selectedEvent, setSelectedEvent] = useState(null);

   useEffect(() => {
      (async () => {
         const storedEvents = (await getObjectFromStorage(eventsKey)) || {};
         setEvents(storedEvents);
      })();
   }, []);

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
            <div className="daily__events h-[80vh] w-1/4 bg-color-white text-color-dark p-lg-8 p-4">
               <h3 className="uppercase">events</h3>
               <ul className="">
                  {dayEvents?.length ? (
                     dayEvents?.map((event, index) => (
                        <li key={index} className="" onClick={() => onEventSelect(event)}>
                           {event}
                        </li>
                     ))
                  ) : (
                     <li>No event for this day</li>
                  )}
               </ul>
            </div>

            <div className="p-lg-8 p-4">
               <Calendar onDaySelect={onDaySelect} onEventSelect={onEventSelect} events={events} selectedEvent={selectedEvent} />
            </div>

            <div className="event__details relative h-[80vh] w-1/4 bg-color-white text-color-dark p-lg-8 p-4">
               <h3 className="uppercase">event description</h3>
               <div className="">{dayEvents?.length && selectedEvent ? selectedEvent : 'no event selected'}</div>
               <AddReminder
                  events={events}
                  setEvents={setEvents}
                  selectedDay={selectedDay}
                  className="absolute bg-color-dark text-color-white font-bold bottom-6 right-6 h-12 w-12 hover:bg-color-btn-hover transition duration-300 rounded-50">
                  +
               </AddReminder>
               {/* <button
                  onClick={handleAddEvent}
                  className="absolute bg-color-dark text-color-white font-bold bottom-6 right-6 h-12 w-12 hover:bg-color-btn-hover transition duration-300 rounded-50">
                  +
               </button> */}
            </div>
            {/* <button onClick={() => editEvent({ ...event, title: prompt('Edit event title', event.title) })}>Edit</button>
               <button onClick={() => deleteEvent(event.id)}>Delete</button> */}

            {/* // src/components/EventForm.js */}
            {/* import React, { useState } from 'react';
            const EventForm = ({ addEvent }) => {
            const [title, setTitle] = useState('');
            const [date, setDate] = useState('');

            const handleSubmit = (e) => {
               e.preventDefault();
               addEvent({ id: Date.now(), title, date });
               setTitle('');
               setDate('');
            };

            return (
               <form onSubmit={handleSubmit}>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" required />
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                  <button type="submit">Add Event</button>
               </form>
            );
            };

            export default EventForm; */}
         </div>
      </div>
   );
}

export default App;
