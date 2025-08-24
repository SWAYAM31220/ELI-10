import * as React from 'react'
import { cn } from './utils'

type Props = React.InputHTMLAttributes<HTMLInputElement>
export const Input = React.forwardRef<HTMLInputElement, Props>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn('flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2', className)} {...props} />
})
