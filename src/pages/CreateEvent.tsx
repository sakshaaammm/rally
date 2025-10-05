import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEvents } from "@/context/EventsContext";
import { SportType } from "@/data/mockEvents";
import { toast } from "sonner";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { addEvent } = useEvents();
  
  const [formData, setFormData] = useState({
    name: "",
    sport: "" as SportType,
    date: "",
    venue: "",
    description: "",
    maxPlayers: "",
    timeSlots: "",
  });

  const sportOptions: SportType[] = [
    "Football",
    "Tennis",
    "Basketball",
    "Volleyball",
    "Badminton",
    "Cricket",
    "Rugby",
    "Baseball",
    "Swimming",
    "Cycling",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.sport || !formData.date || !formData.venue || !formData.maxPlayers) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      name: formData.name,
      sport: formData.sport,
      date: formData.date,
      venue: formData.venue,
      description: formData.description,
      image: "/src/assets/hero-sports.jpg",
      players: [],
      availableSlots: formData.timeSlots.split(",").map(slot => slot.trim()).filter(Boolean),
      maxPlayers: parseInt(formData.maxPlayers),
    };

    addEvent(newEvent);
    toast.success("🎉 Event created successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-accent animate-glow-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gradient">
              Create Your Event
            </h1>
            <p className="text-muted-foreground text-lg">
              Bring the community together for an epic game!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">Event Name *</Label>
              <Input
                id="name"
                placeholder="Friday Night Football"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background/50 border-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sport" className="text-base">Sport Type *</Label>
              <Select
                value={formData.sport}
                onValueChange={(value) => setFormData({ ...formData, sport: value as SportType })}
                required
              >
                <SelectTrigger className="bg-background/50 border-primary/20">
                  <SelectValue placeholder="Select a sport" />
                </SelectTrigger>
                <SelectContent>
                  {sportOptions.map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="bg-background/50 border-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxPlayers" className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Max Players *
                </Label>
                <Input
                  id="maxPlayers"
                  type="number"
                  min="2"
                  placeholder="10"
                  value={formData.maxPlayers}
                  onChange={(e) => setFormData({ ...formData, maxPlayers: e.target.value })}
                  required
                  className="bg-background/50 border-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue" className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Venue *
              </Label>
              <Input
                id="venue"
                placeholder="City Stadium"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                required
                className="bg-background/50 border-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeSlots" className="text-base">
                Available Time Slots (comma separated)
              </Label>
              <Input
                id="timeSlots"
                placeholder="18:00, 19:00, 20:00"
                value={formData.timeSlots}
                onChange={(e) => setFormData({ ...formData, timeSlots: e.target.value })}
                className="bg-background/50 border-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell players what to expect..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="bg-background/50 border-primary/20 focus:border-primary resize-none"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 glow-border hover-glow"
              >
                Create Event
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateEvent;
