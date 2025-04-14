"use client";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "./../../components/nav/navbar";
import Header from "./../../components/header/header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import NewAppointment from "./../../components/modals/add-appointment"
import {
  EventInput,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { useDisclosure } from "@nextui-org/react";

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
  };
}

const Calendar = () => {

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const calendarsEvents = {
    Danger: "danger",
    Success: "success",
    Primary: "primary",
    Warning: "warning",
  };

  useEffect(() => {
    // Initialize with some events
    setEvents([
      {
        id: "1",
        title: "Event Conf.",
        start: new Date().toISOString().split("T")[0],
        extendedProps: { calendar: "Danger" },
      },
      {
        id: "2",
        title: "Meeting",
        start: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        extendedProps: { calendar: "Success" },
      },
      {
        id: "3",
        title: "Workshop",
        start: new Date(Date.now() + 172800000).toISOString().split("T")[0],
        end: new Date(Date.now() + 259200000).toISOString().split("T")[0],
        extendedProps: { calendar: "Primary" },
      },
    ]);
  }, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    
    setEventStartDate(selectInfo.startStr);
    setEventEndDate(selectInfo.endStr || selectInfo.startStr);
    onOpen();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    setEventTitle(event.title);
    setEventStartDate(event.start?.toISOString().split("T")[0] || "");
    setEventEndDate(event.end?.toISOString().split("T")[0] || "");
    setEventLevel(event.extendedProps.calendar);
    onOpen();
  };

  // const handleAddOrUpdateEvent = () => {
  //   if (selectedEvent) {
  //     // Update existing event
  //     setEvents((prevEvents) =>
  //       prevEvents.map((event) =>
  //         event.id === selectedEvent.id
  //           ? {
  //               ...event,
  //               title: eventTitle,
  //               start: eventStartDate,
  //               end: eventEndDate,
  //               extendedProps: { calendar: eventLevel },
  //             }
  //           : event
  //       )
  //     );
  //   } else {
  //     // Add new event
  //     const newEvent: CalendarEvent = {
  //       id: Date.now().toString(),
  //       title: eventTitle,
  //       start: eventStartDate,
  //       end: eventEndDate,
  //       allDay: true,
  //       extendedProps: { calendar: eventLevel },
  //     };
  //     setEvents((prevEvents) => [...prevEvents, newEvent]);
  //   }
  //   closeModal();
  //   resetModalFields();
  // };

  return (
    <>
      <Navbar>
        <Header />
        <div className="rounded-2xl border mt-5 border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="custom-calendar">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin,interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "",
              }}
              events={events}
              selectable={true}
              select={handleDateSelect}
              eventClick={handleEventClick}
              eventContent={renderEventContent}
              customButtons={{
                addEventButton: {
                  text: "A Schedule Appointment",
                  click: onOpen,
                },
              }}
            />
          </div>
        </div>
      </Navbar>
      <NewAppointment 
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      // selectedEvent={selectedEvent}
      // eventTitle={eventTitle}
      // eventStartDate={eventStartDate}
      // eventEndDate={eventEndDate}
      // eventLevel={eventLevel}
      // setEventTitle={setEventTitle}
       />
    </>
  );
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


export default Calendar;
