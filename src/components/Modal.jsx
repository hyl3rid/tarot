
import './Modal.css';
import { useRef, useEffect } from 'react'


function Modal({reveal, timeout, children}) {
    const modalRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            const modalElement = modalRef.current;
            if (modalElement) {
              if (reveal) {
                modalElement.showModal();
              } else {
                modalElement.close();
              }
            }
        }, [timeout])
      }, [reveal, timeout]);

    return (
        <dialog ref={modalRef}>
            { children }
        </dialog>
  );
}

export default Modal;
