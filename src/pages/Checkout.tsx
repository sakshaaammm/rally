import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, PartyPopper, ArrowLeft } from "lucide-react";
import { Event } from "@/data/mockEvents";
import confetti from "canvas-confetti";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, selectedSlot } = location.state as { event: Event; selectedSlot: string };
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    
    // Confetti animation
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#7B2FF7', '#00C9FF', '#FFFFFF'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#7B2FF7', '#00C9FF', '#FFFFFF'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  if (confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-12 text-center max-w-2xl"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
          >
            <PartyPopper className="w-24 h-24 mx-auto mb-6 text-accent" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            You're In!
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            🎉 See you at the game!
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            We've saved your spot for <span className="text-foreground font-semibold">{event.name}</span>
          </p>
          <div className="space-y-3 mb-8 glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-center gap-3">
              <Calendar className="w-5 h-5 text-accent" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-5 h-5 text-accent" />
              <span>{selectedSlot}</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MapPin className="w-5 h-5 text-accent" />
              <span>{event.venue}</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="px-8 py-4 rounded-xl glow-border hover-glow font-semibold text-lg"
          >
            Back to Events
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(`/event/${event.id}`)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Event
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gradient text-center">
            Confirm Your Booking
          </h1>

          <div className="space-y-6 mb-8">
            {/* Event Summary */}
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold">{event.name}</h2>
              <span className="inline-block px-4 py-2 rounded-full glow-border text-primary text-sm font-semibold">
                {event.sport}
              </span>
              
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="text-muted-foreground">
                    {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="text-muted-foreground">{selectedSlot}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-muted-foreground">{event.venue}</span>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Booking Details</h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Event Entry</span>
                  <span className="text-foreground font-semibold">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Players Joined</span>
                  <span className="text-foreground font-semibold">{event.players.length}/{event.maxPlayers}</span>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirm}
            className="w-full py-4 rounded-xl glow-border hover-glow font-bold text-lg"
          >
            Confirm Booking
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
