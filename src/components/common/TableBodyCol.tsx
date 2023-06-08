import Tooltip from './Tooltip';

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
                    <Tooltip content={tooltip} position="top">

                        <div className='text-gray-400'>{value}</div>
                    </Tooltip>
                </a>
                :
                <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className='border-b text-gray-400'>{value}</div>
                </a>
                : tooltip ? <Tooltip content={tooltip} position="top">
                    <div className='text-gray-400'>{value}</div>
                </Tooltip> : <div className='border-b text-gray-400'>{value}</div>}

        </td>
    )

}
