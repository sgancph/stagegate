import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useApp } from '../../app/AppContext';
import { Icon, Sparkle } from '../../components/ui/Icon';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  meta?: string;
};

const SUGGESTIONS = [
  'What actions are pending for Arena?',
  'Which reports are at Stage Gate 2?',
  'Summarise the known facts for Arena.',
];

export function ChatAssistant() {
  const { persona, selectedProjectId } = useApp();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [loading, messages, open]);

  const ask = async (question: string) => {
    const content = question.trim();
    if (!content || loading) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content };
    const conversation = [...messages, userMessage];
    setMessages((current) => [...current, userMessage]);
    setDraft('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversation.slice(-8).map(({ role, content: messageContent }) => ({
            role,
            content: messageContent,
          })),
          persona,
          selectedProjectId,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        text?: unknown;
        model?: unknown;
        grounding?: unknown;
        error?: unknown;
      } | null;
      if (!response.ok) {
        throw new Error(typeof result?.error === 'string' ? result.error : 'The assistant did not respond.');
      }
      if (typeof result?.text !== 'string') throw new Error('The assistant returned an invalid response.');
      const answer = result.text;

      const meta = [
        typeof result.model === 'string' ? result.model : '',
        typeof result.grounding === 'string' ? result.grounding : '',
      ]
        .filter(Boolean)
        .join(' · ');
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: 'assistant', content: answer, meta },
      ]);
    } catch (requestError) {
      const detail = requestError instanceof Error ? requestError.message : 'The assistant request failed.';
      setError(
        detail === 'Unable to reach LLM inference server'
          ? 'Unable to reach the AI service. Start Ollama, then try again.'
          : detail,
      );
    } finally {
      setLoading(false);
    }
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void ask(draft);
  };

  return (
    <>
      {!open && (
        <button
          className="ai-launcher"
          type="button"
          aria-expanded="false"
          aria-controls="ai-assistant"
          onClick={() => setOpen(true)}
        >
          <Sparkle size={18} />
          <span>Ask AI</span>
        </button>
      )}
      {open && (
        <section id="ai-assistant" className="ai-chat" role="dialog" aria-label="Workspace AI assistant">
          <header className="ai-chat__head">
            <span className="ai-chat__mark">
              <Sparkle size={17} />
            </span>
            <h2>Workspace assistant</h2>
            <button
              className="ai-chat__close"
              type="button"
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
            >
              <Icon name="x" size={17} />
            </button>
          </header>

          <div className="ai-chat__messages" ref={listRef} aria-live="polite">
            {messages.length === 0 && (
              <div className="ai-message ai-message--assistant">
                <p>
                  Hi — I can help with the reports, stage gates, capital asks and pending actions in this
                  workspace. What would you like to know?
                </p>
              </div>
            )}
            {messages.map((message) => (
              <div key={message.id} className={`ai-message ai-message--${message.role}`}>
                <p>{message.content}</p>
                {message.meta && <span>{message.meta}</span>}
              </div>
            ))}
            {messages.length === 0 && (
              <div className="ai-chat__suggestions" aria-label="Suggested questions">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    disabled={loading}
                    onClick={() => void ask(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {loading && (
              <div
                className="ai-message ai-message--assistant ai-message--loading"
                aria-label="Assistant is responding"
              >
                <span />
                <span />
                <span />
              </div>
            )}
            {error && (
              <div className="ai-chat__error" role="alert">
                <Icon name="alert" size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <form className="ai-chat__composer" onSubmit={submit}>
            <textarea
              ref={inputRef}
              value={draft}
              maxLength={2_000}
              rows={1}
              aria-label="Ask about reports and actions"
              placeholder="Ask about reports or actions…"
              onChange={(event) => {
                setDraft(event.target.value);
                const el = event.target;
                el.style.height = 'auto';
                el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  void ask(draft);
                }
              }}
            />
            <button type="submit" aria-label="Send question" disabled={!draft.trim() || loading}>
              <Icon name="send" size={17} strokeWidth={2} />
            </button>
          </form>
          <p className="ai-chat__note">AI can be wrong. Verify against the report before acting.</p>
        </section>
      )}
    </>
  );
}
