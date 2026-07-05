import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  FileText, FileSearch, Languages, SpellCheck, Code2, FileCode, MessageSquare, Send, Zap,
} from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import PulseStrip from '../components/PulseStrip'
import aiService from '../services/aiService'
import { notify } from '../components/ui/toast'

const TOOLS = [
  { id: 'generate', label: 'Generate text', icon: FileText, placeholder: 'Write a launch announcement for our new pricing page…' },
  { id: 'summarize', label: 'Summarize', icon: FileSearch, placeholder: 'Paste the document or long text to summarize…' },
  { id: 'translate', label: 'Translate', icon: Languages, placeholder: 'Paste the text to translate…' },
  { id: 'grammar', label: 'Grammar fix', icon: SpellCheck, placeholder: 'Paste text to check for grammar and clarity…' },
  { id: 'code-generate', label: 'Generate code', icon: Code2, placeholder: 'Write a Python function that validates an email address…' },
  { id: 'code-explain', label: 'Explain code', icon: FileCode, placeholder: 'Paste a code snippet to explain…' },
  { id: 'chat', label: 'Chat assistant', icon: MessageSquare, placeholder: 'Ask anything about this project…' },
]

const CREDIT_COST = { generate: 2, summarize: 3, translate: 2, grammar: 1, 'code-generate': 3, 'code-explain': 2, chat: 1 }

// Local fallback so the workspace is fully demoable before the Django +
// Anthropic backend is wired up. Once live, aiService.* calls the real
// /api/ai/* endpoints, which call the Anthropic Messages API server-side.
function mockResponse(toolId, input) {
  const responses = {
    generate: `**Introducing our new pricing** ✨\n\nWe rebuilt pricing around how teams actually use Cortex — by AI request, not by seat. Start free with 50 credits, upgrade when you need more.`,
    summarize: `**Summary**\n\n- Core point extracted from your ${input.length}-character input\n- Key decision: ship the redesigned pricing page by end of sprint\n- Owner: growth team, review Friday`,
    translate: `*(translated)* Esta es una traducción de muestra de tu texto de entrada.`,
    grammar: input.replace(/\bi\b/g, 'I').trim() + '\n\n_2 corrections applied._',
    'code-generate': '```python\nimport re\n\ndef is_valid_email(email: str) -> bool:\n    pattern = r"^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$"\n    return re.match(pattern, email) is not None\n```',
    'code-explain': 'This snippet defines a function that checks whether a string matches a basic email pattern using a regular expression, returning `True` or `False`.',
    chat: `Good question — based on this project's history, I'd suggest starting with the summarizer on your latest doc, then generating release notes from the summary.`,
  }
  return responses[toolId] || 'Done.'
}

export default function AIWorkspace() {
  const [activeTool, setActiveTool] = useState('generate')
  const [input, setInput] = useState('')
  const [language, setLanguage] = useState('Spanish')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your project's chat assistant. Ask me anything about this workspace." },
  ])
  const [credits] = useState(760)

  const tool = TOOLS.find((t) => t.id === activeTool)

  const runTool = async () => {
    if (!input.trim()) return
    setLoading(true)
    setOutput('')
    try {
      let result
      switch (activeTool) {
        case 'generate': result = await aiService.generateText({ prompt: input }); break
        case 'summarize': result = await aiService.summarize({ text: input }); break
        case 'translate': result = await aiService.translate({ text: input, target_language: language }); break
        case 'grammar': result = await aiService.correctGrammar({ text: input }); break
        case 'code-generate': result = await aiService.generateCode({ prompt: input, language: 'python' }); break
        case 'code-explain': result = await aiService.explainCode({ code: input, language: 'python' }); break
        default: result = null
      }
      setOutput(result?.output || mockResponse(activeTool, input))
    } catch {
      // Backend not connected yet in this environment — fall back to a
      // representative mock so the workspace stays usable end-to-end.
      setOutput(mockResponse(activeTool, input))
    } finally {
      setLoading(false)
    }
  }

  const sendChat = async () => {
    if (!input.trim()) return
    const nextMessages = [...chatMessages, { role: 'user', content: input }]
    setChatMessages(nextMessages)
    setInput('')
    setLoading(true)
    try {
      const result = await aiService.chat({ messages: nextMessages })
      setChatMessages([...nextMessages, { role: 'assistant', content: result?.output || mockResponse('chat', input) }])
    } catch {
      setChatMessages([...nextMessages, { role: 'assistant', content: mockResponse('chat', input) }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">AI Workspace</h1>
          <p className="text-sm text-foam-muted">Every response here is logged to this project's AI history.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-black/10 dark:border-ink-line px-3 py-1.5 text-sm">
          <Zap className="h-3.5 w-3.5 text-amber" />
          <span className="font-mono font-medium">{credits}</span>
          <span className="text-foam-muted">credits left</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {TOOLS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTool(id); setOutput(''); setInput('') }}
              className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activeTool === id
                  ? 'bg-signal/10 text-signal dark:text-signal-soft'
                  : 'text-foam-muted hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">{label}</span>
            </button>
          ))}
        </div>

        {activeTool === 'chat' ? (
          <Card className="flex flex-col p-0">
            <div className="flex-1 space-y-4 overflow-y-auto p-5 max-h-[480px] min-h-[320px]">
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
                    m.role === 'user' ? 'bg-signal text-white' : 'bg-black/5 dark:bg-white/5'
                  }`}>
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && <PulseStrip className="h-4 w-10" />}
            </div>
            <div className="flex items-center gap-2 border-t border-black/5 dark:border-ink-line p-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                placeholder={tool.placeholder}
                className="input flex-1"
              />
              <Button onClick={sendChat} loading={loading}><Send className="h-4 w-4" /></Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            <Card>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-base font-semibold">{tool.label}</h2>
                <span className="text-xs text-foam-muted">{CREDIT_COST[activeTool]} credits / request</span>
              </div>

              {activeTool === 'translate' && (
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="input mb-3 w-auto">
                  {['Spanish', 'French', 'German', 'Japanese', 'Portuguese', 'Hindi'].map((l) => <option key={l}>{l}</option>)}
                </select>
              )}

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={tool.placeholder}
                className="input min-h-[140px] resize-none font-mono text-sm"
              />
              <div className="mt-3 flex justify-end">
                <Button onClick={runTool} loading={loading} disabled={!input.trim()}>Run {tool.label.toLowerCase()}</Button>
              </div>
            </Card>

            {(loading || output) && (
              <Card>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-sm font-semibold text-foam-muted">Output</h3>
                  {loading && <PulseStrip className="h-3 w-8" />}
                </div>
                {loading ? (
                  <p className="text-sm text-foam-muted">Cortex is thinking…</p>
                ) : (
                  <div className="markdown-output text-sm leading-relaxed">
                    <ReactMarkdown>{output}</ReactMarkdown>
                  </div>
                )}
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
