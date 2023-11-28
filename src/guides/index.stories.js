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
  render: ({ prefix, name, image_url, count, layer, location, images }) => {
    return mustache.render(template, {
      prefix,
      name,
      image: image_url,
      count,
      layer,
      location,
      images,
    });
  },

  argTypes: {
    prefix: { control: "text" },
    name: { control: "text" },
    image_url: { control: "text" },
    count: { control: "text" },
    layer: { control: "text" },
    location: { control: "text" },
    images: { controll: "object" },
  },
  args: {
    prefix: "Короче",
    name: "Санкт-Петербург",
    count: "5 крутейших мест",
    layer: "Советы местных",
    location: "Санкт-Петербург",
    images: [
      "https://photo.hotellook.com/static/as_trap/pois/4979/1056x1056/8def8525-6f56-415d-91e9-f9b40b296cf1.jpg",
      "https://hermitage.aviasales.ru/img/g:ce/rs:fill:1056:1056:0/bG9jYWxzX3RyYXAvcG9pcy8yOWJmZTFlZC00YTJkLTRmZGMtYmJlYS02Yzk3YTk3YWE2YjQ.jpeg",
      "https://photo.hotellook.com/static/as_trap/pois/4989/704x704/1e2f64cf-d41d-4457-b221-0aa2ef6cd03c.jpg",
      "https://photo.hotellook.com/static/as_trap/pois/4982/1056x1056/3fd2bd4f-86eb-4d8d-a6c9-892f84479566.jpg",
    ],
    image_url:
      "https://hermitage.aviasales.ru/img/g:ce/rs:fill:512:512:0/bG9jYWxzX3RyYXAvcG9pcy8yOTQxNGE2My00NTMxLTRlNDgtODFjNy1iMTVlOWE3ZGVkZjA.jpeg",
  },
};
