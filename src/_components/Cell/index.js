import classNames from 'classnames';

const Cell = ({onClick, children, className, isActive = false}) => {
   return (
      <div
         onClick={!isActive ? onClick : () => {}}
         className={classNames(
            'h-10 border-b border-r flex items-center justify-center select-none transition-colors',
            {
               'cursor-pointer hover:bg-gray-100 active:bg-gray-200': !isActive && onClick,
               'font-bold text-white bg-blue-600': isActive,
            },
            className,
         )}>
         {children}
      </div>
   );
};

export default Cell;
