export type KioskConfig = {
  style: Style;
  meta: Meta;
  widgets: WidgetConfig[];
};

export type KioskNotification = {
  status: KioskStatus;
  webhookUrl: string;
  webhookEnabled: boolean;
  emailEnabled: boolean;
};

export enum KioskStatus {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  UNKNOWN = 'UNKNOWN',
}

export const KioskStatusTranslation: Record<KioskStatus, string> = {
  [KioskStatus.CONNECTED]: 'Kapcsolódva',
  [KioskStatus.DISCONNECTED]: 'Megszakadt',
  [KioskStatus.UNKNOWN]: 'Ismeretlen',
};

export type Coordinates = {
  lat: string;
  lon: string;
};

export type Meta = {
  coordinates: Coordinates;
  name: string;
};

export type Style = {
  mode: keyof ColorModeColor;
  colors: ColorsWithScheme;
};

export type ColorNames = 'brand' | 'background' | 'tile' | 'fontPrimary' | 'fontSecondary';

export type ColorsWithScheme = {
  [name in ColorNames]: ColorModeColor;
};

export type Colors = {
  [name in ColorNames]: string;
};

export type ColorModeColor = {
  light: string;
  dark: string;
};

export type WidgetName = 'weather' | 'schpincer' | 'custom' | 'image' | 'qr' | 'departures' | 'bike';

export type WidgetConfigBase = {
  name: WidgetName;
  grid: GridSettings;
};

export interface WeatherConfig extends WidgetConfigBase {
  name: 'weather';
  apiKey: string;
}

export interface SchpincerConfig extends WidgetConfigBase {
  name: 'schpincer';
  apiKey: string;
}

export interface CustomConfig extends WidgetConfigBase {
  name: 'custom';
  title: string;
  subtitle: string;
}

export interface ImageConfig extends WidgetConfigBase {
  name: 'image';
  url: string;
}

export interface QRConfig extends WidgetConfigBase {
  name: 'qr';
  message: string;
  label: string;
}

export interface DeparturesConfig extends WidgetConfigBase {
  name: 'departures';
  radius: number;
}

export interface BikeConfig extends WidgetConfigBase {
  name: 'bike';
}

export type GridSettings = {
  column: Axis;
  row: Axis;
};

type Axis = {
  start: number;
  end: number;
};

export type WidgetConfig =
  | WeatherConfig
  | SchpincerConfig
  | CustomConfig
  | ImageConfig
  | QRConfig
  | DeparturesConfig
  | BikeConfig;

export enum KioskRoles {
  VISITOR,
  MARKETING,
  EDITOR,
  OWNER,
}
