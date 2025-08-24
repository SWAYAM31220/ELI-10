import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ELI10 – Explain at your level',
  description: 'Explain anything at the perfect level for your understanding',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-[100dvh] antialiased">{children}</body>
    </html>
  )
}
