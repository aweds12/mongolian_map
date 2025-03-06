import { customColors, defaultColors } from ".";
import { SelectedProvince, SelectedThisPlace } from "./map";
import { Region, Province } from "./schema";

export const createSvgGroup = (reg: Region) => {
  const SvgGroupElement = document.createElement("g");

  SvgGroupElement.setAttribute("id", `region_${reg.name}`);

  for (let i in reg.aimag) {
    const SvgPathElement = createSvgPath(reg, reg.aimag[i]);
    SvgGroupElement.appendChild(SvgPathElement);
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
