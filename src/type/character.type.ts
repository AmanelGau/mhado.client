type CharacterType = {
  id: Number;
  firstname: String;
  lastname: String;
  archetype: String;
  experience: Number;
  level: Number;
  maxExperience: Number;
  statPoint: Number;
  stats: StatsType;
};

type StatsType = {
  agility: Number;
  exploration: Number;
  luck: Number;
  resistance: Number;
  spirit: Number;
  strength: Number;
};

type CharacterCreationFormType = {
  firstname: string;
  lastname: string;
  archetype: string;
};

export type { CharacterType, StatsType, CharacterCreationFormType };
