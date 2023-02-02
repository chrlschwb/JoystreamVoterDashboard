import React from 'react';

import { Block } from '@/types';

export interface BlockTimeProps {
  block: Block;
}

export default function BlockTime({ block }: BlockTimeProps) {
  return (
    <a
      href={`https://polkadot.js.org/apps/?rpc=${import.meta.env.VITE_NODE_SOCKET}/ws-rpc#/explorer/query/${
        block.number
      }`}
    >
      {block.timestamp}
    </a>
  );
}
