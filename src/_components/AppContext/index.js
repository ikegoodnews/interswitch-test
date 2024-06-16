import React, {createContext, useEffect, useState} from 'react';
import {eventsKey, getObjectFromStorage} from '../../_utils';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
   const [events, setEvents] = useState([]);
   const [dayEvents, setDayEvents] = useState([]);
   const [selectedDay, setSelectedDay] = useState(null);
   const [selectedEvent, setSelectedEvent] = useState(null);

   useEffect(() => {
      (async () => {
         const storedEvents = (await getObjectFromStorage(eventsKey)) || {};
         setEvents(storedEvents);
      })();
   }, []);

   const onEventSelect = (e, eventInfo) => {
      e.stopPropagation();
      // console.log(`eventInfo=====>`, eventInfo);
      setSelectedEvent(eventInfo ? eventInfo : null);
   };

   const onDaySelect = (dayInfo, events) => {
      // console.log(`dayInfo=====>`, dayInfo);
      // console.log(`events=====>`, events);
      setDayEvents(events ? events : null);
      setSelectedDay(dayInfo ? dayInfo : null);
   };

   return (
      <AppContext.Provider
         value={{
            events,
            setEvents,
            dayEvents,
            setDayEvents,
            selectedEvent,
            setSelectedEvent,
            selectedDay,
            setSelectedDay,
            onEventSelect,
            onDaySelect,
         }}>
         {children}
      </AppContext.Provider>
   );
};
