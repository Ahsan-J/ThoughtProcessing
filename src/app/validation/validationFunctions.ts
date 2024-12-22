import { ValidationFunction } from "@/core/types/validation.types"
import { alphaNumRegex, alphabetRegex, emailRegex, numberRegex, specialCharacterRegex } from "@/core/utility/regex.util"
import { deepEquals, isBrowser } from "@/core/utility/collection.util"

export function isEmail(message?: string): ValidationFunction {
  return (value: unknown) => {
    if (typeof value != 'string' || !emailRegex.test(value)) return message ?? ""
    return true
  }
}

export function isString(message?: string): ValidationFunction {
  return (value: unknown) => {
    if (typeof value !== "string") return message ?? ""
    return true
  }
}

export function isEmpty(message?: string) {
  return (value: unknown) => {
    if (value !== "") return message ?? ""
    return true
  }
}

export function isMax(maxValue: number | string, message?: string): ValidationFunction {

  return (value: unknown, data) => {
    let max: number = parseInt(`${maxValue}`.replaceAll(',', ''), 10);

    if (data && typeof data == "object" && maxValue in data && numberRegex.test(`${data[maxValue as keyof typeof data]}`)) {
      max = parseInt(`${data[maxValue as keyof typeof data]}`, 10);
    }

    const isNumber = numberRegex.test(`${value}`.replaceAll(",", ""));

    if (isNumber && parseFloat(`${value}`.replaceAll(",", "")) <= max) return true;
    if ((Array.isArray(value) || (typeof value == "string" && !isNumber)) && value.length <= max) return true;
    return message ?? ""
  }
}

export function isMin(minValue: number | string, message?: string): ValidationFunction {
  return (value: unknown, data) => {
    let min: number = parseInt(`${minValue}`.replaceAll(',', ''), 10);

    if (data?.[minValue as keyof typeof data] && numberRegex.test(`${data[minValue as keyof typeof data]}`)) {
      min = parseInt(`${data[minValue as keyof typeof data]}`, 10)
    }

    const isNumber = numberRegex.test(`${value}`.replaceAll(",", ""));

    if (isNumber && parseFloat(`${value}`.replaceAll(",", "")) >= min) return true;
    if ((Array.isArray(value) || (typeof value == "string" && !isNumber)) && value.length >= min) return true;
    return message ?? ""
  }
}

export function isAlphaNumeric(message?: string): ValidationFunction {
  return (value: unknown) => {
    if (!(typeof value == 'string' || (typeof value == 'number' && !isNaN(value))) || !(alphaNumRegex.test(`${value}`))) return message ?? ""
    return true
  }
}

export function isNumeric(message?: string, minLimit = 0): ValidationFunction {
  return (value: unknown) => {
    const numbers = `${value}`.match(/[0-9]/g) || [];
    if (minLimit > 0 && numbers.length >= minLimit) return true;
    if ((typeof value == "number" && !isNaN(value)) || numberRegex.test((`${value}`).replaceAll(',', ''))) return true;
    return message ?? ""
  }
}

export function isLowerCase(message?: string, minLimit = 0): ValidationFunction {
  return (value: unknown) => {
    if (typeof value != 'string' || (!minLimit && value.toLowerCase() != value)) return message ?? ""
    const lowercaseLetters = value.match(/[a-z]/g) || [];
    if (minLimit > 0 && lowercaseLetters.length < minLimit) return message ?? ""
    return true
  }
}

export function isUpperCase(message?: string, minLimit = 0): ValidationFunction {
  return (value: unknown) => {
    if (typeof value != 'string' || (!minLimit && value.toUpperCase() != value)) return message ?? ""
    const uppercaseLetters = value.match(/[A-Z]/g) || [];
    if (minLimit > 0 && uppercaseLetters.length < minLimit) return message ?? ""
    return true
  }
}

export function isAlphabet(message?: string, minLimit = 0): ValidationFunction {
  return (value: unknown) => {
    const alphabets = `${value}`.match(/[a-z]/gi) || [];
    if (minLimit > 0 && alphabets.length >= minLimit) return true;
    if (typeof value !== 'string' || !alphabetRegex.test(value)) return message ?? "";
    return true
  }
}

export function isSpecialCharacter(message?: string, minLimit = 0) {
  return (value: unknown) => {
    const specialCharacters = `${value}`.match(specialCharacterRegex) || [];
    if (minLimit > 0 && specialCharacters.length >= minLimit) return true;
    if (typeof value !== 'string' || !new RegExp(`^(${specialCharacterRegex.source})+$`, "g").test(value)) return message ?? "";
    return true
  }
}

export function isMatchingRegex(regex: RegExp, message?: string): ValidationFunction {
  return (value: unknown) => {
    if (!regex.test(`${value}`)) return message ?? ""
    return true
  }
}

export function isEqual(match: unknown, message?: string): ValidationFunction {
  return (value: typeof match) => {
    if (!deepEquals(value, match)) return message ?? ""
    return true;
  }
}

export function isBoolean(message?: string): ValidationFunction {
  return (value: unknown) => {
    if (typeof value != "boolean") return message ?? ""
    return true
  }
}

export function isBlob(message?: string): ValidationFunction {
  return (value: unknown) => {

    if (isBrowser() && !(value instanceof File || value instanceof Blob)) return message ?? "";
    // if (!(value && typeof value == "object" && "arrayBuffer" in value && "size" in value)) return message ?? "";
    return true
  }
}

export function isArray(message?: string): ValidationFunction {
  return (value: unknown) => {
    if (!Array.isArray(value)) return message ?? "";
    return true
  }
}

export function isRequired(message?: string): ValidationFunction {
  return (value: unknown) => {
    if (!value) return message ?? "";
    return true
  }
}

export function isMemberOf(list: unknown[], message?: string) {
  const convertedList = list.map(v => numberRegex.test(`${v}`) ? parseInt(`${v}`, 10) : v);
  return (value: unknown) => {
    if (!convertedList.includes(value)) return message ?? "";
    return true;
  }
}
