import { useCallback, useState } from "react";

interface UseModal<T = null> {
  isOpen: boolean;
  data: T | null;
  openModal: (data?: T) => void;
  closeModal: () => void;
  toggleModal: (data?: T) => void;
}

/**
 * Custom hook for managing a modal's open and close state with optional data.
 * @returns {UseModal} - Modal state, data, and control functions.
 */
const useModal = <T = null>(): UseModal<T> => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const openModal = useCallback((data?: T) => {
    setIsOpen(true);
    setData(data || null);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  const toggleModal = useCallback(
    (data?: T) => {
      setIsOpen((prev) => !prev);
      if (!isOpen) setData(data || null);
      else setData(null);
    },
    [isOpen]
  );

  return {
    isOpen,
    data,
    openModal,
    closeModal,
    toggleModal,
  };
};

export default useModal;
