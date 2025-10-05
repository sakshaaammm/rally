export type SportType = 
  | "Football" 
  | "Tennis" 
  | "Basketball" 
  | "Volleyball" 
  | "Badminton" 
  | "Cricket" 
  | "Rugby" 
  | "Baseball" 
  | "Swimming" 
  | "Cycling";

export interface Event {
  id: string;
  name: string;
  sport: SportType;
  date: string;
  venue: string;
  description: string;
  image: string;
  players: Player[];
  availableSlots: string[];
  maxPlayers: number;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
}

export const mockEvents: Event[] = [
  {
    id: "1",
    name: "Friday Night Football",
    sport: "Football",
    date: "2025-10-10",
    venue: "City Stadium",
    description: "Join us for an exciting 5v5 football match under the lights! All skill levels welcome.",
    image: "/src/assets/football.jpg",
    players: [
      { id: "p1", name: "Alex Johnson", avatar: "AJ" },
      { id: "p2", name: "Maria Garcia", avatar: "MG" },
      { id: "p3", name: "John Smith", avatar: "JS" },
      { id: "p4", name: "Sarah Lee", avatar: "SL" },
    ],
    availableSlots: ["18:00", "19:00", "20:00"],
    maxPlayers: 10,
  },
  {
    id: "2",
    name: "Weekend Tennis Doubles",
    sport: "Tennis",
    date: "2025-10-12",
    venue: "Riverside Tennis Club",
    description: "Competitive doubles match for intermediate players. Bring your A-game!",
    image: "/src/assets/tennis.jpg",
    players: [
      { id: "p5", name: "Emma Wilson", avatar: "EW" },
      { id: "p6", name: "David Chen", avatar: "DC" },
    ],
    availableSlots: ["09:00", "10:30", "14:00"],
    maxPlayers: 4,
  },
  {
    id: "3",
    name: "3v3 Basketball Showdown",
    sport: "Basketball",
    date: "2025-10-11",
    venue: "Downtown Sports Arena",
    description: "Fast-paced 3v3 basketball tournament. Winners get bragging rights!",
    image: "/src/assets/basketball.jpg",
    players: [
      { id: "p7", name: "Michael Brown", avatar: "MB" },
      { id: "p8", name: "Lisa Anderson", avatar: "LA" },
      { id: "p9", name: "Chris Taylor", avatar: "CT" },
    ],
    availableSlots: ["16:00", "17:30", "19:00"],
    maxPlayers: 6,
  },
  {
    id: "4",
    name: "Sunday Football League",
    sport: "Football",
    date: "2025-10-13",
    venue: "Park Field",
    description: "Casual Sunday football for everyone. Come play and make new friends!",
    image: "/src/assets/football.jpg",
    players: [
      { id: "p10", name: "Tom Harris", avatar: "TH" },
      { id: "p11", name: "Nina Patel", avatar: "NP" },
    ],
    availableSlots: ["10:00", "11:30", "15:00"],
    maxPlayers: 12,
  },
  {
    id: "5",
    name: "Tennis Mixer Social",
    sport: "Tennis",
    date: "2025-10-14",
    venue: "Sunset Tennis Courts",
    description: "Social tennis event for all levels. Play, meet people, and have fun!",
    image: "/src/assets/tennis.jpg",
    players: [
      { id: "p12", name: "Rachel Green", avatar: "RG" },
      { id: "p13", name: "Mark Davis", avatar: "MD" },
      { id: "p14", name: "Sophie Turner", avatar: "ST" },
    ],
    availableSlots: ["17:00", "18:00", "19:00"],
    maxPlayers: 8,
  },
  {
    id: "6",
    name: "Midnight Basketball",
    sport: "Basketball",
    date: "2025-10-15",
    venue: "Indoor Arena",
    description: "Late night hoops session. Bring your energy and join the game!",
    image: "/src/assets/basketball.jpg",
    players: [
      { id: "p15", name: "Kevin James", avatar: "KJ" },
    ],
    availableSlots: ["21:00", "22:00", "23:00"],
    maxPlayers: 10,
  },
];
