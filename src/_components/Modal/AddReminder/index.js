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
         const newEvent = {
            ...events,
            [date]: events[date] ? [...events[date], {id: date, title, city, time}] : [{id: date, title, city, time}],
         };
         setEvents(newEvent);
         await setObjectInStorage(eventsKey, newEvent);
      }
   };

   const handleEditReminder = (id) => {
      setEvents((prevReminders) => {
         const updatedReminders = {...prevReminders};
         updatedReminders[selectedEvent?.id] = updatedReminders[selectedEvent?.id].map((reminder) =>
            reminder?.id === selectedEvent?.id ? {id: selectedEvent?.id, title, city, time} : reminder,
         );
         setObjectInStorage(eventsKey, updatedReminders);
         return updatedReminders;
      });
   };

   const handleClickOutside = useCallback(() => {
      setTime('');
      setCity('');
      setTitle('');
      setOpenState(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

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
                  <input type="text" name="title" id="title" maxLength="30" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  <label htmlFor="city" className="">
                     City
                  </label>
                  <input type="text" name="city" id="city" maxLength="30" value={city} onChange={(e) => setCity(e.target.value)} required />
                  <label htmlFor="time" className="">
                     Time
                  </label>
                  <input type="time" name="time" id="time" maxLength="30" value={time} onChange={(e) => setTime(e.target.value)} required />
                  <button onClick={forEdit ? handleEditReminder : handleAddEvent} className="">
                     submit
                  </button>
               </form>
            </div>
         </FullscreenModal>
      </>
   );
};

export default AddReminder;
