import api from './api'

// IMPORTANT: The Anthropic API key lives only in the Django backend's
// environment (ANTHROPIC_API_KEY in .env) and is never exposed to the
// frontend. Every call here hits our own DRF endpoints, which in turn call
// the Anthropic Messages API server-side, log the prompt/response pair to
// the AIRequest / AIResponse tables, and decrement the user's credits.

export const aiService = {
  async generateText({ prompt, project_id }) {
    const { data } = await api.post('/ai/generate/', { prompt, project_id })
    return data
  },

  async summarize({ text, project_id }) {
    const { data } = await api.post('/ai/summarize/', { text, project_id })
    return data
  },

  async translate({ text, target_language, project_id }) {
    const { data } = await api.post('/ai/translate/', { text, target_language, project_id })
    return data
  },

  async correctGrammar({ text, project_id }) {
    const { data } = await api.post('/ai/grammar/', { text, project_id })
    return data
  },

  async generateCode({ prompt, language, project_id }) {
    const { data } = await api.post('/ai/code/generate/', { prompt, language, project_id })
    return data
  },

  async explainCode({ code, language, project_id }) {
    const { data } = await api.post('/ai/code/explain/', { code, language, project_id })
    return data
  },

  async chat({ messages, project_id }) {
    // messages: [{ role: 'user' | 'assistant', content: string }]
    const { data } = await api.post('/ai/chat/', { messages, project_id })
    return data
  },

  async history({ page = 1 } = {}) {
    const { data } = await api.get('/ai/history/', { params: { page } })
    return data
  },
}

export default aiService
