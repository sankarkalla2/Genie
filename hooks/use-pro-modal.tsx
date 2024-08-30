import { create } from "zustand";

interface UseProModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useProModal = create<UseProModalProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
