import LoadingIndicator from '../LoadingIndicator'
import React from 'react'

type Props = {}

export default function LoadingScreen({}: Props) {
  return (
    <div className="w-full h-full flex flex-grow items-center justify-center">
      <LoadingIndicator />
    </div>
  )
}