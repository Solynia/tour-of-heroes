import React from "react";
import Hero from "../model/Hero";

interface HeroFormProps {
  hero?: Hero;
  onNameChange: (name: string) => void;
}

function HeroForm(props: HeroFormProps) {
  return props.hero ? (
    <div>
      <h2>{props.hero.name.toUpperCase()} Details</h2>
      <div>
        <span>id: </span>
        {props.hero.id}
      </div>
      <div>
        <label>name: </label>
        <input
          type="text"
          placeholder="name"
          value={props.hero.name}
          onChange={e => props.onNameChange(e.target.value)}
        />
      </div>
    </div>
  ) : null;
}

export default HeroForm;
