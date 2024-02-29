import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import pill from '../../../assets/pill.png';
import medication from '../../../assets/medicine130x130.png';

const PillAnimation = () => {
	const controls = useAnimation();
	const spillControls = useAnimation();

	useEffect(() => {
		controls.start({
			rotate: [0, 180],
			transition: { duration: 2, times: [0, 1] },
		});

		// Start the pill animation after 1 second
		setTimeout(() => {
			spillControls.start('spill');
		}, 1000);
	}, [controls, spillControls]);

	return (
		<motion.div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<motion.img
				src={medication}
				alt="medication"
				animate={controls}
				style={{ transformOrigin: 'center' }} // spin around center
			/>
			<motion.div
				initial={{ y: -100, opacity: 0 }}
				animate={spillControls}
				transition={{ delay: 1, duration: 1, times: [0, 0.5, 1], yoyo: Infinity, ease: 'easeInOut' }}
				variants={{
					spill: { y: 100, opacity: 1 },
				}}
			>
				<img src={pill} alt="pill" style={{ transform: 'scale(0.1)' }} />
			</motion.div>
		</motion.div>
	);
};

export default PillAnimation;
