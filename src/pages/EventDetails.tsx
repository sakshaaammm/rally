import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ArrowLeft } from "lucide-react";
import { useEvents } from "@/context/EventsContext";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useEvents();
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const event = events.find(e => e.id === id);

  if (!event) {
    return <div className="min-h-screen flex items-center justify-center">Event not found</div>;
  }

  const handleCheckout = () => {
    if (selectedSlot) {
      navigate("/checkout", { state: { event, selectedSlot } });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl overflow-hidden"
        >
          {/* Hero Image */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gradient">{event.name}</h1>
              <span className="inline-block px-4 py-2 rounded-full glow-border text-primary font-semibold">
                {event.sport}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Event Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Venue</p>
                    <p className="font-semibold">{event.venue}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Players</p>
                  <p className="font-semibold">{event.players.length}/{event.maxPlayers} joined</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-3">About This Event</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{event.description}</p>
            </div>

            {/* Players List */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Players Joining</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {event.players.map((player) => (
                  <motion.div
                    key={player.id}
                    whileHover={{ scale: 1.05 }}
                    className="glass-card rounded-xl p-4 flex flex-col items-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-full glow-border flex items-center justify-center text-xl font-bold">
                      {player.avatar}
                    </div>
                    <p className="text-sm font-medium text-center">{player.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-accent" />
                Select Your Time Slot
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {event.availableSlots.map((slot) => (
                  <motion.button
                    key={slot}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-4 rounded-xl font-semibold transition-all ${
                      selectedSlot === slot
                        ? "glow-border text-foreground shadow-[var(--shadow-glow)]"
                        : "glass-card hover:border-accent/50"
                    }`}
                  >
                    {slot}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Checkout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              disabled={!selectedSlot}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                selectedSlot
                  ? "glow-border hover-glow text-foreground"
                  : "glass-card text-muted-foreground cursor-not-allowed opacity-50"
              }`}
            >
              {selectedSlot ? "Proceed to Checkout" : "Select a Time Slot"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetails;
