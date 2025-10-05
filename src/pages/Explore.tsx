import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EventCard } from "@/components/EventCard";
import { SportType } from "@/data/mockEvents";
import { useEvents } from "@/context/EventsContext";
import heroImage from "@/assets/hero-sports.jpg";

const Explore = () => {
  const navigate = useNavigate();
  const { events } = useEvents();
  const [selectedSport, setSelectedSport] = useState<SportType | "All">("All");

  const filteredEvents = selectedSport === "All" 
    ? events 
    : events.filter(event => event.sport === selectedSport);

  const sports: Array<SportType | "All"> = ["All", "Football", "Tennis", "Basketball", "Volleyball", "Badminton", "Cricket", "Rugby", "Baseball", "Swimming", "Cycling"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Sports Hero" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Find Your Next Game{" "}
              <span className="inline-block animate-float">🎾⚽🏀</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Join sports events, meet players, and level up your game
            </p>
          </motion.div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </motion.section>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 justify-center flex-wrap mb-12"
        >
          {sports.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedSport === sport
                  ? "glow-border text-foreground shadow-[var(--shadow-glow)]"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {sport}
            </button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-3xl p-12 text-center max-w-3xl mx-auto"
        >
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-accent animate-glow-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Host Your Own Event!
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Got a game to organize? Create your event and bring the community together!
          </p>
          <button 
            onClick={() => navigate("/create")}
            className="px-8 py-4 rounded-xl glow-border hover-glow font-semibold text-lg"
          >
            Create Event
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Explore;
