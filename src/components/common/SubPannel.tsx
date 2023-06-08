import React from 'react';

import { useThreadData } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';
import Tooltip from './Tooltip';

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
        return <div className="sub_panel loading">loading...</div>;
    }

    if (error) {
        return <div className="sub_panel loading">error</div>;
    }

    const items = data.map((d: PanelProps) => {
        return (
            <div>
                <Tooltip content={d.tooltip} position="top">
                    <div >{isDefined(d.value) ? isNaN(d.value) ? '-' : d.value : '-'}</div>
                </Tooltip>
                <h6>{d.subtitle}</h6>
            </div>
        )
    })

    return (
        <div className="border-2 border-gray-400 bg-black rounded shadow-md shadow-white">
            <div className='text-2xl text-gray-300 mb-2 mt-2 font-bold '>{title}</div>
            <hr className='border-gray-500' />
            <div className={`grid grid-cols-${data?.length} gap-${3 - data?.length} font-normal mt-3 mb-2 text-gray-400`}>
                {items}
            </div>
        </div>
    );
}
