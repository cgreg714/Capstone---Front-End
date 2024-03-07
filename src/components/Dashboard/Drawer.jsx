import React, { useState, useEffect } from 'react';
import { MainListItems } from './NavItemsList';
import { Box, ListItem } from '@mui/material';
import medicine from '../../assets/medicine.png';
import { StyledDrawer, drawerWidth, StyledDrawerAvatar } from '../../styles/mainLayoutStyles';
import { motion } from 'framer-motion';

const MotionStyledDrawerAvatar = motion(StyledDrawerAvatar);

const jiggleAnimation = {
	rest: {},
	hover: {
		rotate: [0, 10, -10, 10, -10, 0],
		transition: {
			duration: 0.8,
            repeat: Infinity
		},
	},
	clicked: {
		rotate: [0, 360],
		transition: { duration: 1 },
	},
};

export function PermanentDrawerLeft({ setSelectedMenu }) {
	const [hoverAnimation, setHoverAnimation] = useState('rest');
	const [clickAnimation, setClickAnimation] = useState(false);

	const handleClick = () => {
		setClickAnimation(true);
	};

	const handleMouseEnter = () => {
		setHoverAnimation('hover');
	};

	const handleMouseLeave = () => {
		setHoverAnimation('hover');
		setTimeout(() => {
			setHoverAnimation('rest');
		}, 1000);
	};

	useEffect(() => {
		if (clickAnimation) {
			const timer = setTimeout(() => {
				setClickAnimation(false);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [clickAnimation]);

	return (
		<Box sx={{ display: 'flex' }}>
			<StyledDrawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
				}}
				variant="permanent"
				anchor="left"
			>
				<ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
					<MotionStyledDrawerAvatar
						src={medicine}
						alt="dosem"
						variant="square"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						onClick={handleClick}
						animate={clickAnimation ? 'clicked' : hoverAnimation}
						variants={jiggleAnimation}
					/>
				</ListItem>
				<Box>
					<MainListItems setSelectedMenu={setSelectedMenu} />
				</Box>
			</StyledDrawer>
		</Box>
	);
}
