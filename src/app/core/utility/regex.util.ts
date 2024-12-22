export const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const urlRegex = /^(https?:\/\/)(?!:\/\/)?(www\.)?([a-zA-Z0-9@:%._+~#=-])+\b([a-zA-Z0-9()@:%_+.~#?&//=-]*[a-zA-Z0-9])/
export const linkedinUrl = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/
export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;
export const alphaNumRegex = /([\w\d])+/;
export const oneUpperCaseRegex = /[A-Z]/;
export const oneNumberRegex = /\d/;
export const specialCharacterRegex = /[#?!@$%^&*-._=]/g;
export const noCharRegex = /^((?=[A-Za-z ])(?![_-]).)*$/;
export const numberRegex = /^[0-9]+$/;
export const colorHexRegex = /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i;
export const alphabetRegex = /^[A-Za-z\s._-]+$/;
export const ISOFormatRegex = /((\d{4})-([01]\d)-([0-3]\d)[T\s]?(?:([0-2]\d):([0-5]\d):([0-5]\d)(?:\.(\d{3}))?(Z)?)?)/;
