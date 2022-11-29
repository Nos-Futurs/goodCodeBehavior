import React, { createContext, ReactNode, useContext } from 'react';
import { InfosEnum } from '../Shared/methods/enum';
import { SimpleModal } from './Modal';
import { useSimpleModal } from './useSimpleModal';


interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext({
  openModal: (type: InfosEnum) => {
    return;
  },
});

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalProvider(props: ModalProviderProps) {
  const children = props.children;
  const { openModal } = useSimpleModal();
  return (
    <ModalContext.Provider
      value={{
        openModal,
      }}
    >
      <SimpleModal />
      {children}
    </ModalContext.Provider>
  );
}
