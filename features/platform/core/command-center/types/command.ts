export type CommandGroup =
  | "Recent Commands"
  | "Suggested Commands"
  | "Quick Actions"
  | "Recent Organizations"
  | "Recent Applications"
  | "Recent Users";

export interface Command {
  id: string;
  title: string;
  description: string;
  group: CommandGroup;
  shortcut?: string;
  iconName: string;
}
