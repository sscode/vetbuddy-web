import { Mic, MicOff } from 'lucide-react'

import React from 'react'

type Props = {}

export default function RecordButton({ }: Props) {
  return (
    <div className='flex items-center justify-center border size-24 rounded-full bg-slate-50'>
      {/* <Mic className='size-14' /> */}
      <MicOff className='size-14 text-gray-400' strokeWidth={1} />
    </div>
  )
}