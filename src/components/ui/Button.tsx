import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";
type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};
type LinkProps = BaseProps & { href: string; type?: never };
type NativeProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
export type ButtonProps = LinkProps | NativeProps;

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className } = props;
  const styles = cn(
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors",
    variant === "primary"
      ? "border-foreground bg-foreground text-background hover:bg-secondary"
      : "border-border bg-surface text-foreground hover:bg-surface-secondary",
    className,
  );
  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={styles}>
        {children}
      </Link>
    );
  }
  const {
    variant: _variant,
    className: _className,
    ...buttonProps
  } = props as NativeProps;
  void _variant;
  void _className;
  return (
    <button className={styles} {...buttonProps}>
      {children}
    </button>
  );
}
