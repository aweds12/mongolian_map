import { createSvgGroup } from "./create-elements";
import { MapData, SelectedProvince, SelectedThisPlace, viewBox } from "./map";
import { Province, Region } from "./schema";

export type Colors = {
  khangai: string;
  east: string;
  west: string;
  north: string;
  tuv: string;
  gobi: string;
  capital: string;
};

export let customColors: string[] = [];

export function DrawMap(colors?: Colors) {
  customColors = colors ? Object.values(colors) : [];
  const SvgWrapper = document.createElement("div");

  SvgWrapper.style.position = "absolute";
  SvgWrapper.style.top = "0";
  SvgWrapper.style.left = "0";
  SvgWrapper.style.height = "100%";
  SvgWrapper.style.width = "100%";
  SvgWrapper.style.display = "flex";
  SvgWrapper.style.justifyContent = "center";
  SvgWrapper.style.alignItems = "center";
  SvgWrapper.style.objectFit = "contain";
  SvgWrapper.style.objectPosition = "center";

  const SvgElement = document.createElement("svg");

  SvgElement.setAttribute("xmlns", "https://www.w3.org/2000/svg");
  SvgElement.setAttribute("stroke-linecap", "round");
  SvgElement.setAttribute("stroke-linejoin", "round");
  SvgElement.setAttribute("version", "1.2");
  SvgElement.setAttribute("viewBox", `0 0 ${viewBox().x} ${viewBox().y}`);
  SvgElement.setAttribute("preserveAspectRatio", "xMinYMin");
  SvgElement.setAttribute("data-originalStrokeWidth", ".25");
  SvgElement.style.maxHeight = "100%";
  SvgElement.style.maxWidth = "100%";
  SvgElement.style.width = "auto";
  SvgElement.style.padding = "1rem";

  for (let i in MapData) {
    const SvgGroupElement = createSvgGroup(MapData[i]);
    console.log("g element created");

    SvgElement.appendChild(SvgGroupElement);
    console.log("g appended to svg");
  }

  SvgWrapper.appendChild(SvgElement);

  console.log("svg wrapped", SvgWrapper);
  return SvgWrapper;
}

export const defaultColors = (id: number) => {
  switch (id) {
    case 1:
      return "#EF8B00";
    case 2:
      return "#0095FF";
    case 3:
      return "#FF5454";
    case 4:
      return "#FFBC02";
    case 5:
      return "#FF3EBF";
    case 6:
      return "#0048FF";
    default:
      return "#9900FF";
  }
};
