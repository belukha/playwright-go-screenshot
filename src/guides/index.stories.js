import template from "./index.html.mustache?raw";
import mustache from "mustache";
// import icon from "./assets/location-icon.svg";
import "./index.css";

// console.log({ icon });

export default {
  title: "guides",
};

export const GUIDES = {
  title: "GUIDES",
  render: ({ prefix, name, image_url, count, layer, location }) => {
    // return `<div><img src="./assets/location-icon.svg" /></div>`;
    return mustache.render(template, {
      prefix,
      name,
      image: image_url,
      count,
      layer,
      location,
    });
  },

  argTypes: {
    prefix: { control: "text" },
    name: { control: "text" },
    image_url: { control: "text" },
    count: { control: "text" },
    layer: { control: "text" },
    location: { control: "text" },
  },
  args: {
    prefix: "Короче",
    name: "Санкт-Петербург",
    count: "5 крутейших мест",
    layer: "Советы местных",
    location: "Санкт-Петербург",
    image_url:
      "https://hermitage.aviasales.ru/img/g:ce/rs:fill:512:512:0/bG9jYWxzX3RyYXAvcG9pcy8yOTQxNGE2My00NTMxLTRlNDgtODFjNy1iMTVlOWE3ZGVkZjA.jpeg",
  },
};
