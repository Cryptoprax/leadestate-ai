import type { PropertyAsset, PropertySnapshot } from "../domain/models";

export function propertyGroups(snapshot: PropertySnapshot) {
  return [
    "available",
    "reserved",
    "under-negotiation",
    "sold",
    "inactive",
    "archived",
  ].map((status) => ({
    status,
    items: snapshot.properties.filter((item) => item.status === status),
  }));
}

export function formatPropertyPrice(property: PropertyAsset) {
  return property.price === undefined
    ? "Price unavailable"
    : new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: property.currency,
        maximumFractionDigits: 0,
      }).format(property.price);
}

export function propertyTypeLabel(value: string) {
  return value.replaceAll("-", " ");
}
