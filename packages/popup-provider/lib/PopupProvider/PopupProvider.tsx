import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import usePopups from './usePopups';
import Popup from './Popup';
import Button from '../Button/Button';
import usePopupProviderStore from './usePopupProviderStore';
import Utils from './utils';
import type { Size } from './types';

const MINIMUM_WINDOW_SIZE = {
  height: 150,
  width: 150,
};

export default function PopupProvider({ children }: { children: ReactNode }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const popups = usePopupProviderStore((state) => state.popups);
  const { addPopup, closePopup } = usePopups();
  const [windowPosition, setWindowPosition] = useState<Size | null>(null);

  useLayoutEffect(() => {
    const debouncedResize = Utils.debounce(function resize() {
      if (
        window.innerWidth > MINIMUM_WINDOW_SIZE.width ||
        window.innerHeight > MINIMUM_WINDOW_SIZE.height
      ) {
        setWindowPosition({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    });

    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, [parentRef]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClose = useCallback((id: string) => closePopup(id), []);

  function handleAddPopup() {
    addPopup({
      title: 'my popup A',
      defaultPosition: {
        height: 150,
        width: 150,
        x: 450,
        y: 250,
      },
      contentComponent: <div>Contenido del popup A</div>,
    });
  }

  function handleAddPopupB() {
    addPopup({
      title: 'my popup B',
      defaultPosition: {
        height: 250,
        width: 250,
        x: 250,
        y: 450,
      },
      contentComponent: <div>Contenido del popup B</div>,
    });
  }

  return (
    <div className="flex flex-col h-[100dvh]">
      <header className="flex h-16 px-3 justify-between items-center">
        <div>{children}</div>

        <div className="flex gap-4">
          <Button onClick={handleAddPopup}>Agregar Popup Tipo A</Button>
          <Button onClick={handleAddPopupB}>Agregar Popup Tipo B</Button>
        </div>
      </header>
      <div
        ref={parentRef}
        className="popup-container relative h-full w-full border-2 border-dotted rounded-sm border-gray-300 dark:border-gray-700"
      >
        {popups?.map((popup) => {
          return (
            <Popup
              key={popup.id}
              id={popup.id}
              defaultPosition={popup.defaultPosition}
              title={popup.title}
              onClose={handleClose}
              windowPosition={windowPosition}
            >
              {popup.contentComponent}
            </Popup>
          );
        })}
      </div>
    </div>
  );
}
