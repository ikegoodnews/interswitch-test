import React, {memo, useCallback, useState} from 'react';
import FullscreenModal from '..';
import PropTypes from 'prop-types';
import './index.scss';

// eslint-disable-next-line react/display-name
const DialogModal = memo((props) => {
   const [open, setOpen] = useState(false);

   const setOpenState = useCallback(
      (v) => {
         setOpen(v);
         typeof props?.dropState === 'function' && props?.dropState(v);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [props.dropState],
   );

   const handleAction = () => {
      props.handleAction();
      setOpenState(false);
   };

   const handleCancel = () => {
      typeof props.onCancel === 'function' && props.onCancel();
      setOpenState(false);
   };

   return (
      <>
         <button onClick={() => setOpenState(true)} className={props.className}>
            {props.children}
         </button>
         <FullscreenModal open={open} className="d-flex" onClickAway={handleCancel}>
            <div className="p-5 dialog-modal my-auto d-flex flex-column justify-content-center align-items-center">
               <h4 style={{fontSize: '14px'}}>{props.title}</h4>
               <p className="pt-4" style={{color: '#a7a7a7', fontSize: '13px'}}>
                  {props.description}
               </p>
               <div className="pt-4 d-flex justify-content-center">
                  <button
                     className="p-2 px-4 rounded"
                     onClick={handleCancel}
                     style={{
                        backgroundColor: 'transparent',
                        border: '1px solid #ba0000',
                        color: '#ba0000',
                        borderRadius: '5px',
                     }}>
                     {props.rejectText}
                  </button>
                  <button
                     onClick={handleAction}
                     className="ms-4 p-2 px-4 rounded"
                     style={{
                        backgroundColor: '#ba0000',
                        border: '1px solid #ba0000',
                        color: '#fff',
                        borderRadius: '5px',
                     }}>
                     {props.actionText}
                  </button>
               </div>
            </div>
         </FullscreenModal>
      </>
   );
});

DialogModal.propTypes = {
   description: PropTypes.string.isRequired,
   handleAction: PropTypes.func.isRequired,
   rejectText: PropTypes.string.isRequired,
   actionText: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
   onCancel: PropTypes.func,
};

export default DialogModal;
