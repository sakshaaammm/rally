import { createContext, useContext, useState, ReactNode } from "react";
import { Event, mockEvents } from "@/data/mockEvents";

interface EventsContextType {
  events: Event[];
  addEvent: (event: Event) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const addEvent = (event: Event) => {
    setEvents((prev) => [...prev, event]);
  };

  return (
    <EventsContext.Provider value={{ events, addEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within EventsProvider");
  }
  return context;
};
