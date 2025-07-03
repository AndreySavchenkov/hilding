import { LinesEnum } from "../types";

export function getOrderOptions(
  userId?: string,
  area?: string | null,
  line?: string | null,
  machine?: string | null,
  data?: any
) {
  const baseFields = {
    createdById: userId,
    areaOptions: area,
    lineOptions: line,
    machineOptions: machine,
    pallets: data?.pallets,
    scotchTape: data?.scotchTape,
    whiteBraid: data?.whiteBraid,
  };

  if (machine) {
    return {
      ...baseFields,
      lineOptions: "CPS",
      pallets8090: data?.pallets8090,
      pallets120140: data?.pallets120140,
      pallets160: data?.pallets160,
      pallets180: data?.pallets180,
      wire16: data?.wire16,
      wire17: data?.wire17,
      wire18: data?.wire18,
      wire19: data?.wire19,
      wire20: data?.wire20,
      wire21: data?.wire21,
      flizelin450: data?.flizelin450,
      flizelin500: data?.flizelin500,
      flizelinTopDown: data?.flizelinTopDown,
      needReplaceWire: data?.needReplaceWire,
      needReplaceFlizelin: data?.needReplaceFlizelin,
    };
  }

  switch (line) {
    case LinesEnum.L1:
    case LinesEnum.L2:
      return {
        ...baseFields,
        blackBelt: data?.blackBelt,
        whiteBelt: data?.whiteBelt,
        paperLining90: data?.paperLining90,
        upPaperCommon: data?.upPaperCommon,
      };

    case LinesEnum.L5:
      return {
        ...baseFields,
        separateSkarer: data?.separateSkarer,
        triangularCartonSkarer: data?.triangularCartonSkarer,
        paperLiningSkarer8090: data?.paperLiningSkarer8090,
        paperLiningSkarer105: data?.paperLiningSkarer105,
        paperLiningSkarer120140: data?.paperLiningSkarer120140,
        paperLiningSkarer160: data?.paperLiningSkarer160,
        separateSnarum: data?.separateSnarum,
        triangularCartonSnarum: data?.triangularCartonSnarum,
        paperLiningSnarum8090: data?.paperLiningSnarum8090,
        paperLiningSnarum120140: data?.paperLiningSnarum120140,
        paperLiningSnarum160: data?.paperLiningSnarum160,
        separateSkotterud: data?.separateSkotterud,
        triangularCartonSkotterud: data?.triangularCartonSkotterud,
        paperLiningSkotterud8090: data?.paperLiningSkotterud8090,
        paperLiningSkotterud120140: data?.paperLiningSkotterud120140,
      };

    case LinesEnum.L10:
      return {
        ...baseFields,
        blackBelt: data?.blackBelt,
        whiteBelt: data?.whiteBelt,
        paperLining90: data?.paperLining90,
        paperLining101: data?.paperLining101,
        cartonBox80: data?.cartonBox80,
        cartonBox90: data?.cartonBox90,
        cartonBox120: data?.cartonBox120,
        cartonBox140: data?.cartonBox140,
        cartonBox160: data?.cartonBox160,
        cartonBox180: data?.cartonBox180,
        downPaperXFirm: data?.downPaperXFirm,
        downPaperVagstranda: data?.downPaperVagstranda,
        upPaperCommon: data?.upPaperCommon,
        upPaperVagstranda: data?.upPaperVagstranda,
        stretch: data?.stretch,
        nylon8090: data?.nylon8090,
        nylon120140: data?.nylon120140,
        nylon160: data?.nylon160,
        nylon180: data?.nylon180,
      };

    default:
      return baseFields;
  }
}
