import { Rnd } from 'react-rnd';
import type { Coords, PopupProps, Size } from './types';
import { memo, useEffect, useRef, type PropsWithChildren, type RefObject } from 'react';

const useRecalculatePositionPopup = (
  ref: RefObject<HTMLDivElement>,
  windowPosition: Size | null,
) => {
  function getComputedPositionFrom(element: Element): Coords | null {
    const style = window.getComputedStyle(element);
    const matrix = style['transform'];
    const matrixType = matrix.includes('3d') ? '3d' : '2d';

    if (matrix) {
      const values = matrix?.match(/matrix.*\((.+)\)/);
      if (values && values.length >= 2 && values[1] && matrixType === '2d') {
        const matrixValues = values[1].split(', ');
        if (matrixValues && matrixValues[4] && matrixValues[5]) {
          return {
            x: parseFloat(matrixValues[4]),
            y: parseFloat(matrixValues[5]),
          };
        }
      }
    }

    return null;
  }

  useEffect(() => {
    if (windowPosition && ref.current) {
      const parent = ref.current.parentElement;
      const containerBoundaries = ref.current.parentElement?.parentElement?.getBoundingClientRect();
      const bounds = parent?.getBoundingClientRect();
      const threshold = 25;

      if (parent && bounds && containerBoundaries) {
        const { x = bounds.left, y = bounds.top } = getComputedPositionFrom(parent) ?? {};

        if (containerBoundaries.right < bounds.right) {
          const left = bounds.left - (bounds.right - containerBoundaries.right) - threshold;
          if (left > containerBoundaries.left) {
            parent.style.transform = `translate(${left}px, ${y}px)`;
          }
        }

        if (containerBoundaries.bottom < bounds.bottom) {
          const top = y - (bounds.bottom - containerBoundaries.bottom) - threshold;
          if (top > containerBoundaries.top) {
            parent.style.transform = `translate(${x}px, ${top}px)`;
          }
        }
      }
    }
  }, [windowPosition, ref]);
};

const Popup = ({
  id,
  title,
  children,
  defaultPosition,
  windowPosition,
  isActive = false,
  onClose,
  onActive,
}: PropsWithChildren<PopupProps>) => {
  const internalRef = useRef<HTMLDivElement>(null);
  useRecalculatePositionPopup(internalRef, windowPosition);

  function handleClose() {
    onClose(id);
  }

  function handleDragStart() {
    onActive(id);
  }

  return (
    <Rnd
      default={defaultPosition}
      enableResizing={false}
      bounds="parent"
      key={id}
      style={{
        zIndex: isActive ? 1 : 0,
      }}
      onDragStart={handleDragStart}
    >
      <div
        ref={internalRef}
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
