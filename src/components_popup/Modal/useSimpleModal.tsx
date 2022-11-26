import { atom, useAtom } from 'jotai';

const isOpenAtom = atom(false);

export const useSimpleModal = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
};
