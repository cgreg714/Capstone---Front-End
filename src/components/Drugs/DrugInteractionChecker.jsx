import React, { useContext, useState, useCallback } from 'react';
import { Autocomplete, TextField, Card, CardContent, CardHeader, Grid, Typography, Button, Box } from '@mui/material';
import { DrugContext } from '../../contexts/DrugContext';
import { getInteractionBetweenTwoDrugs } from '../../api/drugAPI';
import './DInteractions.css';
import { MedicationContext } from '../../contexts/MedicationContext';
import { useTheme } from '@mui/material/styles';

function DrugInteractionChecker() {
	const { drugs } = useContext(DrugContext);
	const [drug1, setDrug1] = useState(null);
	const [drug2, setDrug2] = useState(null);
	const [interaction, setInteraction] = useState(null);
	const { medications } = useContext(MedicationContext);
	const allOptions = [
		...medications.map((med) => ({ ...med, type: 'Medication' })),
		...drugs.map((drug) => ({ ...drug, type: 'Drug' })),
	];
	const theme = useTheme();

	// eslint-disable-next-line
	const [selectedMedication, setSelectedMedication] = useState(null);
	// eslint-disable-next-line
	const [selectedDrug, setSelectedDrug] = useState(null);

	const checkInteraction = useCallback(async () => {
		if (drug1 && drug2) {
			try {
				const drug1Id = drug1.associatedDrug ? drug1.associatedDrug['drugbank-id'] : drug1['drugbank-id'];
				const drug2Id = drug2.associatedDrug ? drug2.associatedDrug['drugbank-id'] : drug2['drugbank-id'];
				const response = await getInteractionBetweenTwoDrugs(drug1Id, drug2Id);
				if (response.message) {
					setInteraction({ description: response.message });
				} else {
					setInteraction(response);
				}
			} catch (error) {
				setInteraction({ description: 'An error occurred while checking for interactions.' });
			}
		}
	}, [drug1, drug2]);

	const clearSelection = () => {
		setDrug1(null);
		setDrug2(null);
		setInteraction(null);
	};

	return (
		<>
			<Card
				sx={{
					border: '3px solid #000',
				}}
			>
				<CardHeader
					title={
						<Typography
							className="header"
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								fontFamily: 'Comfortaa',
								fontWeight: 'bolder',
								color: '#000',
								backgroundColor: (theme) => theme.palette.third.main,
								borderBottomLeftRadius: 10,
								borderBottomRightRadius: 10,
								borderBottom: '2px solid black',
								width: '100%',
								height: '60px',
							}}
							component="div"
							variant="h5"
						>
							Drug Interactions
						</Typography>
					}
					sx={{ padding: 0 }}
				/>
				<CardContent>
					<Grid container spacing={2} justifyContent="space-between">
						<Grid item xs={12} sm={6}>
							<Autocomplete
								options={allOptions}
								getOptionLabel={(option) => option.name}
								style={{ width: '100%' }}
								value={drug1 ? allOptions.find((option) => option._id === drug1._id) || null : null}
								onChange={(event, newValue) => {
									if (newValue && newValue.type === 'Medication') {
										setSelectedMedication(newValue);
										setDrug1(newValue);
									} else if (newValue) {
										setSelectedDrug(newValue);
										setDrug1(newValue);
									}
								}}
								groupBy={(option) => option.type}
								renderOption={(props, option) => (
									<li {...props}>
										<Typography variant="subtitle1">{option.name}</Typography>
									</li>
								)}
								renderInput={(params) => (
									<TextField {...params} label="Medication or Drug" variant="outlined" />
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Autocomplete
								options={allOptions}
								getOptionLabel={(option) => option.name}
								style={{ width: '100%' }}
								value={drug2 ? allOptions.find((option) => option._id === drug2._id) || null : null}
								onChange={(event, newValue) => {
									if (newValue && newValue.type === 'Medication') {
										setSelectedMedication(newValue);
										setDrug2(newValue);
									} else if (newValue) {
										setSelectedDrug(newValue);
										setDrug2(newValue);
									}
								}}
								groupBy={(option) => option.type}
								renderOption={(props, option) => (
									<li {...props}>
										<Typography variant="subtitle1">{option.name}</Typography>
									</li>
								)}
								renderInput={(params) => (
									<TextField {...params} label="Medication or Drug" variant="outlined" />
								)}
							/>
						</Grid>
					</Grid>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							marginTop: 4,
						}}
					>
						<Button
							variant="contained"
							className="chkBtn"
							onClick={checkInteraction}
							sx={{
								width: '50%',
								color: 'black',
								borderRadius: 5,
								fontWeight: 'bolder',
								fontFamily: 'Comfortaa',
								backgroundColor: (theme) => theme.palette.primary.main,
								border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`,
								zIndex: 1,
								'&:hover': {
									boxShadow: (theme) => `0 0 10px ${theme.palette.secondary.main}`,
								},
							}}
						>
							Check For Interaction
						</Button>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							marginTop: 4,
						}}
					>
						<Box
							sx={{
								bgcolor: 'background.paper',
								border: interaction
									? interaction.description === 'No interaction found between these drugs'
										? '2px solid green'
										: '2px solid red'
									: '2px solid #F3B462',
								boxShadow: interaction
									? interaction.description === 'No interaction found between these drugs'
										? '0 0 10px green'
										: '0 0 10px red'
									: '0 0 10px #F3B462',
								borderRadius: 2,
								p: 4,
								zIndex: 2,
							}}
						>
							<Typography id="header" variant="h6" component="div">
								{drug1 && drug2
									? `${
											drug1?.type === 'Medication'
												? `${drug1.name} ${drug1.associatedDrug.name}`
												: drug1?.name
									  } and ${
											drug2?.type === 'Medication'
												? `${drug2.name} ${drug2.associatedDrug.name}`
												: drug2?.name
									  }:`
									: 'Select a Medication or Drug to check for interactions.'}
							</Typography>
							{interaction && (
								<Typography id="description" sx={{ mt: 2 }}>
									{interaction.description}
								</Typography>
							)}
						</Box>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							marginTop: 4,
						}}
					>
						<Button
							variant="contained"
							className="chkBtn"
							onClick={clearSelection}
							sx={{
								border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'black'}`,
								width: '25%',
								color: 'black',
								borderRadius: 5,
								fontWeight: 'bolder',
								fontFamily: 'Comfortaa',
								backgroundColor: (theme) => theme.palette.primary.main,
								zIndex: 1,
								'&:hover': {
									boxShadow: (theme) => `0 0 10px ${theme.palette.secondary.main}`,
								},
							}}
						>
							Clear Selection
						</Button>
					</Box>
				</CardContent>
				<Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
					For reference only. Always contact a medical professional before taking a new medication.
				</Typography>
			</Card>
		</>
	);
}

export default DrugInteractionChecker;
