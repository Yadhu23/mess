// src/components/ui/button.jsx
import React from "react"

export function Button({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variantStyles = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-purple-600 text-purple-600 hover:bg-purple-50",
    ghost: "text-purple-600 hover:bg-purple-100",
  }

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  }

  const combined =
    `${baseStyles} ${variantStyles[variant] || ""} ${sizeStyles[size] || ""} ${className}`.trim()

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  )
}
