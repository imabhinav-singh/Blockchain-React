import {
  faRoad,
  faCloudShowersHeavy,
  faSmog,
  faCarOn,
} from "@fortawesome/free-solid-svg-icons";

export const MODEL_CONFIG = {
  innova: "Innova",
  swift: "Swift DZire",
  ertiga: "Ertiga",
  alto: "Alto",
  i10: "i10",
  i20: "i20",
  hondacity: "Honda City",
  baleno: "Baleno",
  duster: "Duster",
  fortuner: "Fortuner",
  bolero: "Bolero",
  safari: "Safari",
  scorpio: "Scorpio",
};

export const AREA_CONFIG = {
  normal: "moving",
  raining: "slowed down",
  foggy: "stopped",
  highway: "speeding",
};

export const COLOR_CONFIG = {
  black: [0, 0, 0],
  pink: [255, 192, 203],
  red: [255, 0, 0],
  yellow: [255, 255, 0],
  orange: [255, 165, 0],
  cyan: [0, 255, 255],
  green: [0, 128, 0],
  blue: [0, 0, 255],
  purple: [128, 0, 128],
  magenta: [255, 0, 255],
  gold: [255, 215, 0],
  lime: [0, 255, 0],
};

export const STATUS_CONFIG = {
  normal: {
    text: "Normal",
    icon: faCarOn,
  },
  raining: {
    text: "Raining",
    icon: faCloudShowersHeavy,
  },
  highway: {
    text: "Highway",
    icon: faRoad,
  },
  foggy: {
    text: "Foggy",
    icon: faSmog,
  },
};
