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

type Expression = keyof typeof FUNC_EXP

class SieveGen {
  value: string | number;

  constructor(private exp: Expression, v: (string | number)[] | string | number) {
    this.validateExp(exp);

    if(v instanceof Array) {
      this.value = v.join('|');
    } else {
      this.value = v;
    }
  }

  private validateExp(exp: Expression) {
    if (!(exp in FUNC_EXP)) throw new Error("Invalid Sieve operation")
  }

  generate(v: (string|number)[] | string | number = this.value) {
    if(v instanceof Array) {
      v = v.join('|');
    }
    if(v && v != undefined) {
      return `${FUNC_EXP[this.exp]}${v}`.trimEnd();
    }
    return "";
  }
}

export const Match = (v: (string | number)[] | string | number) => new SieveGen("match", v);
export const NotMatch = (v: (string | number)[] | string | number) => new SieveGen("not_match", v);
export const Contains = (v: (string | number)[] | string | number) => new SieveGen("contains", v);
export const Equals = (v: (string | number)[] | string | number) => new SieveGen("equals", v);
export const NotEquals = (v: (string | number)[] | string | number) => new SieveGen("not_equals", v);
export const GreaterThan = (v: (string | number)[] | string | number) => new SieveGen("greater_than", v);
export const LessThan = (v: (string | number)[] | string | number) => new SieveGen("less_than", v);
export const GreaterThanOrEqual = (v: (string | number)[] | string | number) => new SieveGen("greater_than_or_equal", v);
export const LessThanOrEqual = (v: (string | number)[] | string | number) => new SieveGen("less_than_or_equal", v);
export const StartsWith = (v: (string | number)[] | string | number) => new SieveGen("starts_with", v);
export const NotContains = (v: (string | number)[] | string | number) => new SieveGen("not_contains", v);
export const NotStartsWith = (v: (string | number)[] | string | number) => new SieveGen("not_starts_with", v);

export const generateFilterQuery = (items?: Record<string, SieveGen>): string | undefined => {
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

export const generateSortQuery = (items: Record<string, "asc" | "desc"> = {}): string | undefined => {
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
