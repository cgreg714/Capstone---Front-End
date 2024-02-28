import React, { useContext, useState, useCallback } from 'react';
import { Autocomplete, TextField, Card, CardContent, CardHeader, Grid, Typography, Button, Box } from '@mui/material';
import { DrugContext } from '../../contexts/DrugContext';
import { getInteractionBetweenTwoDrugs } from '../../api/drugAPI';
import './DInteractions.css';
import { MedicationContext } from '../../contexts/MedicationContext';

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
								color: '#828A8F',
								backgroundColor: '#9E1B32',
								borderRadius: '5px',
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
								style={{ width: 300 }}
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
									<TextField {...params} label="Medication/Drug" variant="outlined" />
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Autocomplete
								options={drugs}
								getOptionLabel={(option) => option.name}
								style={{ width: '100%' }}
								value={drug2 ? drugs.find((option) => option._id === drug2._id) || null : null}
								onChange={(event, newValue) => {
									setDrug2(newValue);
								}}
								renderInput={(params) => <TextField {...params} label="Drug 2" variant="outlined" />}
								filterOptions={(options) => options.slice(0, 10)}
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
								fontWeight: 'bolder',
								fontFamily: 'Comfortaa',
								backgroundColor: '#9e521b',
								zIndex: 1,
								'&:hover': { backgroundColor: '#828A8F' },
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
								width: 400,
								bgcolor: 'background.paper',
								border: '2px solid #000',
								boxShadow: 24,
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
									: 'Select a Medication/Drug and a Drug to check for interactions between them'}
							</Typography>
							{interaction && (
								<Typography id="description" sx={{ mt: 2 }}>
									{interaction.description}
								</Typography>
							)}
						</Box>
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
