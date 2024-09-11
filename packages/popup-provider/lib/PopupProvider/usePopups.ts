import RandomNumber from './random';
import type { PopupProperties } from './types';
import usePopupProviderStore from './usePopupProviderStore';

export default function usePopups() {
  const { add, close, closeAll } = usePopupProviderStore();

  function addPopup(properties: Omit<PopupProperties, 'id'>) {
    const id = RandomNumber.generateRandomString(64);
    add({
      ...properties,
      id,
    });
  }

  function closePopup(id: string) {
    close(id);
  }

  return {
    addPopup,
    closeAll,
    closePopup,
  };
}
