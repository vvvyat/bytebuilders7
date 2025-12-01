const Calculate = (
  Tday: number | null | undefined,
  GS: number | null | undefined,
  Tl: number | null | undefined,
  Tseason: number | null | undefined,
  Td: number | null | undefined,
  DT: number | null | undefined,
  ecologicalFactorsCount: number,
  managementFactorsCount: number,
) => {
  if (
    Tday != undefined &&
    GS != undefined &&
    Tl != undefined &&
    Tseason != undefined &&
    Td != undefined &&
    DT != undefined
  ) {
    let DG = Number.EPSILON;
    if (DT <= 15) {
      DG = 0.5;
    } else if (DT <= 50) {
      DG = 1;
    } else {
      DG = 2;
    }
    const Vp = DT / Td;
    const gp = 1 + (Vp * (Tday - Td)) / DG;
    const BCC = gp * GS * (Tseason / Tl);

    const PCC = BCC * Math.max(0.1, 1 - ecologicalFactorsCount / 13);
    const RCC = PCC * Math.max(0.1, managementFactorsCount / 5);
    return {resultBCC: Math.round(BCC), resultPCC: Math.round(PCC), resultRCC: Math.round(RCC)};
  }
};

export { Calculate };
