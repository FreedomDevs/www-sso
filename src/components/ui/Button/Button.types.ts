import {ButtonHTMLAttributes, ReactNode} from "react";

export type ButtonVariant = 'primary' | 'secondary' | 'integrations';

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant: ButtonVariant;
    size: ButtonSize;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    loading?: boolean;
    fullWidth?: boolean;
}