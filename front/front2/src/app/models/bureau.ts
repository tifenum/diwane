import { ETache } from "./etache";

export interface Bureau {
  id: number;
  name: string;
  taches: Set<ETache>;
  users: Set<any>; // Vous pouvez définir un modèle utilisateur approprié ici
}