import { z, ZodType } from "zod";
import { WorkerPageFormType } from ".";

export const CommonFormSchema = z.object({
  pallets: z.boolean().default(false).optional(),
  scotchTape: z.boolean().default(false).optional(),
  whiteBraid: z.boolean().default(false).optional(),
  blackBelt: z.boolean().default(false).optional(),
  whiteBelt: z.boolean().default(false).optional(),
  paperLining90: z.boolean().default(false).optional(),
  paperLining101: z.boolean().default(false).optional(),
  cartonBox80: z.boolean().default(false).optional(),
  cartonBox90: z.boolean().default(false).optional(),
  cartonBox120: z.boolean().default(false).optional(),
  cartonBox140: z.boolean().default(false).optional(),
  cartonBox160: z.boolean().default(false).optional(),
  cartonBox180: z.boolean().default(false).optional(),
  downPaperXFirm: z.boolean().default(false).optional(),
  downPaperVagstranda: z.boolean().default(false).optional(),
  upPaperCommon: z.boolean().default(false).optional(),
  upPaperVagstranda: z.boolean().default(false).optional(),
  stretch: z.boolean().default(false).optional(),
  nylon8090: z.boolean().default(false).optional(),
  nylon120140: z.boolean().default(false).optional(),
  nylon160: z.boolean().default(false).optional(),
  nylon180: z.boolean().default(false).optional(),
  separateSkarer: z.boolean().default(false).optional(),
  triangularCartonSkarer: z.boolean().default(false).optional(),
  paperLiningSkarer8090: z.boolean().default(false).optional(),
  paperLiningSkarer105: z.boolean().default(false).optional(),
  paperLiningSkarer120140: z.boolean().default(false).optional(),
  paperLiningSkarer160: z.boolean().default(false).optional(),
  separateSnarum: z.boolean().default(false).optional(),
  triangularCartonSnarum: z.boolean().default(false).optional(),
  paperLiningSnarum8090: z.boolean().default(false).optional(),
  paperLiningSnarum120140: z.boolean().default(false).optional(),
  paperLiningSnarum160: z.boolean().default(false).optional(),
  separateSkotterud: z.boolean().default(false).optional(),
  triangularCartonSkotterud: z.boolean().default(false).optional(),
  paperLiningSkotterud8090: z.boolean().default(false).optional(),
  paperLiningSkotterud120140: z.boolean().default(false).optional(),
});

export const L10FormSchema = z.object({
  pallets: z.boolean().default(false).optional(),
  scotchTape: z.boolean().default(false).optional(),
  whiteBraid: z.boolean().default(false).optional(),
  blackBelt: z.boolean().default(false).optional(),
  whiteBelt: z.boolean().default(false).optional(),
  paperLining90: z.boolean().default(false).optional(),
  paperLining101: z.boolean().default(false).optional(),
  cartonBox80: z.boolean().default(false).optional(),
  cartonBox90: z.boolean().default(false).optional(),
  cartonBox120: z.boolean().default(false).optional(),
  cartonBox140: z.boolean().default(false).optional(),
  cartonBox160: z.boolean().default(false).optional(),
  cartonBox180: z.boolean().default(false).optional(),
  downPaperXFirm: z.boolean().default(false).optional(),
  downPaperVagstranda: z.boolean().default(false).optional(),
  upPaperCommon: z.boolean().default(false).optional(),
  upPaperVagstranda: z.boolean().default(false).optional(),
  stretch: z.boolean().default(false).optional(),
  nylon8090: z.boolean().default(false).optional(),
  nylon120140: z.boolean().default(false).optional(),
  nylon160: z.boolean().default(false).optional(),
  nylon180: z.boolean().default(false).optional(),
});

export const L1L2FormSchema = z.object({
  pallets: z.boolean().default(false).optional(),
  scotchTape: z.boolean().default(false).optional(),
  whiteBraid: z.boolean().default(false).optional(),
  blackBelt: z.boolean().default(false).optional(),
  whiteBelt: z.boolean().default(false).optional(),
  paperLining90: z.boolean().default(false).optional(),
  upPaperCommon: z.boolean().default(false).optional(),
});

export const L5FormSchema = z.object({
  pallets: z.boolean().default(false).optional(),
  scotchTape: z.boolean().default(false).optional(),
  whiteBraid: z.boolean().default(false).optional(),
  separateSkarer: z.boolean().default(false).optional(),
  triangularCartonSkarer: z.boolean().default(false).optional(),
  paperLiningSkarer8090: z.boolean().default(false).optional(),
  paperLiningSkarer105: z.boolean().default(false).optional(),
  paperLiningSkarer120140: z.boolean().default(false).optional(),
  paperLiningSkarer160: z.boolean().default(false).optional(),
  separateSnarum: z.boolean().default(false).optional(),
  triangularCartonSnarum: z.boolean().default(false).optional(),
  paperLiningSnarum8090: z.boolean().default(false).optional(),
  paperLiningSnarum120140: z.boolean().default(false).optional(),
  paperLiningSnarum160: z.boolean().default(false).optional(),
  separateSkotterud: z.boolean().default(false).optional(),
  triangularCartonSkotterud: z.boolean().default(false).optional(),
  paperLiningSkotterud8090: z.boolean().default(false).optional(),
  paperLiningSkotterud120140: z.boolean().default(false).optional(),
});

export const workerPageSchema: ZodType<WorkerPageFormType> = z.object({
  line: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      required_error: "Line is required.",
    }
  ),
  area: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      required_error: "Area is required.",
    }
  ),
});
