import { atom, useAtom } from 'jotai';
import { InfosEnum } from '../Shared/methods/enum';

const isOpenAtom = atom<boolean>(false);
const typeModalAtom = atom<InfosEnum>(InfosEnum.TIME);

export const useSimpleModal = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [typeModal, setTypeModal] = useAtom(typeModalAtom);

  const openModal = (infos: InfosEnum) => {
    setIsOpen(true);
    setTypeModal(infos);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    typeModal,
    isOpen,
    openModal,
    closeModal,
  };
};
