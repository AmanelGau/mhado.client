type CharacterType = {
  id: number;
  firstname: string;
  lastname: string;
  archetype: string;
  experience: number;
  level: number;
  maxExperience: number;
  statPoint: number;
  stats: StatsType;
};

type StatsType = {
  agility: number;
  exploration: number;
  luck: number;
  resistance: number;
  spirit: number;
  strength: number;
};

type StatType =
  | "strength"
  | "agility"
  | "resistance"
  | "exploration"
  | "luck"
  | "spirit";

type CharacterCreationFormType = {
  firstname: string;
  lastname: string;
  archetype: string;
};

export type { CharacterType, StatsType, StatType, CharacterCreationFormType };
