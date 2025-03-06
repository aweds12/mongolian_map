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

export function DrawMap(name: string, colors?: Colors) {
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
    SvgElement.appendChild(SvgGroupElement);
  }

  SvgWrapper.appendChild(SvgElement);

  return SvgWrapper;
}

export const createSvgGroup = (reg: Region) => {
  const SvgGroupElement = document.createElement("g");

  SvgGroupElement.setAttribute("id", `region_${reg.name}`);

  for (let i in reg.aimag) {
    const SvgGroupElement = createSvgPath(reg, reg.aimag[i]);
    SvgGroupElement.appendChild(SvgGroupElement);
  }

  return SvgGroupElement;
};

export const createSvgPath = (reg: Region, aimag: Province) => {
  const SvgPathElement = document.createElement("path");

  SvgPathElement.setAttribute("d", aimag.path);
  SvgPathElement.setAttribute("name", aimag.name);
  SvgPathElement.setAttribute("stroke", "#FFF");
  SvgPathElement.setAttribute("stroke-width", "2");
  SvgPathElement.setAttribute(
    "fill",
    !!customColors.length
      ? customColors[reg.id - 1]
      : defaultColors(reg.id) +
          (!!SelectedProvince?.id
            ? SelectedProvince?.id !== aimag.id
              ? "7F"
              : "FF"
            : "FF")
  );
  SvgPathElement.style.transition = "200ms";
  SvgPathElement.style.transitionProperty =
    "color, background-color, border-color, text-decoration-color, fill, stroke";
  SvgPathElement.addEventListener("click", () => SelectedThisPlace(reg, aimag));

  return SvgPathElement;
};

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
