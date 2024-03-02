import React from 'react';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';

const ConfirmationDialog = ({ open, handleClose, handleConfirm, title, message }) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{message}</DialogContentText>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'space-between' }}>
				<Button variant="contained" onClick={handleClose} color="third">
					Cancel
				</Button>
				<Button variant="contained" onClick={handleConfirm} color="primary" autoFocus>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmationDialog;
