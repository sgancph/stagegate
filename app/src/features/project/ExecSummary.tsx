import { useEffect, useState } from 'react';
import { WorkspaceHeader } from './WorkspaceHeader';
import { Icon, Sparkle } from '../../components/ui/Icon';
import { toast } from '../../lib/toast';
import { useApp } from '../../app/AppContext';

type GenerationState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; text: string; model: string }
  | { status: 'error'; message: string };

export function ExecSummary() {
  const { selectedProject } = useApp();
  const [generation, setGeneration] = useState<GenerationState>({ status: 'idle' });

  useEffect(() => setGeneration({ status: 'idle' }), [selectedProject.id]);

  const generateSummary = async () => {
    setGeneration({ status: 'loading' });

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content:
                'You assist with Stage Gate governance. Use only the facts supplied by the user. Never invent project details. Mark missing evidence as [CONFIRM].',
            },
            {
              role: 'user',
              content: `Draft a concise executive summary for this illustrative report. Project: ${selectedProject.name}. Gate: ${selectedProject.stageGate}. Sector: ${selectedProject.sector}. Capital ask: ${selectedProject.capitalAsk}. Cover the purpose, decision requested, and evidence gaps.`,
            },
          ],
          temperature: 0.2,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        text?: unknown;
        model?: unknown;
        error?: unknown;
      } | null;

      if (!response.ok) {
        const detail = typeof result?.error === 'string' ? result.error : 'The AI service did not respond.';
        throw new Error(detail);
      }
      if (typeof result?.text !== 'string') throw new Error('The AI service returned an invalid response.');

      setGeneration({
        status: 'success',
        text: result.text,
        model: typeof result.model === 'string' ? result.model : 'Configured model',
      });
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'The AI request failed.';
      setGeneration({
        status: 'error',
        message:
          detail === 'Unable to reach LLM inference server'
            ? 'Unable to reach the AI service. If you are developing locally, start Ollama and try again.'
            : detail,
      });
    }
  };

  return (
    <div className="view view--execsummary is-active">
      <WorkspaceHeader active="execsummary" />
      <div className="ws-grid">
        <div className="ws-empty es-output" aria-live="polite" aria-busy={generation.status === 'loading'}>
          {generation.status === 'loading' ? (
            <>
              <div className="rs-spinner" aria-hidden="true">
                <span className="rs-spinner__ring" />
                <span className="rs-spinner__ic">
                  <Sparkle size={22} />
                </span>
              </div>
              <h3 className="ws-empty__t es-output__heading">Generating executive summary</h3>
              <p className="ws-empty__d">The configured AI model is reviewing the supplied report details.</p>
            </>
          ) : generation.status === 'success' ? (
            <>
              <span className="ws-empty__ic">
                <Sparkle size={28} />
              </span>
              <div className="es-output__head">
                <div>
                  <h3 className="ws-empty__t">Executive summary draft</h3>
                  <p className="es-output__meta">Generated with {generation.model}</p>
                </div>
                <button className="btn btn--ghost btn--sm" onClick={generateSummary}>
                  Regenerate
                </button>
              </div>
              <p className="es-output__response">{generation.text}</p>
            </>
          ) : generation.status === 'error' ? (
            <div className="es-error" role="alert">
              <span className="es-error__ic">
                <Icon name="alert" size={22} />
              </span>
              <h3 className="ws-empty__t">Summary generation failed</h3>
              <p className="ws-empty__d">{generation.message}</p>
              <button className="btn btn--navy btn--sm" onClick={generateSummary}>
                Try again
              </button>
            </div>
          ) : (
            <>
              <span className="ws-empty__ic">
                <Sparkle size={28} />
              </span>
              <h3 className="ws-empty__t">Generate a summary to see it here</h3>
              <p className="ws-empty__d">
                Choose an output format on the left and generate. We'll draft a committee-ready executive
                summary from the report details supplied to the AI. Review the output before using it.
              </p>
              <div className="ws-empty__steps">
                <span className="ws-empty__step">
                  <span className="ws-empty__num">1</span>Choose format
                </span>
                <span className="ws-empty__step">
                  <span className="ws-empty__num">2</span>Generate summary
                </span>
                <span className="ws-empty__step">
                  <span className="ws-empty__num">3</span>Review output
                </span>
              </div>
            </>
          )}
        </div>
        <aside className="ws-left">
          <section className="ws-panel">
            <p className="es-label">
              Generate the {selectedProject.name} · {selectedProject.stageGate} summary
            </p>
            <label className="ws-label">Output format</label>
            <button
              className="ws-select"
              type="button"
              onClick={() => toast('Only SGRP Template v2.1 is available in this prototype')}
            >
              SGRP Template v2.1{' '}
              <Icon name="chevronDown" size={14} strokeWidth={2.2} className="ws-select__ch" />
            </button>
            <button
              className="btn btn--navy es-gen-btn"
              disabled={generation.status === 'loading'}
              onClick={generateSummary}
            >
              <Sparkle size={18} />
              {generation.status === 'loading' ? 'Generating…' : 'Generate Summary'}
            </button>
            <p className="es-est">Uses the configured local or production AI model</p>
          </section>
        </aside>
      </div>
    </div>
  );
}
