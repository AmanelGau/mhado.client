type CharacterType = {
  id: number;
  firstname: String;
  lastname: String;
  archetype: String;
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

type CharacterCreationFormType = {
  firstname: string;
  lastname: string;
  archetype: string;
};

export type { CharacterType, StatsType, CharacterCreationFormType };
