import { between } from ".";

interface ICalc {
  count: number;
  resultCalc: string;
}

const calc = (weight: number, height: number): ICalc => {
  const count = Math.round((weight / Math.pow(height, 2)) * 100000) / 10;

  let resultCalc = "";

  if (count < 18.5) resultCalc = "abaixo do peso";
  else if (between(count, 18.5, 24.9)) resultCalc = "com o peso normal";
  else if (between(count, 25, 29.9)) resultCalc = "sobrepeso";
  else if (between(count, 30, 34.9)) resultCalc = "com obesidade grau I";
  else if (between(count, 35, 39.9)) resultCalc = "com obesidade grau II";
  else if (count >= 40) resultCalc = "com obesidade grau III ou Mórbida";

  return { count, resultCalc };
};

export { calc };
