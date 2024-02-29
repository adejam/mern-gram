import { Loader2 } from "lucide-react"
import React from "react"

import { Button, ButtonProps } from "./button"

interface CustomLoadingButtonProps extends ButtonProps {
  isLoading?: boolean
}

const CustomLoadingButton = React.forwardRef<
  HTMLButtonElement,
  CustomLoadingButtonProps
>(({ disabled, children, isLoading = false, ...props }, ref) => {
  const isDisabled = disabled || isLoading
  return (
    <Button disabled={isDisabled} {...props} ref={ref}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
})

CustomLoadingButton.displayName = "CustomLoadingButton"

export { CustomLoadingButton }
