import { ArchetypeType } from "../type/archetype.type";

export const Archetypes: {
  warrior: ArchetypeType;
  bladeMaster: ArchetypeType;
  assassin: ArchetypeType;
  bigGameHunter: ArchetypeType;
  magicHunter: ArchetypeType;
  protector: ArchetypeType;
  dancer: ArchetypeType;
  gladiator: ArchetypeType;
  barbarian: ArchetypeType;
  ninja: ArchetypeType;
  scout: ArchetypeType;
  bard: ArchetypeType;
  trapper: ArchetypeType;
  doctor: ArchetypeType;
  oracle: ArchetypeType;
} = {
  warrior: { label: "warrior", stats: ["strength", "resistance"] },
  bladeMaster: { label: "bladeMaster", stats: ["strength", "agility"] },
  assassin: { label: "assassin", stats: ["strength", "luck"] },
  bigGameHunter: { label: "bigGameHunter", stats: ["strength", "exploration"] },
  magicHunter: { label: "magicHunter", stats: ["strength", "spirit"] },
  protector: { label: "protector", stats: ["resistance", "agility"] },
  dancer: { label: "dancer", stats: ["resistance", "luck"] },
  gladiator: { label: "gladiator", stats: ["resistance", "exploration"] },
  barbarian: { label: "barbarian", stats: ["resistance", "spirit"] },
  ninja: { label: "ninja", stats: ["agility", "luck"] },
  scout: { label: "scout", stats: ["agility", "exploration"] },
  bard: { label: "bard", stats: ["agility", "spirit"] },
  trapper: { label: "trapper", stats: ["luck", "exploration"] },
  doctor: { label: "doctor", stats: ["luck", "spirit"] },
  oracle: { label: "oracle", stats: ["exploration", "spirit"] },
};
