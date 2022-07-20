import { TextField } from '@mui/material'
import React, { ChangeEventHandler, FocusEventHandler } from 'react'

type typeVariant = 'standard' | 'filled' | 'outlined' | undefined
type Size = 'medium' | 'small'
interface Iprops {
  fullWidth?: boolean
  id?: string
  name: string
  label?: string
  type?: string
  value: string
  variant?: typeVariant
  onChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined
  error?: boolean | undefined
  helperText?: boolean | string | undefined
  className?: string
  width?: number | string
  isTextSearch?: boolean
  size?: Size
  maxWidth?: number | string
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

function CustomTextField({
  fullWidth,
  variant = 'standard',
  type = 'text',
  isTextSearch = false,
  width,
  maxWidth,
  ...rest
}: Iprops) {
  return (
    <TextField
      sx={{
        width,
        maxWidth,
      }}
      inputProps={{
        style: {
          marginRight: isTextSearch ? 50 : 0,
        },
      }}
      fullWidth={fullWidth}
      variant={variant}
      type={type}
      {...rest}
    />
  )
}

export default CustomTextField
