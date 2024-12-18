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

  { name: "VATNESTRÖM MEDIUM 800", number: "904.764.18" },
  { name: "VATNESTRÖM MEDIUM 900", number: "104.764.22" },
  { name: "VATNESTRÖM MEDIUM 1400", number: "504.764.01" },
  { name: "VATNESTRÖM MEDIUM 1600", number: "204.764.07" },
  { name: "VATNESTRÖM MEDIUM 1800", number: "804.764.14" },

  { name: "VATNESTRÖM FIRM 800", number: "304.764.16" },
  { name: "VATNESTRÖM FIRM 900", number: "704.764.19" },
  { name: "VATNESTRÖM FIRM 1400", number: "104.763.99" },
  { name: "VATNESTRÖM FIRM 1600", number: "904.764.04" },
  { name: "VATNESTRÖM FIRM 1800", number: "604.764.10" },

  { name: "VATNESTRÖM EXTRA 900", number: "204.784.87" },
  { name: "VATNESTRÖM EXTRA 1400", number: "504.784.76" },
  { name: "VATNESTRÖM EXTRA 1600", number: "904.784.79" },
  { name: "VATNESTRÖM EXTRA 1800", number: "304.784.82" },

  { name: "VATNESTRÖM FIRM EG 1600", number: "" },
  { name: "VATNESTRÖM FIRM EG 1800", number: "" },

  { name: "VATNESTRÖM EXTRA EG 1600", number: "" },
  { name: "VATNESTRÖM EXTRA EG 1800", number: "" },
];