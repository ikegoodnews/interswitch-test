import {eventsKey, setObjectInStorage} from '../../../_utils';
import React, {useCallback, useState} from 'react';
import FullscreenModal from '..';
import {format} from 'date-fns';
import './index.scss';

const AddReminder = (props) => {
   const [time, setTime] = useState('');
   const [city, setCity] = useState('');
   const [title, setTitle] = useState('');
   const [open, setOpen] = useState(false);

   const setOpenState = useCallback(
      (v) => {
         setOpen(v);
         typeof props?.dropState === 'function' && props?.dropState(v);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [props.dropState],
   );

   console.log('props?.selectedDay', props?.selectedDay);
   const yearIndex = props?.selectedDay && format(new Date(props?.selectedDay), 'yyyy');
   const monthIndex = props?.selectedDay && format(new Date(props?.selectedDay), 'M');
   const dayIndex = props?.selectedDay && format(new Date(props?.selectedDay), 'd');
   const todaysDate = new Date(yearIndex, monthIndex - 1);
   todaysDate.setDate(dayIndex);

   const handleAddEvent = async (day) => {
      if (dayIndex) {
         const date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${dayIndex}`;
         const newEvent = {
            ...props?.events,
            [date]: props?.events[date] ? [...props?.events[date], {title, city, time}] : [{title, city, time}],
         };
         props?.setEvents(newEvent);
         await setObjectInStorage(eventsKey, newEvent);
      }
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
                  <button onClick={handleAddEvent} className="">
                     submit
                  </button>
               </form>
            </div>
         </FullscreenModal>
      </>
   );
};

export default AddReminder;
