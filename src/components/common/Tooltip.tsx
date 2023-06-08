import React, { ReactElement } from 'react';

type TooltipProps = {
    children: ReactElement;
    content: string;
    position?: 'top' | 'right' | 'bottom' | 'left';
};

const Tooltip: React.FC<TooltipProps> = ({ children, content, position = 'top' }) => {
    const [visible, setVisible] = React.useState(false);

    return (
        <div
            className="relative inline-flex items-center cursor-default"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {visible && (
                <div
                    className={`absolute z-10 py-1 px-2 text-xs text-black bg-gray-300 rounded-md whitespace-nowrap opacity-90 ${position === 'top'
                        ? 'bottom-full'
                        : position === 'bottom'
                            ? 'top-full'
                            : position === 'left'
                                ? 'right-full'
                                : 'left-full'
                        }`}
                >
                    {content}
                </div>
            )}

            {children}
        </div>
    );
};

export default Tooltip;
