import IUnit from "../interfaces/unit.interface";

const units: IUnit[] = [
  { name: "wei", decimals: 18 },
  { name: "kwei", decimals: 15 },
  { name: "mwei", decimals: 12 },
  { name: "gwei", decimals: 9 },
  { name: "szabo", decimals: 6 },
  { name: "finney", decimals: 3 },
  { name: "ether", decimals: 0 },
];

const getUnitByDecimal = (decimals: number): IUnit | undefined => {
  return units.find((unit) => unit.decimals === decimals);
};

export default { getUnitByDecimal };
