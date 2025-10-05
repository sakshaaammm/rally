import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import { Event } from "@/data/mockEvents";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
  event: Event;
  index: number;
}

const sportEmoji = {
  Football: "⚽",
  Tennis: "🎾",
  Basketball: "🏀",
};

export const EventCard = ({ event, index }: EventCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="glass-card rounded-2xl overflow-hidden hover-glow group cursor-pointer"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute top-4 right-4 text-4xl animate-float">
          {sportEmoji[event.sport]}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold mb-2 text-gradient">{event.name}</h3>
          <span className="inline-block px-3 py-1 text-sm rounded-full glow-border text-primary">
            {event.sport}
          </span>
        </div>

        <div className="space-y-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-sm">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-sm">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-sm">{event.players.length}/{event.maxPlayers} players</span>
          </div>
        </div>

        <button className="w-full py-3 rounded-xl glow-border hover-glow font-semibold text-foreground transition-all">
          Join Event
        </button>
      </div>
    </motion.div>
  );
};
