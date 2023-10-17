import { Tooltip } from 'react-tooltip'
import './style.css'
export interface TableBodyColProps {
    value: string,
    tooltip?: string
    link?: string
}

export default function TableBodyCol({ value, tooltip, link }: TableBodyColProps) {
    return (
        <td className='text-center border border-slate-500 p-1'>
            {link ? tooltip ?
                <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Tooltip id={tooltip} place="top" className='tooltip'>
                        {tooltip}
                    </Tooltip>
                    <div className='text-gray-400' data-tooltip-id={tooltip}>{value}</div>
                </a>
                :
                <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className='border-b text-gray-400'>{value}</div>
                </a>
                : tooltip ? <>
                    <Tooltip id={tooltip} place="top" className='tooltip'>
                        {tooltip}
                    </Tooltip>
                    <div className='text-gray-400' data-tooltip-id={tooltip} >{value}</div>
                </>
                    :
                    <div className='border-b text-gray-400'>{value}</div>}


        </td>
    )

}
