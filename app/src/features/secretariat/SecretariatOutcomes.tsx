import { Icon, Sparkle } from '../../components/ui/Icon';
import { getSecretariat } from '../../data/store';
import { toast } from '../../lib/toast';

export function SecretariatOutcomes() {
  const { list, conditions, minutes, minutesSummary } = getSecretariat().outcomes;
  return (
    <div className="sec-out-grid">
      <section className="card sec-out-list">
        <div className="sec-out-list__head">
          <h2 className="ws-h">Decided submissions</h2>
          <p className="ws-h-sub">Outcome letters &amp; minutes.</p>
        </div>
        {list.map((o) => (
          <div key={o.name} className={`sec-out-item${o.selected ? ' is-selected' : ''}`}>
            <div className="sec-out-item__body">
              <p className="sec-out-item__name">{o.name}</p>
              <p className="sec-out-item__sub">{o.sub}</p>
              <p className="sec-out-item__date">{o.date}</p>
            </div>
            <span className={`badge-pill badge-pill--${o.variant} sec-out-item__pill`}>{o.pill}</span>
            <span className="sec-out-item__chev">
              <Icon name="chevronRight" size={16} strokeWidth={2} />
            </span>
          </div>
        ))}
      </section>

      <div className="sec-out-pane is-active">
        <div className="sec-out-head">
          <div>
            <p className="sec-out-name">Music Theme Park</p>
            <p className="sec-out-sess">Stage Gate 3 · SGRP Session 14 · 10 Jun 2026</p>
          </div>
          <div className="sec-out-headactions">
            <span className="badge-pill badge-pill--amber sec-out-headpill">Conditional endorsement</span>
          </div>
        </div>

        <div className="sec-out-trace">
          <span className="sec-out-trace__ic">
            <span className="sec-out-teams">T</span>
          </span>
          AI-drafted from the committee decision synced from Microsoft Teams. Review and amend before sending.
        </div>

        <section className="card sec-out-letter">
          <p className="sec-out-to">To: Music Theme Park Project Team</p>
          <p className="sec-out-date">10 June 2026</p>
          <p className="sec-out-subj">Stage Gate 3: Conditional Endorsement</p>
          <p>
            The Stage Gate 3 submission for Music Theme Park was reviewed by the SGRP Committee on 10 June
            2026 and has been granted <strong>conditional endorsement</strong>. The submission demonstrated
            strong alignment with Qiddiya’s strategic objectives and met the required readiness threshold.
          </p>
          <p>
            This submission cannot proceed to Stage Gate 4 until the following conditions are formally closed
            and evidenced within the QIC Stage Gate platform:
          </p>
          <ul className="sec-out-conds">
            {conditions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="sec-out-sign">
            <strong>Osman</strong>
            <br />
            SGRP Secretariat
          </p>
        </section>

        <section className="card sec-out-mins">
          <div className="sec-out-mins__head">
            <span className="sec-out-mins__ticon">T</span>
            <div className="sec-out-mins__htext">
              <p className="sec-out-mins__title">Meeting minutes</p>
              <p className="sec-out-mins__meta">SGRP Session 14 · auto-summarised</p>
            </div>
            <span className="sec-out-mins__ai">
              <Sparkle size={12} /> AI summary
            </span>
          </div>
          <div className="sec-out-mins__body">
            <p className="sec-out-mins__summary">{minutesSummary}</p>
            <p className="sec-out-mins__kh">Key points</p>
            <ul className="sec-out-mins__keys">
              {minutes.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="card sec-out-foot">
          <p className="sec-out-footnote">
            Nothing is sent automatically. Review the letter and minutes, then send the final communication to
            the project team.
          </p>
          <div className="sec-out-footbtns">
            <button
              className="btn btn--ghost"
              onClick={() => toast("Editing isn't connected in this prototype")}
            >
              Amend
            </button>
            <button
              className="btn btn--navy"
              onClick={() => toast("This is a prototype, so the communication wasn't sent")}
            >
              <Icon name="send" size={15} strokeWidth={2} /> Send communication
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
