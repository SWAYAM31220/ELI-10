import * as React from 'react'
import { cn } from './utils'

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('relative rounded-xl border bg-white p-4 shadow-sm', className)} {...props} />
}
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} /> }
export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) { return <h2 className="text-xl font-semibold" {...props} /> }
export function CardDescription(props: React.HTMLAttributes<HTMLParagraphElement>) { return <p className="text-sm opacity-80" {...props} /> }
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} /> }
