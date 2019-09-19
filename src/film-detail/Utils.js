import React from "react";
import Fetcher from "./Fetcher";

export const Charecter = props => (
  <Fetcher {...props} attributes={["gender", "eye_color", "skin_color"]} />
);
export const Planet = props => (
  <Fetcher
    {...props}
    attributes={["rotation_period", "orbital_period", "climate"]}
  />
);
export const Starship = props => (
  <Fetcher
    {...props}
    attributes={["model", "manufacturer", "cost_in_credits"]}
  />
);
export const Species = props => (
  <Fetcher
    {...props}
    attributes={["classification", "designation", "language"]}
  />
);
