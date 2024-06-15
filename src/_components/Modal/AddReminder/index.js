import React, {useCallback, useContext, useState} from 'react';
import {eventsKey, setObjectInStorage} from '../../../_utils';
import {AppContext} from '../../AppContext';
import FullscreenModal from '..';
import {format} from 'date-fns';
import './index.scss';

const AddReminder = (props) => {
   const forEdit = props.type === 'edit';
   const {events, setEvents, selectedDay, selectedEvent} = useContext(AppContext);
   const [open, setOpen] = useState(false);
   const [city, setCity] = useState(selectedEvent?.city);
   const [time, setTime] = useState(selectedEvent?.title);
   const [title, setTitle] = useState(selectedEvent?.title);

   const setOpenState = useCallback(
      (v) => {
         setOpen(v);
         typeof props?.dropState === 'function' && props?.dropState(v);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [props.dropState],
   );

   const yearIndex = selectedDay && format(new Date(selectedDay), 'yyyy');
   const monthIndex = selectedDay && format(new Date(selectedDay), 'M');
   const dayIndex = selectedDay && format(new Date(selectedDay), 'd');
   const todaysDate = new Date(yearIndex, monthIndex - 1);
   todaysDate.setDate(dayIndex);

   const handleAddEvent = async (day) => {
      if (dayIndex) {
         const date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${dayIndex}`;
         console.log(`date=====>`, date);
         const newEvent = {
            ...events,
            [date]: events[date] ? [...events[date], {id: date, title, city, time}] : [{id: date, title, city, time}],
         };
         setEvents(newEvent);
         await setObjectInStorage(eventsKey, newEvent);
      }
   };

   const handleEditEvent = () => {
      // setEvents((prevEvents) =>
      //    prevEvents.map((event) => {
      //       event.id === selectedEvent.id ? {...event, title, city, time} : event;
      //       setObjectInStorage();
      //    }),
      // );
   };

   // <button onClick={() => editEvent({ ...event, title: prompt('Edit event title', event.title) })}>Edit</button>
   // <button onClick={() => deleteEvent(event.id)}>Delete</button>

   // const editEvent = (updatedEvent) => {
   //    props?.setEvents(props?.events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
   // };

   // const deleteEvent = (id) => {
   //    props?.setEvents(props?.events.filter((event) => event.id !== id));
   // };

   const handleClickOutside = useCallback(() => {
      setTime('');
      setCity('');
      setTitle('');
      setOpenState(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   // useEffect(() => {
   //    const listener = AppEmitter.addListener('', (event) => {
   //       handleClickOutside();
   //    });

   //    return () => listener.remove();
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, []);

   return (
      <>
         <button onClick={() => setOpenState(true)} className={props.className}>
            {props.children}
         </button>
         <FullscreenModal open={open} className="flex" onClickAway={handleClickOutside}>
            <div className="add__reminder p-8">
               <form className="flex-column">
                  <h3 className="mb-4">Add Reminder</h3>
                  <label htmlFor="title" className="">
                     Title
                  </label>
                  <input type="text" name="title" id="title" maxlength="30" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  <label htmlFor="city" className="">
                     City
                  </label>
                  <input type="text" name="city" id="city" maxlength="30" value={city} onChange={(e) => setCity(e.target.value)} required />
                  {/* <input type="text" name="title" id="title" value={day} onChange={(e) => setDay(e.target.value)} /> */}
                  <label htmlFor="time" className="">
                     Time
                  </label>
                  <input type="time" name="time" id="time" maxlength="30" value={time} onChange={(e) => setTime(e.target.value)} required />
                  <button onClick={forEdit ? handleEditEvent : handleAddEvent} className="">
                     submit
                  </button>
               </form>
            </div>
         </FullscreenModal>
      </>
   );
};

export default AddReminder;
