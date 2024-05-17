import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

function DialogComponent(
    {
        title,
        open,
        onClose,
        maxWidth,
        children
    }
) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={maxWidth}>
    {title && <DialogTitle>{title}</DialogTitle>}
    <DialogContent>{children}</DialogContent>
  </Dialog>
  )
}

export default DialogComponent