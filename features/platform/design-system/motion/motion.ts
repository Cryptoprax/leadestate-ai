export const vdsMotion = Object.freeze({ overlay: "vds-overlay-enter", drawer: "vds-drawer-enter", modal: "vds-modal-enter", tooltip: "vds-tooltip-enter", dropdown: "vds-dropdown-enter", card: "vds-card-motion", hover: "vds-card-motion", loading: "vds-loading-motion", success: "vds-success-motion" } as const);
export type VdsMotionName = keyof typeof vdsMotion;
