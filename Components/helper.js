import {
  INPUT_INITIAL_PLACEHOLDER,
  headingPlaceholderStylesConfig,
  normalTextPlaceholderStylesConfig
} from '../constants.js'

let inputBuildElementState = false

const setInputConfig = (el, value, { height, fontSize, placeHolder }) => {
  el.style.height = height;
  el.style.fontSize = fontSize;
  el.setAttribute("placeholder", placeHolder);
  el.value = value.substring(2);
};

const resetInputConfig = (el) => {
  el.style.height = "20px";
  el.style.fontSize = "12px";
  el.value = "";
  el.setAttribute("placeholder", INPUT_INITIAL_PLACEHOLDER);
};

const getHeadingElement = (value) => {
  const headingElement = document.createElement("h1");
  headingElement.appendChild(document.createTextNode(value));
  return headingElement;
};

const getNormalTextElement = (value) => {
  const normalTextElement = document.createElement("p");
  normalTextElement.appendChild(document.createTextNode(value));
  return normalTextElement;
};

//Sets input styles configurations
const setInputStylesConfig = (
  inputElement,
  DOMContentHasHeading,
  value,
) => {
    if (RegExp("^/1+[A-Za-z0-9]").test(value)) {
        inputBuildElementState = true;
    if (DOMContentHasHeading) {
      headingPlaceholderStylesConfig.forEach((itemConfig) => {
        setInputConfig(inputElement, value, itemConfig);
      });
    } else {
      normalTextPlaceholderStylesConfig.forEach((itemConfig) => {
        setInputConfig(inputElement, value, itemConfig);
      });
    }
  }
};

//Creates text elements when hitting enter/return
const createElements = (inputElement, DOMContentHasHeading, value, code, DOMContent, inputWrapper) => {
    if (code === "Enter" && value.length > 0 && inputBuildElementState) {
      if (DOMContentHasHeading) {
        DOMContent.insertBefore(getHeadingElement(value), inputWrapper);
        resetInputConfig(inputElement);
      } else {
        DOMContent.insertBefore(getNormalTextElement(value), inputWrapper);
        resetInputConfig(inputElement);
      }
      inputBuildElementState = false
    }
  };

  const clearInput = (inputElement, { code, target: { value } }) => {
    if (!value && code === "Backspace") {
      resetInputConfig(inputElement);
      inputBuildElementState = false;
    }
  };

  const toogleDropdown = (value, dropdownElement) => {
    if (value === "/1") {
      dropdownElement.classList.remove("display-none");
    }  else {
      dropdownElement.classList.add("display-none");
    }
  };

export {
  setInputStylesConfig,
  createElements,
  getNormalTextElement,
  getHeadingElement,
  resetInputConfig,
  setInputConfig,
  clearInput,
  toogleDropdown
};
