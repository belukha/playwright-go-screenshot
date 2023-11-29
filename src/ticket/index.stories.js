import template from "./index.html.mustache?raw";
import mustache from "mustache";

export default {
  title: "ticket",
};

export const Ticket = {
  title: "Ticket",
  render: (args) => {
    return mustache.render(template, args);
  },
  argTypes: {
    price: { control: "text" },
    origin: { control: "text" },
    destination: { control: "text" },
    origin_time_start: { control: "text" },
    origin_time_end: { control: "text" },
    origin_duration: { control: "text" },
    origin_connection: { control: "text" },
    origin_date: { control: "text" },
    origin_weekday: { control: "text" },

    dest_time_start: { control: "text" },
    dest_time_end: { control: "text" },
    dest_duration: { control: "text" },
    dest_connection: { control: "text" },
    dest_date: { control: "text" },
    dest_weekday: { control: "text" },
    logos: { control: "object" },
  },
  args: {
    price: "26 720 ₽",
    origin: "Санкт-Петербург",
    destination: "Токио",
    origin_time_start: "22:25",
    origin_time_end: "10:00",
    origin_duration: "2 ч в пути",
    origin_connection: "прямой",
    origin_date: "12 апр",
    origin_weekday: "вт",

    dest_time_start: "22:25",
    dest_time_end: "10:00",
    dest_duration: "2 ч в пути",
    dest_connection: "прямой",
    dest_date: "12 апр",
    dest_weekday: "вт",
    logos: [
      "https://mpics.avs.io/al_square/64/64/S7.png",
      "https://mpics.avs.io/al_square/64/64/EK.png",
      "https://mpics.avs.io/al_square/64/64/SU.png",
    ],
  },
};
