export type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface PopupProperties {
  id: string;
  title: string;
  contentComponent: React.ReactNode;
  defaultPosition: Position;
}

export type PopupProps = {
  onClose: (id: string) => void;
} & PopupProperties;

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
