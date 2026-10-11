"use client";

import { ChevronDown } from "lucide-react";
import type { FormState } from "@/lib/forms/options";
import { cn } from "@/lib/utils";
import { Input, fieldBase } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Base = {
  name: string;
  label: string;
  state: FormState;
  required?: boolean;
  hint?: string;
  className?: string;
};

function describedBy(name: string, hint?: string, error?: string) {
  return [hint ? `${name}-hint` : null, error ? `${name}-error` : null].filter(Boolean).join(" ") || undefined;
}

function FieldLabel({ name, label, required }: { name: string; label: string; required?: boolean }) {
  return (
    <Label htmlFor={name} className="mb-2">
      {label}
      {required ? (
        <span className="text-destructive" aria-hidden>
          *
        </span>
      ) : (
        <span className="font-sans text-sm font-normal text-muted-foreground">(optional)</span>
      )}
    </Label>
  );
}

function Help({ name, hint, error }: { name: string; hint?: string; error?: string }) {
  return (
    <>
      {hint ? (
        <p id={`${name}-hint`} className="mt-1.5 text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${name}-error`} className="mt-1.5 text-sm font-semibold text-destructive">
          {error}
        </p>
      ) : null}
    </>
  );
}

function valueOf(state: FormState, name: string): string | undefined {
  const v = state.values?.[name];
  return typeof v === "string" ? v : undefined;
}

export function TextField({
  name,
  label,
  state,
  required,
  hint,
  className,
  type = "text",
  autoComplete,
  inputMode,
  min,
}: Base & {
  type?: "text" | "email" | "tel" | "number";
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  min?: number;
}) {
  const error = state.fieldErrors?.[name];
  return (
    <div className={className}>
      <FieldLabel name={name} label={label} required={required} />
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        min={min}
        defaultValue={valueOf(state, name)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
      />
      <Help name={name} hint={hint} error={error} />
    </div>
  );
}

export function TextArea({ name, label, state, required, hint, className, rows = 4 }: Base & { rows?: number }) {
  const error = state.fieldErrors?.[name];
  return (
    <div className={className}>
      <FieldLabel name={name} label={label} required={required} />
      <Textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        defaultValue={valueOf(state, name)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
      />
      <Help name={name} hint={hint} error={error} />
    </div>
  );
}

/** Native select (best on mobile), styled to match shadcn inputs. */
export function SelectField({ name, label, state, required, hint, className, options }: Base & { options: readonly string[] }) {
  const error = state.fieldErrors?.[name];
  return (
    <div className={className}>
      <FieldLabel name={name} label={label} required={required} />
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          defaultValue={valueOf(state, name) ?? ""}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(name, hint, error)}
          className={cn(fieldBase, "h-12 appearance-none py-2 pr-11")}
        >
          <option value="" disabled>
            Choose one
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
      </div>
      <Help name={name} hint={hint} error={error} />
    </div>
  );
}

export function CheckboxGroup({ name, label, state, required, hint, className, options }: Base & { options: readonly string[] }) {
  const error = state.fieldErrors?.[name];
  const selected = state.values?.[name];
  const chosen = Array.isArray(selected) ? selected : [];
  return (
    <fieldset className={className} aria-describedby={describedBy(name, hint, error)}>
      <legend className="mb-2 flex items-center gap-1 font-heading text-[0.95rem] font-semibold text-foreground">
        {label}
        {required ? (
          <span className="text-destructive" aria-hidden>
            *
          </span>
        ) : null}
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <label
            key={o}
            className="flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border border-input bg-white px-4 py-2.5 transition has-[:checked]:border-purple has-[:checked]:bg-canvas-warm has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/25"
          >
            <input type="checkbox" name={name} value={o} defaultChecked={chosen.includes(o)} className="size-5 accent-purple" />
            <span>{o}</span>
          </label>
        ))}
      </div>
      <Help name={name} hint={hint} error={error} />
    </fieldset>
  );
}
