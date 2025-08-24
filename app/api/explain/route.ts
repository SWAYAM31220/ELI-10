import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { supabaseServer } from '@/lib/supabase-server'
import { buildMindmap } from '@/lib/mindmap'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { prompt, level, mindmap } = (await req.json()) as {
      prompt: string
      level: 'l10' | 'l18' | 'expert'
      mindmap: boolean
    }

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const levelInstruction =
      level === 'l10'
        ? "Explain like I'm 10 (simple, analogies)."
        : level === 'l18'
        ? 'Explain for a smart teen/college student (balanced detail).'
        : 'Explain for an expert (technical precision, assumptions stated).'

    const sys = `${levelInstruction} Keep it concise but complete. Use short paragraphs and bullet points when helpful.`

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: sys },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    })

    const text = completion.choices?.[0]?.message?.content?.trim() || ''
    const mm = mindmap ? buildMindmap(text) : null

    const sb = supabaseServer()
    const { data, error } = await sb
      .from('explanations')
      .insert({ level, prompt, response: text, mindmap: mm })
      .select('id')
      .single()

    if (error) console.error('[Supabase insert error]', error)

    return NextResponse.json({ id: data?.id, response: text, mindmap: mm })
  } catch (e: any) {
    console.error('[API error]', e)
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 })
  }
}
