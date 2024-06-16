import React, {useContext, useState} from 'react';
import {AppContext} from '../AppContext';
import classNames from 'classnames';
import {format} from 'date-fns';
import './index.scss';

const Calendar = () => {
   const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   const {events, selectedEvent, selectedDay, setSelectedEvent, onEventSelect, onDaySelect} = useContext(AppContext);
   const [currentDate, setCurrentDate] = useState(new Date());

   let weekends = [];
   const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
   const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
   const startDay = startOfMonth.getDay();
   const daysInMonth = endOfMonth.getDate();

   const days = Array.from({length: 42}, (_, index) => {
      const day = index - startDay + 1;
      return day > 0 && day <= daysInMonth ? day : null;
   });

   for (let i = 1; i <= daysInMonth; i++) {
      //looping through days in month
      let newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      if (newDate.getDay() === 0 || newDate.getDay() === 6) {
         //if Sunday or Saturday
         weekends.push(i);
      }
   }

   const handlePrevMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
   };

   const handleNextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
   };

   const yearIndex = format(new Date(currentDate), 'yyyy');
   const monthIndex = format(new Date(currentDate), 'M');

   const handleOnDaySelect = (day, events) => {
      const date = new Date(yearIndex, monthIndex - 1);
      date.setDate(day);
      setSelectedEvent(null);
      onDaySelect(date, events ? events : null);
   };

   return (
      <div className="calendar">
         <div className="header">
            <button onClick={handlePrevMonth}>Prev</button>
            <h2>{currentDate.toLocaleDateString('default', {month: 'long', year: 'numeric'})}</h2>
            <button onClick={handleNextMonth}>Next</button>
         </div>
         <div className="days">
            {daysOfTheWeek?.map((day) => (
               <div key={day} className="day-name">
                  {day}
               </div>
            ))}
            {days.map((day, index) => {
               const dayEvents = events[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`];
               return (
                  <div
                     key={index}
                     className={classNames('day', {
                        selected: Number(format(new Date(selectedDay), 'd')) === day,
                        weekends: weekends?.find((weekend) => weekend === day),
                        today: Number(format(new Date(), 'd')) === day,
                     })}
                     onClick={() => handleOnDaySelect(day, dayEvents)}>
                     {day}
                     {day && dayEvents && (
                        <div className="events">
                           {dayEvents?.slice(0, 2)?.map((event, i) => (
                              <div
                                 key={i}
                                 className={classNames('event', {active: selectedEvent && selectedEvent?.title === event?.title})}
                                 onClick={(e) => onEventSelect(e, event)}>
                                 {event?.title}
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default Calendar;
