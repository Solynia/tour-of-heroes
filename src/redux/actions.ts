import Hero from "../model/Hero";
import { HeroAction } from "./reducers/heroes";
import { HeroActions } from "./actionTypes";

export function selectHero(hero: Hero): HeroAction {
    return {
        type: HeroActions.select,
        payload: { hero }
    }
}

export function updateHero(hero: Hero): HeroAction {
    return {
        type: HeroActions.update,
        payload: { hero }
    }
}