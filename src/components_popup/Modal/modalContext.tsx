import React, { createContext, ReactNode, useContext } from 'react';
import { SimpleModal } from './Modal';
import { useSimpleModal } from './useSimpleModal';


interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext({
  openModal: () => {
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
