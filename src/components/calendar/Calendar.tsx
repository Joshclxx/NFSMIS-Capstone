"use client";
import React, { useState, useRef } from "react";
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
import { useModal } from "@/src/hooks/useModal";
import { Modal } from "../ui/modal";
import SectionContainer from "../SectionContainer";

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
  };
}

const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const calendarsEvents: Record<string, string> = {
    Suspension: "var(--primary)",
    Class: "var(--secondary)",
    Event: "var(--tertiary)",
    Office: "var(--highlight-1)",
    Maintenance: "var(--highlight-2)",
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setEventStartDate(selectInfo.startStr);
    setEventEndDate(selectInfo.endStr || selectInfo.startStr);
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;

    setSelectedEvent(event as unknown as CalendarEvent);
    setEventTitle(event.title);
    setEventStartDate(event.start?.toISOString().split("T")[0] || "");
    setEventEndDate(event.end?.toISOString().split("T")[0] || "");
    setEventLevel(event.extendedProps.calendar);

    openModal();
  };

  const handleAddOrUpdateEvent = () => {
    const adjustedEndDate = eventEndDate
      ? new Date(
          new Date(eventEndDate).setDate(new Date(eventEndDate).getDate() + 1)
        )
          .toISOString()
          .split("T")[0]
      : eventStartDate;

    // UPDATE EXISTING EVENT
    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: eventTitle,
                start: eventStartDate,
                end: adjustedEndDate,
                extendedProps: { calendar: eventLevel },
              }
            : event
        )
      );
    } else {
      // CREATE NEW EVENT
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: eventStartDate,
        end: adjustedEndDate,
        allDay: true,
        extendedProps: { calendar: eventLevel },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }

    closeModal();
    resetModalFields();
  };

  // DELETE EVENT
  const handleDeleteEvent = () => {
    if (!selectedEvent) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to remove this event?"
    );

    if (!confirmDelete) return;

    setEvents((prev) => prev.filter((evt) => evt.id !== selectedEvent.id));

    closeModal();
    resetModalFields();
  };

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventLevel("");
    setSelectedEvent(null);
  };

  return (
    <SectionContainer background="mt-12">
      <div className="rounded-lg p-2 border border-primary bg-white">
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
          selectable
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={(info) => renderEventContent(info, calendarsEvents)}
          customButtons={{
            addEventButton: {
              text: "Add Event +",
              click: openModal,
            },
          }}
        />

        {/* MODAL */}
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] p-6 lg:p-10"
        >
          <div className="flex flex-col px-2">
            <h5 className="mb-2 font-semibold text-[var(--foreground)] text-xl">
              {selectedEvent ? "Edit Event" : "Add Event"}
            </h5>
            <p className="text-sm text-[var(--foreground)]/70">
              Plan your next big moment.
            </p>

            {/* TITLE */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                Event Title
              </label>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="w-full h-11 rounded-lg border-1
                  bg-[var(--background)] text-[var(--foreground)]
                  px-4 text-sm"
              />
            </div>

            {/* ACTIVITY */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-[var(--foreground)] mb-4">
                Activity Type
              </label>
              <div className="flex gap-4 flex-wrap">
                {Object.entries(calendarsEvents).map(([key, cssVar]) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 text-sm text-[var(--foreground)]"
                  >
                    <input
                      type="radio"
                      name="event-level"
                      className="hidden"
                      checked={eventLevel === key}
                      onChange={() => setEventLevel(key)}
                    />
                    <span
                      className="w-5 h-5 rounded-full border-1 flex items-center justify-center"
                      style={{ backgroundColor: cssVar }}
                    >
                      {eventLevel === key && (
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                      )}
                    </span>
                    {key}
                  </label>
                ))}
              </div>
            </div>

            {/* START DATE */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                value={eventStartDate}
                onChange={(e) => setEventStartDate(e.target.value)}
                className="w-full h-11 rounded-lg border-1 
                  bg-[var(--background)] text-[var(--foreground)]
                  px-4 text-sm"
              />
            </div>

            {/* END DATE */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                End Date
              </label>
              <input
                type="date"
                value={eventEndDate}
                onChange={(e) => setEventEndDate(e.target.value)}
                className="w-full h-11 rounded-lg border-1 
                  bg-[var(--background)] text-[var(--foreground)]
                  px-4 text-sm"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end mt-6 gap-3">
              {/* DELETE BUTTON (only when editing) */}
              {selectedEvent && (
                <button
                  onClick={handleDeleteEvent}
                  className="px-5 py-2 rounded-lg bg-highlight-1 text-white"
                >
                  Remove
                </button>
              )}

              <button
                onClick={closeModal}
                className="px-5 py-2 rounded-lg bg-[var(--primary)] text-[var(--textWhite)]"
              >
                Close
              </button>

              <button
                onClick={handleAddOrUpdateEvent}
                className="px-5 py-2 rounded-lg bg-[var(--button)] text-[var(--textWhite)]"
              >
                {selectedEvent ? "Update Changes" : "Create"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </SectionContainer>
  );
};

const renderEventContent = (
  info: EventContentArg,
  calendarsEvents: Record<string, string>
) => {
  const bg =
    calendarsEvents[info.event.extendedProps.calendar] || "var(--primary)";

  return (
    <div
      className="p-1 rounded-sm flex items-center gap-1"
      style={{ backgroundColor: bg, color: "var(--textWhite)" }}
    >
      <span>{info.event.title}</span>
    </div>
  );
};

export default Calendar;
