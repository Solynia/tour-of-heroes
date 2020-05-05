import { AppState } from "../reducers";

export function getHeroes(store: AppState) {
  return store.hero?.heroes ?? [];
}

export function getHeroById(store: AppState, id: number) {
  return getHeroes(store).find(hero => hero.id === id);
}
