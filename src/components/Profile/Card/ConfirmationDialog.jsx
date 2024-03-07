import React from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { Styled3DButtonRed, Styled3DButtonGreen } from '../../../styles/mainLayoutStyles';

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
				<Styled3DButtonRed variant="contained" onClick={handleClose}>
					Cancel
				</Styled3DButtonRed>
				<Styled3DButtonGreen variant="contained" onClick={handleConfirm} autoFocus>
					Confirm
				</Styled3DButtonGreen>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmationDialog;
