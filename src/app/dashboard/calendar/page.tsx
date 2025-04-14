"use client";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "./../../components/nav/navbar";
import Header from "./../../components/header/header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Select from "./../../components/ui/Select";
import appointment from "./../../api/appointment.json"
import { ChevronDown } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";

import {
  EventInput,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { set } from "react-hook-form";

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
  };
}


const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [time, setTime] = useState("");
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

  const resetModal = () => {
    setName("");
    setEventStartDate("");
    setEventEndDate("");
    setSelectedEvent(null);
    setDoctor("");
    setSpeciality("");
    setTime("");
  };

  const options = [
    { value: "cardiologist", label: "Cardiologist" },
    { value: "neurologist", label: "Neurologist" },
    { value: "surgeon", label: "Surgeon" },
    { value: "orthopedic", label: "Orthopedic" },
    { value: "gynecologist", label: "Gynecologist" },
  ];

  useEffect(() => {
    const get24HourTime = (date: Date): string => {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    const events = appointment?.map((item) => ({
      id: item?.id,
      title: item?.title,
      start: item.start,
      end: item.end,
      time: get24HourTime(new Date(item.start)),
      doctor: item?.doctor,
      speciality: item?.speciality,
      extendedProps: { calendar: "Success"},
    }));

    setEvents(events);
  }, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setEventStartDate(selectInfo.startStr);
    setEventEndDate(selectInfo.endStr || selectInfo.startStr);
    onOpen();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    console.log("event", event);
    setName(event?.title);
    setDoctor(event?.extendedProps.doctor);
    setTime(event?.extendedProps?.time);
    setSpeciality(event?.extendedProps?.speciality );
    setEventStartDate(event._instance?.range?.start?.toISOString().split("T")[0] || "");
    setEventEndDate(event._instance?.range?.end?.toISOString().split("T")[0] || "");

    onOpen();
  };
console.log('speciality',speciality);
console.log('eventEndDate',eventEndDate);


  const handleAddOrUpdateEvent = () => {
    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                allDay: true,
                title: name,
                start: eventStartDate,
                end: eventEndDate,
                doctor: doctor,
                speciality: speciality,
                time: time,
                extendedProps: { calendar: "Success" },
              }
            : event
        )
      );
    } else {
      // Add new event
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: name,
        start: eventStartDate,
        end: eventEndDate,
        doctor: doctor,
        speciality: speciality,
        time: time,
        allDay: true,
        extendedProps: { calendar: "Success"},
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    onClose();
    resetModal();
  };
console.log('events',events);

  const handleSelectChange = (value: string) => {
   
    setSpeciality(value);
  };



  return (
    <>
      <Navbar>
        <Header />
        <div className="rounded-2xl border mt-5 border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="custom-calendar">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
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
                  text: "Schedule Appointment",
                  click: onOpen,
                },
              }}
              validRange={{
                start: new Date().toISOString().split("T")[0],
              }}
            />
          </div>
        </div>
      </Navbar>

      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        className="max-w-[700px]  p-6 lg:p-10"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
              {selectedEvent ? "Edit Appointment" : "Schedule Appointment"}
                </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                     Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Doctor Name
                    </label>
                    <input
                      id="doctor"
                      type="text"
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Speciality

                    </label>
                    <div className="relative mt-5">
                    <Select
  options={options}
  placeholder="Select Option"
  className="react-select-container"
  value={speciality}
  onChange={handleSelectChange}
/>
                    </div>
                  </div>
                  <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Enter Start Date
              </label>
              <div className="relative">
                <input
                  id="event-start-date"
                  type="date"
                  value={eventStartDate?.toString().split("T")[0] }
                  onChange={(e) => setEventStartDate(e.target.value)}
                   min={new Date().toISOString().split("T")[0]}
                  className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>

            <div >
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Enter End Date
              </label>
              <div className="relative">
                <input
                  id="event-end-date"
                  type="date"
                  value={eventEndDate?.toString().split("T")[0]}
                  onChange={(e) => setEventEndDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
            <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Time
              </label>
              <input
                   
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      min="00:00"
                      max="24:00"
                      className="bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
            </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleAddOrUpdateEvent}>
                {selectedEvent ? "Update Changes" : "Book Appointment"}
                      
                                    </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => {
  console.log('eventInfo',eventInfo);
  
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
