'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Baby, GraduationCap, Atom, Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import dynamic from 'next/dynamic'

const Mindmap = dynamic(() => import('@/components/mindmap'), { ssr: false })

type LevelKey = 'l10' | 'l18' | 'expert'

export default function Page() {
  const [level, setLevel] = useState<LevelKey>('l10')
  const [query, setQuery] = useState('')
  const [mindmap, setMindmap] = useState(true)
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState<string>('')
  const [mm, setMm] = useState<any | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setAnswer('')
    setMm(null)
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query, level, mindmap }),
      })
      const data = await res.json()
      if (data?.response) setAnswer(data.response)
      if (data?.mindmap) setMm(data.mindmap)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-[100dvh] overflow-hidden">
      <AnimatedBlobs />
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-3xl flex-col items-center justify-center gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="w-full">
          <Card className="w-full rounded-2xl border-white/30 bg-white/60 p-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
            <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.2)_100%)]" />
            <CardHeader className="relative z-10 space-y-3 pb-2 pt-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 shadow-md ring-1 ring-white/40 dark:from-pink-400/30 dark:via-purple-400/30 dark:to-blue-400/30">
                <Sparkles className="h-6 w-6" />
              </div>
              <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl">ELI10</CardTitle>
              <CardDescription className="mx-auto max-w-md text-balance text-base leading-relaxed">Explain anything at the perfect level for your understanding</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 space-y-6 pb-8 pt-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"><Search className="h-5 w-5 opacity-60" /></div>
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g., How do black holes work?" className="h-12 rounded-xl border-white/40 bg-white/70 pl-11 pr-4 text-base shadow-sm backdrop-blur-md placeholder:opacity-60 focus-visible:ring-2 focus-visible:ring-pink-300/60 dark:border-white/10 dark:bg-white/10" />
                </div>
                <fieldset className="space-y-3">
                  <legend className="text-sm font-medium opacity-80">Level</legend>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <LevelButton title="Kid-Friendly" subtitle="L10" active={level==='l10'} onClick={() => setLevel('l10')} Icon={Baby} gradient="from-pink-100 via-rose-100 to-purple-100 dark:from-pink-400/20 dark:via-rose-400/20 dark:to-purple-400/20" ring="ring-pink-200/70 dark:ring-pink-300/30" />
                    <LevelButton title="Teen/College" subtitle="L18" active={level==='l18'} onClick={() => setLevel('l18')} Icon={GraduationCap} gradient="from-purple-100 via-violet-100 to-indigo-100 dark:from-purple-400/20 dark:via-violet-400/20 dark:to-indigo-400/20" ring="ring-purple-200/70 dark:ring-purple-300/30" />
                    <LevelButton title="Expert Level" subtitle="Pro" active={level==='expert'} onClick={() => setLevel('expert')} Icon={Atom} gradient="from-sky-100 via-blue-100 to-cyan-100 dark:from-sky-400/20 dark:via-blue-400/20 dark:to-cyan-400/20" ring="ring-blue-200/70 dark:ring-blue-300/30" />
                  </div>
                </fieldset>
                <div className="flex items-start justify-between gap-4 rounded-xl border border-white/30 bg-white/50 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Generate Mindmap</p>
                    <p className="text-xs opacity-70">Visual representation of concepts</p>
                  </div>
                  <Switch checked={mindmap} onCheckedChange={setMindmap} />
                </div>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button type="submit" disabled={loading} className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 px-6 py-6 text-base font-semibold text-white shadow-lg transition [text-shadow:0_1px_0_rgba(0,0,0,0.1)] focus-visible:ring-2 focus-visible:ring-purple-300">
                    <span className="absolute inset-0 -z-10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60" style={{ background: 'radial-gradient(40% 60% at 30% 20%, rgba(255,255,255,0.8), transparent), radial-gradient(50% 70% at 80% 50%, rgba(255,255,255,0.5), transparent)' }} />
                    {loading ? 'Explaining…' : 'Explain to me'}
                  </Button>
                </motion.div>
              </form>

              {answer && (
                <div className="mt-4 space-y-4">
                  <h3 className="text-lg font-semibold">Result</h3>
                  <div className="prose prose-slate max-w-none rounded-xl border border-white/30 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:prose-invert dark:border-white/10 dark:bg-white/10" dangerouslySetInnerHTML={{ __html: answer.replace(/\n/g, '<br/>') }} />
                </div>
              )}

              {mm && (
                <div className="mt-6">
                  <h3 className="mb-2 text-lg font-semibold">Mindmap</h3>
                  <div className="h-[360px] w-full overflow-hidden rounded-xl border border-white/30 bg-white/50 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                    <Mindmap data={mm} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_10%,rgba(255,255,255,0.8),transparent_60%)]" />
    </main>
  )
}

function LevelButton({ title, subtitle, active, onClick, Icon, gradient, ring }: {
  title: string
  subtitle: string
  active: boolean
  onClick: () => void
  Icon: React.ComponentType<{ className?: string }>
  gradient: string
  ring: string
}) {
  return (
    <motion.button type="button" onClick={onClick} whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={[
        'group relative flex w-full items-center gap-3 rounded-xl border p-3 text-left shadow-sm',
        'border-white/30 bg-gradient-to-br backdrop-blur-md dark:border-white/10',
        gradient,
        active ? `ring-2 ${ring}` : 'hover:border-white/50 hover:shadow-md',
      ].join(' ')}>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/70 shadow-sm ring-1 ring-inset ring-white/50 backdrop-blur-sm dark:bg-white/10 dark:ring-white/10">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-medium leading-none">{title}</span>
          <span className="text-xs opacity-60">{subtitle}</span>
        </div>
        <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/50">
          <motion.span layout className="block h-full w-1/3" animate={{ width: active ? '100%' : '33%' }} transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ background: 'linear-gradient(90deg, rgba(236,72,153,0.7), rgba(168,85,247,0.7), rgba(59,130,246,0.7))' }} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ background: 'radial-gradient(60% 80% at 30% 20%, rgba(255,255,255,0.7), transparent), radial-gradient(50% 70% at 80% 50%, rgba(255,255,255,0.4), transparent)' }} />
    </motion.button>
  )
}

function AnimatedBlobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-pink-300/40 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, 10, 0], scale: [1, 1.05, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute top-1/3 -right-10 h-80 w-80 rounded-full bg-purple-300/40 blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, -15, 0], scale: [1, 1.06, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-blue-300/40 blur-3xl"
        animate={{ y: [0, 18, 0], x: [0, 8, 0], scale: [1, 1.04, 1] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
    </div>
  )
}
