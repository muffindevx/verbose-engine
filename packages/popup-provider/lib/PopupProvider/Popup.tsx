import { Rnd } from 'react-rnd';
import type { PopupProps } from './types';
import { memo, type PropsWithChildren } from 'react';

const Popup = ({
  id,
  title,
  children,
  defaultPosition,
  onClose,
}: PropsWithChildren<PopupProps>) => {
  // const parentRef = useRef(ref);

  function handleClose() {
    onClose(id);
  }

  return (
    <Rnd
      default={{
        width: defaultPosition.width ?? 150,
        height: defaultPosition.height ?? 150,
        x: defaultPosition.x ?? 0,
        y: defaultPosition.y ?? 0,
      }}
      enableResizing={false}
      bounds="parent"
      key={id}
    >
      <div
        className="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm  dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
        style={{
          width: defaultPosition.width ?? 150,
          height: defaultPosition.height ?? 150,
        }}
      >
        <header className="flex justify-between items-center px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </header>

        <div className="p-4 md:p-5 space-y-4">{children}</div>
      </div>
    </Rnd>
  );
};

Popup.displayName = 'Popup';

const MemoizePopup = memo(Popup);

export default MemoizePopup;
