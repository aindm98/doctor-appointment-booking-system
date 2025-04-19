"use client";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
    EventInput,
    DateSelectArg,
    EventClickArg,
    EventContentArg,
  } from "@fullcalendar/core";

  interface CalendarEvent extends EventInput {
    extendedProps: {
      calendar: string;
    };
  }

  const Calendar  = () => {

    const calendarRef = useRef<FullCalendar>(null);
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    const calendarsEvents = {
        Danger: "danger",
        Success: "success",
        Primary: "primary",
        Warning: "warning",
      };

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        console.log("Selected date:", selectInfo.startStr);
        
    // resetModalFields();
    // setEventStartDate(selectInfo.startStr);
    // setEventEndDate(selectInfo.endStr || selectInfo.startStr);
    // openModal();
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        const event = clickInfo.event;
        // setSelectedEvent(event as unknown as CalendarEvent);
        // setEventTitle(event.title);
        // setEventStartDate(event.start?.toISOString().split("T")[0] || "");
        // setEventEndDate(event.end?.toISOString().split("T")[0] || "");
        // setEventLevel(event.extendedProps.calendar);
        // openModal();
      };

      const renderEventContent = (eventInfo: EventContentArg) => {
        const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
        return (
          <div
            className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
          >
            <div className="fc-daygrid-event-dot"></div>
            <div className="fc-event-time">{eventInfo.timeText}</div>
            <div className="fc-event-title">{eventInfo.event.title}</div>
          </div>
        );
      };


    return(
        <>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next addEventButton",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          customButtons={{
            addEventButton: {
              text: "Add Event +",
            //   click: openModal,
            },
          }}
        />
      
        </>
    );
  };
  export default Calendar;