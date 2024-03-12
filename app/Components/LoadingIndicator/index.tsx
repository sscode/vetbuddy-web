import { LoaderIcon } from 'lucide-react'
import React from 'react'

type Props = {}

export default function LoadingIndicator({}: Props) {
  return (
    <LoaderIcon className='animate-spin' />
  )
}