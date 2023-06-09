import React from 'react';

import { useThreadData } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';
import Tooltip from './Tooltip';
import Spinner from './Spinner';
import Error from './Error';

export interface SubPannelProps {
    title: string,
    data: PanelProps[],
    loading?: any,
    error?: any
}

export interface PanelProps {
    value?: number,
    tooltip: string,
    subtitle: string
}
export default function SubPannel({ data, loading, error, title }: SubPannelProps) {

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <Error />;
    }

    const items = data.map((d: PanelProps) => {
        return (

            <Tooltip content={d.tooltip} position="top">
                <div className='text-center'>
                    <div className='border-b border-gray-800'>{isDefined(d.value) ? isNaN(d.value) ? '-' : d.value : '-'}</div>
                    <div className='mt-1'>{d.subtitle}</div>
                </div>
            </Tooltip>
        )
    })

    console.log(data.length)

    return (
        <div className="border-2 border-gray-400 bg-black rounded shadow-md shadow-white">
            <div className='text-2xl text-gray-300 mb-2 mt-2 font-bold '>{title}</div>
            <hr className='border-gray-500' />
            <div className={`grid grid-cols-${data.length} gap-${4 - data?.length} font-normal mt-3 mb-2 text-gray-400`}>
                {items}
            </div>
        </div>
    );
}
