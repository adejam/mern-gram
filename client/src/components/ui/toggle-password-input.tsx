import { EyeIcon, EyeOffIcon } from "lucide-react"
import React, { useMemo, useState } from "react"
import { Button } from "./button"

import { Input, InputProps } from "./input"

const TogglePasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type = "password", ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => setIsVisible(!isVisible)
    const thisType = useMemo(
      () => (isVisible ? "text" : type),
      [isVisible, type]
    )

    return (
      <div className="relative">
        <Input type={thisType} {...props} ref={ref} />
        <Button
          className="absolute bottom-1 right-1 h-7 w-7"
          onClick={toggleVisibility}
          size="icon"
          variant="ghost"
          type="button"
        >
          {isVisible ? (
            <EyeIcon className="h-4 w-4" />
          ) : (
            <EyeOffIcon className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle password visibility</span>
        </Button>
      </div>
    )
  }
)
TogglePasswordInput.displayName = "TogglePasswordInput"

export { TogglePasswordInput }
