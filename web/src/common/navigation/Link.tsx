import type { LinkProps as MuiLinkProps } from '@mui/material'
import { Link as MuiLink } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

type LinkProps = Omit<MuiLinkProps, 'component'>

export default function Link({ href, ...props }: LinkProps) {
  const link = `${href}`
  return <MuiLink component={RouterLink} href={link} to={link} {...props} />
}
