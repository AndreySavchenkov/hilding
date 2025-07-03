export const formatOrderSource = (
  lineOptions: string,
  machineOptions?: string | null
) => {
  if (lineOptions === "CPS" && machineOptions) {
    return `CPS ${machineOptions}`;
  }

  if (lineOptions && !machineOptions) {
    return `CPW ${lineOptions}`;
  }

  return lineOptions;
};
