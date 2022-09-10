import { RealState } from "./interfaces";

export function getCities(data: RealState[]): RealState["city"][] {
  let extractedCities: RealState["city"][] = [];

  extractedCities = data.reduce((prev: RealState["city"][], curr: RealState) => {
    if (prev.indexOf(curr.city) === -1) prev.push(curr.city);

    return prev;
  }, []).sort((a: RealState["city"], b: RealState["city"]) => a > b ? 1 : -1);

  return extractedCities;
}