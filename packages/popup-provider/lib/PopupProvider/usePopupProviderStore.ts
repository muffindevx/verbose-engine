import { create } from 'zustand';
import type { PopupProviderState, PopupProperties } from './types';

const usePopupProviderStore = create<PopupProviderState>()((set) => ({
  popups: [],
  popupActiveId: '',
  add: (props: PopupProperties) => set((state) => ({ popups: state.popups.concat(props) })),
  closeAll: () => set(() => ({ popups: [] })),
  close: (id: string) =>
    set((state) => {
      const popupIndex = state.popups.findIndex((popup) => popup.id === id);
      state.popups.splice(popupIndex, 1);
      return {
        popups: state.popups,
      };
    }),
  setActive: (id: string) =>
    set(() => {
      return {
        popupActiveId: id,
      };
    }),
}));

export default usePopupProviderStore;
