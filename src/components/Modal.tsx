
import React, { ReactNode } from 'react';
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { closeModal } from '../redux/reducers/modalReducer';

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

const Modal = (props: ModalProps) => {
  const isOpen = useAppSelector((state) => state.modalReducer.isOpen);
  const dispatch = useAppDispatch();

  if (!props.isOpen) {
    return null;
  }

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleCloseModal}>
        <div className="modal-box">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Modal;
