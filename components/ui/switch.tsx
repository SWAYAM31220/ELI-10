'use client'
import * as React from 'react'

export function Switch({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? 'bg-blue-500' : 'bg-gray-300'}`}>
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
    </button>
  )
}
