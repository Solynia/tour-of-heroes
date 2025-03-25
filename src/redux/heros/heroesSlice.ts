import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import Hero from "../../model/Hero";
import { displayNotification } from "../notifications/notificationsSlice";
import { AppState } from "../store";

type HeroEntity = Required<Hero>;

const adapter = createEntityAdapter<HeroEntity, HeroEntity["id"]>({
  selectId: ({ id }) => id,
  sortComparer: (a, b) => a.id - b.id,
});

const slice = createSlice({
  name: "heroes",
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateHero.fulfilled, (state, { payload: { id, name } }) => {
        adapter.updateOne(state, { id, changes: { name } });
      })
      .addCase(fetchHeroes.fulfilled, (state, { payload }) => {
        adapter.setAll(state, payload!);
      });
  },
});

export const updateHero = createAsyncThunk(
  `${slice.name}/updateHero`,
  (hero: HeroEntity, { dispatch }) => {
    dispatch(displayNotification({ message: `Saving ${hero.name}` }));
    return hero;
  }
);

export const fetchHeroes = createAsyncThunk(
  `${slice.name}/fetchHeroes`,
  async (_, { dispatch }) => {
    dispatch(displayNotification({ message: "Fetching heroes" }));
    try {
      const response = await fetch("http://localhost:3001/heroes");
      const heroes = (await response.json()) as { id: string; name: string }[];
      dispatch(displayNotification({ message: "Heroes loaded" }));
      return heroes.map<HeroEntity>((h) => ({ id: +h.id, name: h.name }));
    } catch (error) {
      dispatch(displayNotification({ message: "Error loading heroes" }));
    }
  },
  {
    condition: (_, { getState }) => {
      return !(getState() as AppState).heroes.ids.length;
    },
  }
);

export const {} = slice.actions;

const selectors = adapter.getSelectors<AppState>((state) => state.heroes);

export const getHeroes = (state: AppState) => selectors.selectAll(state);
export const getHeroById = (state: AppState, id: number) =>
  selectors.selectById(state, id);

export default slice.reducer;
