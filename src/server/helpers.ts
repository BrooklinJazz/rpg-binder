import { Document } from "mongoose";

export const toObject = (found: Document []| Document | null) => {
  if (!found) {
    throw new Error("ApplicationException: Model not found");
  }
  if (Array.isArray(found)) {
      return found.map(document => document.toObject);
  }
  return (found as Document).toObject();
};