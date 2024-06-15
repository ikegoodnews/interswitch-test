import React, {useState} from 'react';
import classNames from 'classnames';
import {format} from 'date-fns';
import './index.scss';

const Calendar = (props) => {
   const [currentDate, setCurrentDate] = useState(new Date());

   const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
   const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
   const startDay = startOfMonth.getDay();
   const daysInMonth = endOfMonth.getDate();

   const days = Array.from({length: 42}, (_, index) => {
      const day = index - startDay + 1;
      return day > 0 && day <= daysInMonth ? day : null;
   });

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
      props.onDaySelect(date, events ? events : {});
   };

   return (
      <div className="calendar">
         <div className="header">
            <button onClick={handlePrevMonth}>Prev</button>
            <h2>{currentDate.toLocaleDateString('default', {month: 'long', year: 'numeric'})}</h2>
            <button onClick={handleNextMonth}>Next</button>
         </div>
         <div className="days">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
               <div key={day} className="day-name">
                  {day}
               </div>
            ))}
            {days.map((day, index) => (
               <div
                  key={index}
                  className="day"
                  onClick={() => handleOnDaySelect(day, props.events[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`])}>
                  {/* <div key={index} className="day" onClick={() => day && props.handleAddEvent(day)}> */}
                  {day}
                  {day && props.events[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`] && (
                     <div className="events">
                        {props.events[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`]?.slice(0, 2)?.map((event, i) => (
                           <div
                              key={i}
                              className={classNames('event', {active: props.selectedEvent && props.selectedEvent === event})}
                              onClick={() => props.onEventSelect(event)}>
                              {event}
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>
   );
};

export default Calendar;
