export type Coords = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Position = Coords & Size;

export interface PopupProperties {
  id: string;
  title: string;
  contentComponent: React.ReactNode;
  defaultPosition: Position;
}

export type PopupProps = {
  onClose: (id: string) => void;
  windowPosition: Size | null;
} & Omit<PopupProperties, 'contentComponent'>;

export interface usePopupsProps {
  addPopup: (props: PopupProperties) => void;
  closePopup: (id: string) => void;
  closeAll: () => void;
}

export interface PopupProviderState {
  popups: PopupProperties[];
  add: (props: PopupProperties) => void;
  close: (id: string) => void;
  closeAll: () => void;
}
