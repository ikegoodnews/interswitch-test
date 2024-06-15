import {createPortal} from 'react-dom';
import classNames from 'classnames';
import React, {memo} from 'react';
import './index.scss';

// eslint-disable-next-line react/display-name
const FullscreenModal = memo((props) => {
   return props.open
      ? createPortal(
           <div className={classNames('fullscreen-modal', {})}>
              <div onClick={props.onClickAway} className="back-drop" />
              <div className={classNames('content', props.className)}>{props.children}</div>
           </div>,
           document.body,
        )
      : null;
});

export default FullscreenModal;
