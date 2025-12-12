const Calculate = (
  Tday: number | null | undefined,
  GS: number | null | undefined,
  Tl: number | null | undefined,
  Tseason: number | null | undefined,
  dayParameters: { Td: number | null | undefined; DT: number | null | undefined}[],
  ecologicalFactorsCount: number,
  managementFactorsCount: number,
) => {
  let BCC = 0;
  if (
    Tday != undefined &&
    GS != undefined &&
    Tl != undefined &&
    Tseason != undefined
  ) {
    for (const day of dayParameters) {
      if (day.DT != undefined && day.Td != undefined) {
        let DG = 0;
        if (day.DT <= 15) {
          DG = 0.5;
        } else if (day.DT <= 50) {
          DG = 1;
        } else {
          DG = 2;
        }
        const Vp = day.DT / day.Td;
        const gp = 1 + (Vp * (Tday - day.Td)) / DG;
        BCC += gp * GS * (Tseason / Tl);
        console.log(Tday, GS, Tl, Tseason, day.Td, day.DT, ecologicalFactorsCount, managementFactorsCount)
      }
    }
  }
  const PCC = BCC * Math.max(0.1, 1 - ecologicalFactorsCount / 13);
  const RCC = PCC * Math.max(0.1, managementFactorsCount / 5);
  return {
    resultBCC: Math.round(BCC),
    resultPCC: Math.round(PCC),
    resultRCC: Math.round(RCC),
  };
};

export { Calculate };
