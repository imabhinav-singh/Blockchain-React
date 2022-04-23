import {
  faRoad,
  faCloudShowersHeavy,
  faSmog,
  faCarOn,
  faTrafficLight,
} from "@fortawesome/free-solid-svg-icons";
import { videos } from "../assets/videos";

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

export const LOCATION_CONFIG = {
  hyderabad: "Hyderabad",
  chennai: "Chennai",
  delhi: "Delhi",
  lucknow: "Lucknow",
  mumbai: "Mumbai",
  bangalore: "Bangalore",
  guwahati: "Guwahati",
  noida: "Noida",
  ahmedabad: "Ahmedabad",
  vishakhapatnam: "Vishakhapatnam",
  pune: "Pune",
  kolkata: "Kolkata",
  agra: "Agra",
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
    video: videos.normal,
  },
  raining: {
    text: "Raining",
    icon: faCloudShowersHeavy,
    video: videos.raining,
  },
  highway: {
    text: "Highway",
    icon: faRoad,
    video: videos.highway,
  },
  foggy: {
    text: "Foggy",
    icon: faSmog,
    video: videos.foggy,
  },
  traffic: {
    text: "Traffic",
    icon: faTrafficLight,
    video: videos.traffic,
  },
};
