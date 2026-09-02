export class PageNotFoundError extends Error {}
export function throwPageNotFound(): never { throw new PageNotFoundError(); }
