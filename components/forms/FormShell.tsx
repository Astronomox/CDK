"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { HONEYPOT_FIELD, STARTED_AT_FIELD, initialFormState, type FormState } from "@/lib/forms/options";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Action = (state: FormState, formData: FormData) => Promise<FormState>;

type Props = {
  action: Action;
  event: AnalyticsEvent;
  submitLabel: string;
  successTitle: string;
  /** Short privacy note shown above the submit button. */
  privacyNote?: React.ReactNode;
  children: (state: FormState) => React.ReactNode;
};

function FormBody({ action, event, submitLabel, successTitle, privacyNote, children, onReset }: Props & { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(action, initialFormState);
  const startedRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      track(event);
      successRef.current?.focus();
    } else if (state.status === "error") {
      statusRef.current?.focus();
    }
  }, [state, event]);

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-[1.75rem] bg-gradient-to-br from-blue-soft to-purple-soft p-8 text-center outline-none sm:p-12">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-gold text-ink">
          <Check className="size-8" />
        </div>
        <h3 className="mt-5 text-2xl font-bold">{successTitle}</h3>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">{state.message}</p>
        <button type="button" onClick={onReset} className="mt-6 font-heading font-semibold text-blue-deep underline underline-offset-4">
          Send another response
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-6">
      {state.status === "error" ? (
        <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 font-semibold text-destructive outline-none">
          {state.message}
        </div>
      ) : null}

      {children(state)}

      {/* Spam protection: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${HONEYPOT_FIELD}-field`}>Leave this field empty</label>
        <input id={`${HONEYPOT_FIELD}-field`} type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input ref={startedRef} type="hidden" name={STARTED_AT_FIELD} defaultValue="0" />

      {privacyNote ? <p className="text-sm text-muted-foreground">{privacyNote}</p> : null}

      <Button type="submit" size="lg" disabled={pending} className="group/btn w-full sm:w-auto">
        {pending ? (
          <>
            <Loader2 className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            {submitLabel} <ArrowRight className="transition-transform group-hover/btn:translate-x-0.5" />
          </>
        )}
      </Button>
    </form>
  );
}

export function FormShell(props: Props) {
  // Changing the key remounts the form with a fresh state after a successful submission.
  const [key, setKey] = useState(0);
  return <FormBody key={key} {...props} onReset={() => setKey((k) => k + 1)} />;
}
