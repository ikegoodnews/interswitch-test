import React, {createContext, useEffect, useState} from 'react';
import {eventsKey, getObjectFromStorage} from '../../_utils';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
   const [events, setEvents] = useState([]);
   const [dayEvents, setDayEvents] = useState([]);
   const [selectedEvent, setSelectedEvent] = useState(null);

   useEffect(() => {
      (async () => {
         const storedEvents = (await getObjectFromStorage(eventsKey)) || {};
         setEvents(storedEvents);
      })();
   }, []);

   return <AppContext.Provider value={{events, setEvents, dayEvents, setDayEvents, selectedEvent, setSelectedEvent}}>{children}</AppContext.Provider>;
};
