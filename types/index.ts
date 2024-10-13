import palletsIcon from "../public/pallets.png";
import scotchTapeIcon from "../public/scotchTape.png";
import whiteBraidIcon from "../public/whiteTape.png";
import blackBeltIcon from "../public/blackBelt.png";
import whiteBeltIcon from "../public/whiteBelt.png";
import paperLining90Icon from "../public/paperLining90.png";
import paperLining101Icon from "../public/paperLining101.png";
import downPaperIcon from "../public/downPaper.png";
import upPaperIcon from "../public/upPaper.png";
import cartonBoxIcon from "../public/cartonBox.png";
import stretchIcon from "../public/stretch.png";
import nylonIcon from "../public/nylon.png";

export type OrderType = {
  id: string;
  lineOptions: string;
  areaOptions: "Start" | "Middle" | "Finish";
  workerNumber: string;
  pallets: boolean;
  scotchTape: boolean;
  whiteBraid: boolean;
  blackBelt: boolean;
  whiteBelt: boolean;
  paperLining90: boolean;
  paperLining101: boolean;
  cartonBox80: boolean;
  cartonBox90: boolean;
  cartonBox120: boolean;
  cartonBox140: boolean;
  cartonBox160: boolean;
  cartonBox180: boolean;
  downPaperXFirm: boolean;
  downPaperVagstranda: boolean;
  upPaperCommon: boolean;
  upPaperVagstranda: boolean;
  stretch: boolean;
  nylon8090: boolean;
  nylon120140: boolean;
  nylon160: boolean;
  nylon180: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export const lineOptions = [
  { value: "L1", label: "L1" },
  { value: "L2", label: "L2" },
  { value: "L5", label: "L5" },
  { value: "L10", label: "L10" },
];

export const areaOptions = [
  { value: "Start", label: "Klejenie" },
  { value: "Middle", label: "Ubieranie" },
  { value: "Finish", label: "Pakowanie" },
];

export enum AreaOptionsEnum {
  Start = "Klejenie",
  Middle = "Ubieranie",
  Finish = "Pakowanie",
}

export const orderItems = {
  pallets: {
    PL: "Palety EURO",
    index: "",
    icon: palletsIcon,
  },
  scotchTape: {
    PL: "Taśma Klejąca",
    index: "GM16004",
    icon: scotchTapeIcon,
  },
  whiteBraid: {
    PL: "Stretcz biały",
    index: "GM15015",
    icon: whiteBraidIcon,
  },
  blackBelt: {
    PL: "Uchwyt parciany",
    index: "G100400",
    icon: blackBeltIcon,
  },
  whiteBelt: {
    PL: "Uchwyt klejony",
    index: "G100430",
    icon: whiteBeltIcon,
  },
  paperLining90: {
    PL: "Podkład (Valevag, Vesteroy)",
    index: "GB710090",
    icon: paperLining90Icon,
  },
  paperLining101: {
    PL: "Podkład (Vagstranda)",
    index: "GB71101",
    icon: paperLining101Icon,
  },
  downPaperXFirm: {
    PL: "Przekładka papierowa X-Firm",
    index: "GMC32808",
    icon: downPaperIcon,
  },
  downPaperVagstranda: {
    PL: "Przekładka papierowa (Vagstranda)",
    index: "GMC32954",
    icon: downPaperIcon,
  },
  upPaperCommon: {
    PL: "Pokrywa papierowa (Valevag, Vesteroy)",
    index: "GB70034",
    icon: upPaperIcon,
  },
  upPaperVagstranda: {
    PL: "Pokrywa papierowa (Vagstranda)",
    index: "GMC32811",
    icon: upPaperIcon,
  },
  cartonBox80: {
    PL: "Carton Box (Vagstranda) 80",
    index: "GMC32809",
    icon: cartonBoxIcon,
  },
  cartonBox90: {
    PL: "Carton Box (Vagstranda) 90",
    index: "GMC32802",
    icon: cartonBoxIcon,
  },
  cartonBox120: {
    PL: "Carton Box (Vagstranda) 120",
    index: "GMC32803",
    icon: cartonBoxIcon,
  },
  cartonBox140: {
    PL: "Carton Box (Vagstranda) 140",
    index: "GMC32804",
    icon: cartonBoxIcon,
  },
  cartonBox160: {
    PL: "Carton Box (Vagstranda) 160",
    index: "GMC32805",
    icon: cartonBoxIcon,
  },
  cartonBox180: {
    PL: "Carton Box (Vagstranda) 180",
    index: "GMC32806",
    icon: cartonBoxIcon,
  },
  stretch: {
    PL: "Strecz Vagstranda",
    index: "GM15017",
    icon: stretchIcon,
  },
  nylon8090: {
    PL: "Nylon 80 / 90",
    index: "GM14040",
    icon: nylonIcon,
  },
  nylon120140: {
    PL: "Nylon 120 / 140",
    index: "GM14042",
    icon: nylonIcon,
  },
  nylon160: {
    PL: "Nylon 160",
    index: "GM14043",
    icon: nylonIcon,
  },
  nylon180: {
    PL: "Nylon 180",
    index: "GM14041",
    icon: nylonIcon,
  },
};
