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
import separatorIcon from "../public/separator.png";
import triangularIcon from "../public/triangular.png";
import { StaticImageData } from "next/image";
import { UserRole } from "@prisma/client";
import wireIcon from "../public/wire.png";
import flizelinIcon from "../public/flizelin.png";
import flizelinTopDownIcon from "../public/flizelinTopDown.png";

export const roleOptions = [
  { value: UserRole.WORKER, label: "Pracownik produkcji" },
  { value: UserRole.DRIVER, label: "Wózkowy" },
  { value: UserRole.ADMIN, label: "Administrator" },
];

export type WorkerPageFormType = {
  line?: { value: string; label: string } | null;
  area?: { value: string; label: string } | null;
};

export type CpsPageFormType = {
  machine?: { value: string; label: string } | null;
};

export type OrderType = {
  id: string;
  lineOptions: string;
  machineOptions?: string | null;
  areaOptions: "Start" | "Middle" | "Finish";
  workerNumber: string;
  pallets: boolean;
  pallets8090: boolean;
  pallets120140: boolean;
  pallets160: boolean;
  pallets180: boolean;
  wire16: boolean;
  wire17: boolean;
  wire18: boolean;
  wire19: boolean;
  wire20: boolean;
  wire21: boolean;
  flizelin450: boolean;
  flizelin500: boolean;
  flizelinTopDown: boolean;
  needReplaceWire: boolean;
  needReplaceFlizelin: boolean;
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
  separateSkarer: boolean;
  triangularCartonSkarer: boolean;
  paperLiningSkarer8090: boolean;
  paperLiningSkarer105: boolean;
  paperLiningSkarer120140: boolean;
  paperLiningSkarer160: boolean;
  separateSnarum: boolean;
  triangularCartonSnarum: boolean;
  paperLiningSnarum8090: boolean;
  paperLiningSnarum105: boolean;
  paperLiningSnarum120140: boolean;
  paperLiningSnarum160: boolean;
  separateSkotterud: boolean;
  triangularCartonSkotterud: boolean;
  paperLiningSkotterud8090: boolean;
  paperLiningSkotterud120140: boolean;
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

export const machineOptions = [
  { value: "DW L1", label: "DW L1" },
  { value: "DW L2", label: "DW L2" },
  { value: "DW L3", label: "DW L3" },
  { value: "DW L4", label: "DW L4" },
  { value: "4WL L1", label: "4WL L1" },
  { value: "4WL L2", label: "4WL L2" },
  { value: "4WL L3", label: "4WL L3" },
  { value: "4WL L4", label: "4WL L4" },
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

export enum LinesEnum {
  L10 = "L10",
  L5 = "L5",
  L2 = "L2",
  L1 = "L1",
  CPS = "CPS",
}

export type OrderItemType = {
  PL: string;
  index: string;
  icon: string | StaticImageData;
};

export const orderItems = {
  pallets: {
    PL: "Palety EURO",
    index: "",
    icon: palletsIcon,
  },
  pallets8090: {
    PL: "Palety 80/90",
    index: "",
    icon: palletsIcon,
  },
  pallets120140: {
    PL: "Palety 120/140",
    index: "",
    icon: palletsIcon,
  },
  pallets160: {
    PL: "Palety 160",
    index: "",
    icon: palletsIcon,
  },
  pallets180: {
    PL: "Palety 180",
    index: "",
    icon: palletsIcon,
  },
  wire16: {
    PL: "Drut 1.6",
    index: "GW01016",
    icon: wireIcon,
  },
  wire17: {
    PL: "Drut 1.7",
    index: "GW01017",
    icon: wireIcon,
  },
  wire18: {
    PL: "Drut 1.8",
    index: "GW01018",
    icon: wireIcon,
  },
  wire19: {
    PL: "Drut 1.9",
    index: "GW01019",
    icon: wireIcon,
  },
  wire20: {
    PL: "Drut 2.0",
    index: "GW01020",
    icon: wireIcon,
  },
  wire21: {
    PL: "Drut 2.1",
    index: "GW01021",
    icon: wireIcon,
  },
  flizelin450: {
    PL: "Flizelina 450",
    index: "GB53036",
    icon: flizelinIcon,
  },
  flizelin500: {
    PL: "Flizelina 500",
    index: "GB53039",
    icon: flizelinIcon,
  },
  flizelinTopDown: {
    PL: "Flizelin góra-dół",
    index: "GB53135",
    icon: flizelinTopDownIcon,
  },
  needReplaceWire: {
    PL: "Zamiana drutu",
    index: "",
    icon: wireIcon,
  },
  needReplaceFlizelin: {
    PL: "Zamiana flizeliny",
    index: "",
    icon: flizelinTopDownIcon,
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
  separateSkarer: {
    PL: "Separator",
    index: "GMC32798",
    icon: separatorIcon,
  },
  triangularCartonSkarer: {
    PL: "Karton trójkątny",
    index: "GMC32786",
    icon: triangularIcon,
  },
  paperLiningSkarer8090: {
    PL: "Paleta papierowa 80/90",
    index: "GB71100",
    icon: paperLining90Icon,
  },
  paperLiningSkarer105: {
    PL: "Paleta papierowa 105",
    index: "GB71098",
    icon: paperLining90Icon,
  },
  paperLiningSkarer120140: {
    PL: "Paleta papierowa 120/140",
    index: "GB71092",
    icon: paperLining90Icon,
  },
  paperLiningSkarer160: {
    PL: "Paleta papierowa 160",
    index: "GB71094",
    icon: paperLining90Icon,
  },
  separateSnarum: {
    PL: "Separator",
    index: "GMC32794",
    icon: separatorIcon,
  },
  triangularCartonSnarum: {
    PL: "Karton trójkątny",
    index: "GMC32783",
    icon: triangularIcon,
  },
  paperLiningSnarum8090: {
    PL: "Paleta papierowa 80/90",
    index: "GB71091",
    icon: paperLining90Icon,
  },
  paperLiningSnarum120140: {
    PL: "Paleta papierowa 120/140",
    index: "GB71093",
    icon: paperLining90Icon,
  },
  paperLiningSnarum160: {
    PL: "Paleta papierowa 160",
    index: "GB71095",
    icon: paperLining90Icon,
  },
  separateSkotterud: {
    PL: "Separator",
    index: "GMC32793",
    icon: separatorIcon,
  },
  triangularCartonSkotterud: {
    PL: "Karton trójkątny",
    index: "GMC32785",
    icon: triangularIcon,
  },
  paperLiningSkotterud8090: {
    PL: "Paleta papierowa 80/90",
    index: "GB71091",
    icon: paperLining90Icon,
  },
  paperLiningSkotterud120140: {
    PL: "Paleta papierowa 120/140",
    index: "GB71093",
    icon: paperLining90Icon,
  },
};

export const NumbersIKEA = [
  { name: "VESTERÖY M-FIRM 800", number: "004.506.01" },
  { name: "VESTERÖY M-FIRM 900", number: "404.505.00" },
  { name: "VESTERÖY M-FIRM 1200", number: "404.700.89" },
  { name: "VESTERÖY M-FIRM 1400", number: "004.506.15" },
  { name: "VESTERÖY M-FIRM 1600", number: "404.506.23" },
  { name: "VESTERÖY M-FIRM 1800", number: "304.701.22" },

  { name: "VESTERÖY FIRM 800", number: "804.506.02" },
  { name: "VESTERÖY FIRM 900", number: "004.505.02" },
  { name: "VESTERÖY FIRM 1200", number: "604.700.88" },
  { name: "VESTERÖY FIRM 1400", number: "304.506.09" },
  { name: "VESTERÖY FIRM 1600", number: "404.506.18" },
  { name: "VESTERÖY FIRM 1800", number: "304.701.17" },

  { name: "VESTERÖY X-FIRM 900", number: "204.700.71" },
  { name: "VESTERÖY X-FIRM 1200", number: "804.700.87" },
  { name: "VESTERÖY X-FIRM 1400", number: "004.700.53" },
  { name: "VESTERÖY X-FIRM 1600", number: "104.700.62" },
  { name: "VESTERÖY X-FIRM 1800", number: "204.701.13" },

  { name: "VALEVÅG M-FIRM 800", number: "704.507.06" },
  { name: "VALEVÅG M-FIRM 900", number: "204.507.18" },
  { name: "VALEVÅG M-FIRM 1200", number: "304.506.52" },
  { name: "VALEVÅG M-FIRM 1400", number: "104.506.67" },
  { name: "VALEVÅG M-FIRM 1600", number: "504.506.89" },
  { name: "VALEVÅG M-FIRM 1800", number: "404.700.13" },

  { name: "VALEVÅG FIRM 800", number: "404.507.03" },
  { name: "VALEVÅG FIRM 900", number: "104.507.09" },
  { name: "VALEVÅG FIRM 1200", number: "404.699.10" },
  { name: "VALEVÅG FIRM 1400", number: "004.506.58" },
  { name: "VALEVÅG FIRM 1600", number: "404.506.80" },
  { name: "VALEVÅG FIRM 1600/1900", number: "805.317.07" },
  { name: "VALEVÅG FIRM 1800", number: "204.700.09" },

  { name: "VALEVÅG X-FIRM 800", number: "904.700.20" },
  { name: "VALEVÅG X-FIRM 900", number: "604.700.26" },
  { name: "VALEVÅG X-FIRM 1200", number: "204.699.06" },
  { name: "VALEVÅG X-FIRM 1400", number: "204.699.25" },
  { name: "VALEVÅG X-FIRM 1600", number: "204.699.49" },
  { name: "VALEVÅG X-FIRM 1600/1900", number: "605.317.08" },
  { name: "VALEVÅG X-FIRM 1800", number: "004.700.05" },

  { name: "VÅGSTRANDA M-FIRM 800", number: "604.703.90" },
  { name: "VÅGSTRANDA M-FIRM 900", number: "104.507.71" },
  { name: "VÅGSTRANDA M-FIRM 1200", number: "304.702.83" },
  { name: "VÅGSTRANDA M-FIRM 1400", number: "504.507.45" },
  { name: "VÅGSTRANDA M-FIRM 1600", number: "704.507.54" },
  { name: "VÅGSTRANDA M-FIRM 1800", number: "404.507.60" },

  { name: "VÅGSTRANDA FIRM 800", number: "404.703.86" },
  { name: "VÅGSTRANDA FIRM 900", number: "704.507.68" },
  { name: "VÅGSTRANDA FIRM 1200", number: "904.702.80" },
  { name: "VÅGSTRANDA FIRM 1400", number: "204.507.42" },
  { name: "VÅGSTRANDA FIRM 1600", number: "304.507.51" },
  { name: "VÅGSTRANDA FIRM 1800", number: "004.507.57" },

  { name: "VÅGSTRANDA X-FIRM 800", number: "104.703.83" },
  { name: "VÅGSTRANDA X-FIRM 900", number: "504.703.95" },
  { name: "VÅGSTRANDA X-FIRM 1400", number: "204.702.88" },
  { name: "VÅGSTRANDA X-FIRM 1600", number: "804.703.70" },
  { name: "VÅGSTRANDA X-FIRM 1800", number: "904.703.79" },

  { name: "VESTMARKA M-FIRM 800", number: "304.701.98" },
  { name: "VESTMARKA M-FIRM 900", number: "504.513.06" },
  { name: "VESTMARKA M-FIRM 1400", number: "704.512.87" },
  { name: "VESTMARKA M-FIRM 1600", number: "504.512.93" },

  { name: "VESTMARKA FIRM 800", number: "904.701.95" },
  { name: "VESTMARKA FIRM 900", number: "204.513.03" },
  { name: "VESTMARKA FIRM 1200", number: "004.701.52" },
  { name: "VESTMARKA FIRM 1400", number: "404.512.84" },
  { name: "VESTMARKA FIRM 1600", number: "104.512.90" },
  { name: "VESTMARKA FIRM 1800", number: "004.833.43" },

  { name: "VESTMARKA X-FIRM 800", number: "604.701.92" },
  { name: "VESTMARKA X-FIRM 900", number: "504.702.44" },
  { name: "VESTMARKA X-FIRM 1200", number: "604.701.49" },
  { name: "VESTMARKA X-FIRM 1400", number: "904.701.62" },
  { name: "VESTMARKA X-FIRM 1600", number: "204.701.65" },
  { name: "VESTMARKA X-FIRM 1800", number: "204.833.42" },

  { name: "ÅNNELAND FIRM 800", number: "704.817.22" },
  { name: "ÅNNELAND FIRM 900", number: "004.817.30" },
  { name: "ÅNNELAND FIRM 1400", number: "704.817.03" },
  { name: "ÅNNELAND FIRM 1600", number: "204.817.10" },
  { name: "ÅNNELAND FIRM 1800", number: "705.111.11" },

  { name: "ÅNNELAND M-FIRM 800", number: "604.817.27" },
  { name: "ÅNNELAND M-FIRM 900", number: "904.817.35" },
  { name: "ÅNNELAND M-FIRM 1400", number: "804.817.07" },
  { name: "ÅNNELAND M-FIRM 1600", number: "104.817.15" },
  { name: "ÅNNELAND M-FIRM 1800", number: "104.817.20" },

  { name: "SKARER FIRM 800", number: "903.226.85" },
  { name: "SKARER FIRM 900", number: "403.073.19" },
  { name: "SKARER FIRM 1050", number: "103.226.89" },
  { name: "SKARER FIRM 1200", number: "303.073.29" },
  { name: "SKARER FIRM 1400", number: "703.073.32" },
  { name: "SKARER FIRM 1600", number: "603.073.37" },

  { name: "SKARER M-FIRM 800", number: "203.226.84" },
  { name: "SKARER M-FIRM 900", number: "203.098.85" },
  { name: "SKARER M-FIRM 1050", number: "303.226.88" },
  { name: "SKARER M-FIRM 1200", number: "503.098.79" },
  { name: "SKARER M-FIRM 1400", number: "903.098.82" },
  { name: "SKARER M-FIRM 1600", number: "703.098.83" },

  { name: "SKOTTERUD FIRM 800", number: "003.221.90" },
  { name: "SKOTTERUD FIRM 900", number: "203.073.20" },
  { name: "SKOTTERUD FIRM 1200", number: "703.073.27" },
  { name: "SKOTTERUD FIRM 1400", number: "503.073.33" },

  { name: "SKOTTERUD M-FIRM 800", number: "903.221.95" },
  { name: "SKOTTERUD M-FIRM 900", number: "303.098.75" },
  { name: "SKOTTERUD M-FIRM 1200", number: "403.098.70" },
  { name: "SKOTTERUD M-FIRM 1400", number: "003.098.72" },

  { name: "SNARUM M-FIRM 800", number: "603.098.93" },
  { name: "SNARUM M-FIRM 900", number: "403.098.94" },
  { name: "SNARUM M-FIRM 1200", number: "403.098.89" },
  { name: "SNARUM M-FIRM 1400", number: "003.098.91" },
  { name: "SNARUM M-FIRM 1600", number: "803.098.92" },

  { name: "VATNESTRÖM M-FIRM 800", number: "904.764.18" },
  { name: "VATNESTRÖM M-FIRM 900", number: "104.764.22" },
  { name: "VATNESTRÖM M-FIRM 1400", number: "504.764.01" },
  { name: "VATNESTRÖM M-FIRM 1600", number: "204.764.07" },
  { name: "VATNESTRÖM M-FIRM 1800", number: "804.764.14" },

  { name: "VATNESTRÖM FIRM 800", number: "304.764.16" },
  { name: "VATNESTRÖM FIRM 900", number: "704.764.19" },
  { name: "VATNESTRÖM FIRM 1400", number: "104.763.99" },
  { name: "VATNESTRÖM FIRM 1600", number: "904.764.04" },
  { name: "VATNESTRÖM FIRM 1800", number: "604.764.10" },

  { name: "VATNESTRÖM X-FIRM 900", number: "204.784.87" },
  { name: "VATNESTRÖM X-FIRM 1400", number: "504.784.76" },
  { name: "VATNESTRÖM X-FIRM 1600", number: "904.784.79" },
  { name: "VATNESTRÖM X-FIRM 1800", number: "304.784.82" },

  { name: "VATNESTRÖM FIRM EG 1600", number: "" },
  { name: "VATNESTRÖM FIRM EG 1800", number: "" },

  { name: "VATNESTRÖM X-FIRM EG 1600", number: "" },
  { name: "VATNESTRÖM X-FIRM EG 1800", number: "" },
];

export const defaultValuesL1L2Form = {
  pallets: false,
  scotchTape: false,
  whiteBraid: false,
  blackBelt: false,
  whiteBelt: false,
  paperLining90: false,
  upPaperCommon: false,
};

export const defaultValuesL5Form = {
  pallets: false,
  scotchTape: false,
  whiteBraid: false,
  separateSkarer: false,
  triangularCartonSkarer: false,
  paperLiningSkarer8090: false,
  paperLiningSkarer105: false,
  paperLiningSkarer120140: false,
  paperLiningSkarer160: false,
  separateSnarum: false,
  triangularCartonSnarum: false,
  paperLiningSnarum8090: false,
  paperLiningSnarum120140: false,
  paperLiningSnarum160: false,
  separateSkotterud: false,
  triangularCartonSkotterud: false,
  paperLiningSkotterud8090: false,
  paperLiningSkotterud120140: false,
};

export const defaultValuesL10Form = {
  pallets: false,
  scotchTape: false,
  whiteBraid: false,
  blackBelt: false,
  whiteBelt: false,
  paperLining90: false,
  paperLining101: false,
  cartonBox80: false,
  cartonBox90: false,
  cartonBox120: false,
  cartonBox140: false,
  cartonBox160: false,
  cartonBox180: false,
  downPaperXFirm: false,
  downPaperVagstranda: false,
  upPaperCommon: false,
  upPaperVagstranda: false,
  stretch: false,
  nylon8090: false,
  nylon120140: false,
  nylon160: false,
  nylon180: false,
};

export const defaultValuesCpsForm = {
  scotchTape: false,
  pallets8090: false,
  pallets120140: false,
  pallets160: false,
  pallets180: false,
  wire16: false,
  wire17: false,
  wire18: false,
  wire19: false,
  wire20: false,
  wire21: false,
  flizelin450: false,
  flizelin500: false,
  flizelinTopDown: false,
  needReplaceWire: false,
  needReplaceFlizelin: false,
};

export const fieldsCpsForm: {
  name: keyof typeof defaultValuesCpsForm;
  item: OrderItemType;
}[] = [
  {
    name: "scotchTape",
    item: orderItems.scotchTape,
  },
  {
    name: "pallets8090",
    item: orderItems.pallets8090,
  },
  {
    name: "pallets120140",
    item: orderItems.pallets120140,
  },
  {
    name: "pallets160",
    item: orderItems.pallets160,
  },
  {
    name: "pallets180",
    item: orderItems.pallets180,
  },
  {
    name: "wire16",
    item: orderItems.wire16,
  },
  {
    name: "wire17",
    item: orderItems.wire17,
  },
  {
    name: "wire18",
    item: orderItems.wire18,
  },
  {
    name: "wire19",
    item: orderItems.wire19,
  },
  {
    name: "wire20",
    item: orderItems.wire20,
  },
  {
    name: "wire21",
    item: orderItems.wire21,
  },
  {
    name: "flizelin450",
    item: orderItems.flizelin450,
  },
  {
    name: "flizelin500",
    item: orderItems.flizelin500,
  },
  {
    name: "flizelinTopDown",
    item: orderItems.flizelinTopDown,
  },
  {
    name: "needReplaceWire",
    item: orderItems.needReplaceWire,
  },
  {
    name: "needReplaceFlizelin",
    item: orderItems.needReplaceFlizelin,
  },
];

export const fieldsL1L2: {
  name: keyof typeof defaultValuesL1L2Form;
  item: OrderItemType;
}[] = [
  {
    name: "pallets",
    item: orderItems.pallets,
  },
  {
    name: "scotchTape",
    item: orderItems.scotchTape,
  },
  {
    name: "whiteBraid",
    item: orderItems.whiteBraid,
  },
  {
    name: "blackBelt",
    item: orderItems.blackBelt,
  },
  {
    name: "whiteBelt",
    item: orderItems.whiteBelt,
  },
  {
    name: "paperLining90",
    item: orderItems.paperLining90,
  },
  {
    name: "upPaperCommon",
    item: orderItems.upPaperCommon,
  },
];

export const commonFieldsL5: {
  name: keyof typeof defaultValuesL5Form;
  item: OrderItemType;
}[] = [
  {
    name: "pallets",
    item: orderItems.pallets,
  },
  {
    name: "scotchTape",
    item: orderItems.scotchTape,
  },
  {
    name: "whiteBraid",
    item: orderItems.whiteBraid,
  },
];

export const skarerFieldsL5: {
  name: keyof typeof defaultValuesL5Form;
  item: OrderItemType;
}[] = [
  {
    name: "separateSkarer",
    item: orderItems.separateSkarer,
  },
  {
    name: "triangularCartonSkarer",
    item: orderItems.triangularCartonSkarer,
  },
  {
    name: "paperLiningSkarer8090",
    item: orderItems.paperLiningSkarer8090,
  },
  {
    name: "paperLiningSkarer105",
    item: orderItems.paperLiningSkarer105,
  },
  {
    name: "paperLiningSkarer120140",
    item: orderItems.paperLiningSkarer120140,
  },
  {
    name: "paperLiningSkarer160",
    item: orderItems.paperLiningSkarer160,
  },
];

export const snarumFieldsL5: {
  name: keyof typeof defaultValuesL5Form;
  item: OrderItemType;
}[] = [
  {
    name: "separateSnarum",
    item: orderItems.separateSnarum,
  },
  {
    name: "triangularCartonSnarum",
    item: orderItems.triangularCartonSnarum,
  },
  {
    name: "paperLiningSnarum8090",
    item: orderItems.paperLiningSnarum8090,
  },
  {
    name: "paperLiningSnarum120140",
    item: orderItems.paperLiningSnarum120140,
  },
  {
    name: "paperLiningSnarum160",
    item: orderItems.paperLiningSnarum160,
  },
];

export const skotterudFieldsL5: {
  name: keyof typeof defaultValuesL5Form;
  item: OrderItemType;
}[] = [
  {
    name: "separateSkotterud",
    item: orderItems.separateSkotterud,
  },
  {
    name: "triangularCartonSkotterud",
    item: orderItems.triangularCartonSkotterud,
  },
  {
    name: "paperLiningSkotterud8090",
    item: orderItems.paperLiningSkotterud8090,
  },
  {
    name: "paperLiningSkotterud120140",
    item: orderItems.paperLiningSkotterud120140,
  },
];

export const commonFieldsL10: {
  name: keyof typeof defaultValuesL10Form;
  item: OrderItemType;
}[] = [
  {
    name: "pallets",
    item: orderItems.pallets,
  },
  {
    name: "scotchTape",
    item: orderItems.scotchTape,
  },
  {
    name: "whiteBraid",
    item: orderItems.whiteBraid,
  },
];

export const beltsFieldsL10: {
  name: keyof typeof defaultValuesL10Form;
  item: OrderItemType;
}[] = [
  {
    name: "blackBelt",
    item: orderItems.blackBelt,
  },
  {
    name: "whiteBelt",
    item: orderItems.whiteBelt,
  },
];

export const paperLiningFieldsL10: {
  name: keyof typeof defaultValuesL10Form;
  item: OrderItemType;
}[] = [
  {
    name: "paperLining90",
    item: orderItems.paperLining90,
  },
  {
    name: "paperLining101",
    item: orderItems.paperLining101,
  },
];

export const downPaperFieldsL10: {
  name: keyof typeof defaultValuesL10Form;
  item: OrderItemType;
}[] = [
  {
    name: "downPaperXFirm",
    item: orderItems.downPaperXFirm,
  },
  {
    name: "downPaperVagstranda",
    item: orderItems.downPaperVagstranda,
  },
];

export const upPaperFieldsL10: {
  name: keyof typeof defaultValuesL10Form;
  item: OrderItemType;
}[] = [
  {
    name: "upPaperCommon",
    item: orderItems.upPaperCommon,
  },
  {
    name: "upPaperVagstranda",
    item: orderItems.upPaperVagstranda,
  },
];

export const cartonBoxFieldsL10: {
  name: keyof typeof defaultValuesL10Form;
  item: OrderItemType;
}[] = [
  {
    name: "cartonBox80",
    item: orderItems.cartonBox80,
  },
  {
    name: "cartonBox90",
    item: orderItems.cartonBox90,
  },
  {
    name: "cartonBox120",
    item: orderItems.cartonBox120,
  },
  {
    name: "cartonBox140",
    item: orderItems.cartonBox140,
  },
  {
    name: "cartonBox160",
    item: orderItems.cartonBox160,
  },
  {
    name: "cartonBox180",
    item: orderItems.cartonBox180,
  },
];

export const stretchFieldsL10: {
  name: keyof typeof defaultValuesL10Form;
  item: OrderItemType;
}[] = [
  {
    name: "stretch",
    item: orderItems.stretch,
  },
  {
    name: "nylon8090",
    item: orderItems.nylon8090,
  },
  {
    name: "nylon120140",
    item: orderItems.nylon120140,
  },
  {
    name: "nylon160",
    item: orderItems.nylon160,
  },
  {
    name: "nylon180",
    item: orderItems.nylon180,
  },
];

export enum MattressFirmness {
  Medium = "M",
  Firm = "F",
  XFirm = "X",
}

export type MattressCore = {
  name: string;
  index: string;
  firmness: MattressFirmness;
  size: {
    width: number;
    length: number;
    height: number;
  };
  numberOfPockets: { count: number; size: number }[];
  springs: { thickness: number }[];
  lengthOf10Pockets: number;
};

export const mattressCores: MattressCore[] = [
  {
    name: "VESTEROY M 80x200",
    index: "GM309I1",
    firmness: MattressFirmness.Medium,
    size: {
      width: 79,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 11, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 1.7 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY M 90x200",
    index: "GM309I3",
    firmness: MattressFirmness.Medium,
    size: {
      width: 89,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 12, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 1.7 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY M 120x200",
    index: "GM309I5",
    firmness: MattressFirmness.Medium,
    size: {
      width: 119,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 17, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 1.7 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY M 140x200",
    index: "GM309I6",
    firmness: MattressFirmness.Medium,
    size: {
      width: 139,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 20, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 1.7 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY M 160x200",
    index: "GM309I7",
    firmness: MattressFirmness.Medium,
    size: {
      width: 159,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 23, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 1.7 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY M 180x200",
    index: "GM309I8",
    firmness: MattressFirmness.Medium,
    size: {
      width: 179,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 26, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 1.7 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY F 80x200",
    index: "GM309J1",
    firmness: MattressFirmness.Firm,
    size: {
      width: 79,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 11, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 1.9 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY F 90x200",
    index: "GM309J3",
    firmness: MattressFirmness.Firm,
    size: {
      width: 89,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 12, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 1.9 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY F 120x200",
    index: "GM309J5",
    firmness: MattressFirmness.Firm,
    size: {
      width: 119,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 17, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 1.9 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY F 140x200",
    index: "GM309J6",
    firmness: MattressFirmness.Firm,
    size: {
      width: 139,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 20, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 1.9 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY F 160x200",
    index: "GM309J7",
    firmness: MattressFirmness.Firm,
    size: {
      width: 159,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 23, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 1.9 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY F 180x200",
    index: "GM309J8",
    firmness: MattressFirmness.Firm,
    size: {
      width: 179,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 26, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 1.9 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY X 80x200",
    index: "GM309K1",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 79,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 11, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 2.1 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY X 90x200",
    index: "GM309K3",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 89,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 12, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 2.1 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY X 120x200",
    index: "GM309K5",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 119,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 17, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 2.1 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY X 140x200",
    index: "GM309K6",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 139,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 20, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 2.1 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY X 160x200",
    index: "GM309K7",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 159,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 23, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 2.1 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VESTEROY X 180x200",
    index: "GM309K8",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 179,
      length: 202,
      height: 15.5,
    },
    numberOfPockets: [
      { count: 1, size: 32 },
      { count: 26, size: 31 },
      { count: 1, size: 32 },
    ],
    springs: [{ thickness: 2.1 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VALEVAG M 80x200",
    index: "GM309F1",
    firmness: MattressFirmness.Medium,
    size: {
      width: 79,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 11, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.6 }, { thickness: 1.8 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG M 90x200",
    index: "GM309F3",
    firmness: MattressFirmness.Medium,
    size: {
      width: 89,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 12, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.6 }, { thickness: 1.8 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG M 120x200",
    index: "GM309F5",
    firmness: MattressFirmness.Medium,
    size: {
      width: 119,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 17, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.6 }, { thickness: 1.8 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG M 140x200",
    index: "GM309F6",
    firmness: MattressFirmness.Medium,
    size: {
      width: 139,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 20, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.6 }, { thickness: 1.8 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG M 160x200",
    index: "GM309F7",
    firmness: MattressFirmness.Medium,
    size: {
      width: 159,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 23, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.6 }, { thickness: 1.8 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG M 180x200",
    index: "GM309F8",
    firmness: MattressFirmness.Medium,
    size: {
      width: 179,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 26, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.6 }, { thickness: 1.8 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG F 80x200",
    index: "GM309G1",
    firmness: MattressFirmness.Firm,
    size: {
      width: 79,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 11, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.7 }, { thickness: 1.9 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG F 90x200",
    index: "GM309G3",
    firmness: MattressFirmness.Firm,
    size: {
      width: 89,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 12, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.7 }, { thickness: 1.9 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG F 120x200",
    index: "GM309G5",
    firmness: MattressFirmness.Firm,
    size: {
      width: 119,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 17, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.7 }, { thickness: 1.9 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG F 140x200",
    index: "GM309G6",
    firmness: MattressFirmness.Firm,
    size: {
      width: 139,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 20, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.7 }, { thickness: 1.9 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG F 160x200",
    index: "GM309G7",
    firmness: MattressFirmness.Firm,
    size: {
      width: 159,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 23, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.7 }, { thickness: 1.9 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG F 180x200",
    index: "GM309G8",
    firmness: MattressFirmness.Firm,
    size: {
      width: 179,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 26, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.7 }, { thickness: 1.9 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG F 160x190",
    index: "GM309G9",
    firmness: MattressFirmness.Firm,
    size: {
      width: 159,
      length: 196,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 31 },
      { count: 23, size: 30 },
      { count: 1, size: 31 },
    ],
    springs: [{ thickness: 1.7 }, { thickness: 1.9 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG X 80x200",
    index: "GM309H1",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 79,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 11, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.8 }, { thickness: 2.0 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG X 90x200",
    index: "GM309H3",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 89,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 12, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.8 }, { thickness: 2.0 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG X 120x200",
    index: "GM309H5",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 119,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 17, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.8 }, { thickness: 2.0 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG X 140x200",
    index: "GM309H6",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 139,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 20, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.8 }, { thickness: 2.0 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG X 160x200",
    index: "GM309H7",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 159,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 23, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.8 }, { thickness: 2.0 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG X 180x200",
    index: "GM309H8",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 179,
      length: 206,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 33 },
      { count: 26, size: 32 },
      { count: 1, size: 33 },
    ],
    springs: [{ thickness: 1.8 }, { thickness: 2.0 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VALEVAG X 160x190",
    index: "GM309H9",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 159,
      length: 196,
      height: 17.5,
    },
    numberOfPockets: [
      { count: 1, size: 31 },
      { count: 23, size: 30 },
      { count: 1, size: 31 },
    ],
    springs: [{ thickness: 1.8 }, { thickness: 2.0 }],
    lengthOf10Pockets: 75,
  },
  {
    name: "VATNESTROM M 80x200",
    index: "GM30971",
    firmness: MattressFirmness.Medium,
    size: {
      width: 76,
      length: 196,
      height: 17,
    },
    numberOfPockets: [
      { count: 12, size: 28 },
    ],
    springs: [{ thickness: 1.6 }, { thickness: 1.8 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VATNESTROM M 90x200",
    index: "GM30972",
    firmness: MattressFirmness.Medium,
    size: {
      width: 86,
      length: 196,
      height: 17,
    },
    numberOfPockets: [
      { count: 14, size: 28 },
    ],
    springs: [{ thickness: 1.6 }, { thickness: 1.8 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VATNESTROM M 140x200",
    index: "GM30976",
    firmness: MattressFirmness.Medium,
    size: {
      width: 136,
      length: 196,
      height: 17,
    },
    numberOfPockets: [
      { count: 22, size: 28 },
    ],
    springs: [{ thickness: 1.6 }, { thickness: 1.8 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VATNESTROM M 160x200",
    index: "GM30977",
    firmness: MattressFirmness.Medium,
    size: {
      width: 156,
      length: 196,
      height: 17,
    },
    numberOfPockets: [
      { count: 25, size: 28 },
    ],
    springs: [{ thickness: 1.6 }, { thickness: 1.8 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VATNESTROM M 180x200",
    index: "GM30978",
    firmness: MattressFirmness.Medium,
    size: {
      width: 176,
      length: 196,
      height: 17,
    },
    numberOfPockets: [
      { count: 29, size: 28 },
    ],
    springs: [{ thickness: 1.6 }, { thickness: 1.8 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VATNESTROM F 80x200",
    index: "GM30981",
    firmness: MattressFirmness.Firm,
    size: {
      width: 76,
      length: 196,
      height: 17,
    },
    numberOfPockets: [
      { count: 12, size: 28 },
    ],
    springs: [{ thickness: 1.7 }, { thickness: 1.9 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VATNESTROM F 90x200",
    index: "GM30982",
    firmness: MattressFirmness.Firm,
    size: {
      width: 86,
      length: 196,
      height: 17,
    },
    numberOfPockets: [
      { count: 14, size: 28 },
    ],
    springs: [{ thickness: 1.7 }, { thickness: 1.9 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VATNESTROM F 140x200",
    index: "GM30986",
    firmness: MattressFirmness.Firm,
    size: {
      width: 136,
      length: 196,
      height: 17,
    },
    numberOfPockets: [
      { count: 22, size: 28 },
    ],
    springs: [{ thickness: 1.7 }, { thickness: 1.9 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VATNESTROM F 160x200",
    index: "GM30987",
    firmness: MattressFirmness.Firm,
    size: {
      width: 156,
      length: 196,
      height: 17,
    },
    numberOfPockets: [
      { count: 25, size: 28 },
    ],
    springs: [{ thickness: 1.7 }, { thickness: 1.9 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VATNESTROM F 180x200",
    index: "GM30988",
    firmness: MattressFirmness.Firm,
    size: {
      width: 176,
      length: 196,
      height: 17,
    },
    numberOfPockets: [
      { count: 29, size: 28 },
    ],
    springs: [{ thickness: 1.7 }, { thickness: 1.9 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VATNESTROM X 80x200",
    index: "GM30991",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 76,
      length: 196,
      height: 17,
    },
    numberOfPockets: [
      { count: 12, size: 28 },
    ],
    springs: [{ thickness: 1.9 }, { thickness: 2.1 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VATNESTROM X 90x200",
    index: "GM30992",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 86,
      length: 196,
      height: 17,
    },
    numberOfPockets: [
      { count: 14, size: 28 },
    ],
    springs: [{ thickness: 1.9 }, { thickness: 2.1 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VATNESTROM X 140x200",
    index: "GM30996",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 136,
      length: 196,
      height: 17,
    },
    numberOfPockets: [
      { count: 22, size: 28 },
    ],
    springs: [{ thickness: 1.9 }, { thickness: 2.1 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VATNESTROM X 160x200",
    index: "GM30997",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 156,
      length: 196,
      height: 17,
    },
    numberOfPockets: [
      { count: 25, size: 28 },
    ],
    springs: [{ thickness: 1.9 }, { thickness: 2.1 }],
    lengthOf10Pockets: 80,
  },
  {
    name: "VATNESTROM X 180x200",
    index: "GM30998",
    firmness: MattressFirmness.XFirm,
    size: {
      width: 176,
      length: 196,
      height: 17,
    },
    numberOfPockets: [
      { count: 29, size: 28 },
    ],
    springs: [{ thickness: 1.9 }, { thickness: 2.1 }],
    lengthOf10Pockets: 80,
  },
];


