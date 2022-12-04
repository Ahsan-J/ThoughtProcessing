const FUNC_EXP = {
  match: "@==",
  not_match: "!@==",
  equals: "==",
  not_equals: "!=",
  greater_than: ">",
  less_than: ">",
  greater_than_or_equal: ">=",
  less_than_or_equal: "<=",
  contains: "@=",
  starts_with: "_=",
  not_contains: "!@=",
  not_starts_with: "!_=",
};

export type Expression = keyof typeof FUNC_EXP 

export interface ISieveGen {
  value: string | number;
  exp: Expression;
  generate: (v: string | number) => string;
  setExp: (exp: Expression) => Expression;
}

class SieveGen implements ISieveGen {
  value: string | number;
  exp: Expression = "equals";

  constructor(exp: Expression, v: Array<string | number> | string | number) {
    this.setExp(exp);
    if(v instanceof Array) {
      this.value = v.join('|');
    } else {
      this.value = v;
    }
  }

  setExp(exp: Expression) {
    if (FUNC_EXP[exp]) {
      return this.exp = exp;
    }
    throw new Error("Invalid Sieve operation")
  }

  generate(v: Array<string|number> | string | number = this.value) {
    if(v instanceof Array) {
      v = v.join('|');
    }
    if(v && v != undefined) {
      return `${FUNC_EXP[this.exp]}${v}`.trimEnd();
    }
    return "";
  }
}
export const Match = (v: Array<string | number> | string | number) => new SieveGen("match", v);
export const NotMatch = (v: Array<string | number> | string | number) => new SieveGen("not_match", v);
export const Contains = (v: Array<string | number> | string | number) => new SieveGen("contains", v);
export const Equals = (v: Array<string | number> | string | number) => new SieveGen("equals", v);
export const NotEquals = (v: Array<string | number> | string | number) => new SieveGen("not_equals", v);
export const GreaterThan = (v: Array<string | number> | string | number) => new SieveGen("greater_than", v);
export const LessThan = (v: Array<string | number> | string | number) => new SieveGen("less_than", v);
export const GreaterThanOrEqual = (v: Array<string | number> | string | number) => new SieveGen("greater_than_or_equal", v);
export const LessThanOrEqual = (v: Array<string | number> | string | number) => new SieveGen("less_than_or_equal", v);
export const StartsWith = (v: Array<string | number> | string | number) => new SieveGen("starts_with", v);
export const NotContains = (v: Array<string | number> | string | number) => new SieveGen("not_contains", v);
export const NotStartsWith = (v: Array<string | number> | string | number) => new SieveGen("not_starts_with", v);

export const generateFilterQuery = (items?: { [key in string]: SieveGen }): string | undefined => {
  if(!items) return undefined;
  return Object.keys(items)
    .map((k) => {
      const f = items[k];
      if (f instanceof SieveGen && f.generate()) {
        return `${k}${f.generate()}`
      }
      return null;
    })
    .filter(v => v)
    .join(",") || undefined;
};

export const generateSortQuery = (items: {[key in string]: "asc" | "desc"} = {}): string | undefined => {
  if(!items) return undefined;
  return Object.keys(items).map((key) => {
    const direction = items[key];
    switch(direction) {
      case "desc":
        return `-${key}`;
      case "asc":
      default:
        return `+${key}`
    }
  }).join(",") || undefined
}