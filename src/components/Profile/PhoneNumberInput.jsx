import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';

const PhoneNumberInput = React.forwardRef(({ value, onChange }, ref) => {
    const handleChange = (event) => {
        let newValue = event.target.value.replace(/\D/g, ''); // remove all non-digits
        if (newValue.length > 10) newValue = newValue.slice(0, 10); // max 10 digits
        let formattedValue = '';
        if (newValue.length > 0) {
            formattedValue += `(${newValue.slice(0, 3)})`;
            if (newValue.length > 3) {
                formattedValue += ` ${newValue.slice(3, 6)}`;
                if (newValue.length > 6) {
                    formattedValue += `-${newValue.slice(6)}`;
                }
            }
        }
        onChange(formattedValue);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Backspace') {
                const { selectionStart } = ref.current;
                if (selectionStart === 5) {
                    event.preventDefault();
                    const newCursorPosition = selectionStart - 1;
                    ref.current.setSelectionRange(newCursorPosition, newCursorPosition);
                }
            }
        };
        const inputElement = ref.current;
        inputElement.addEventListener('keydown', handleKeyDown);
        return () => {
            inputElement.removeEventListener('keydown', handleKeyDown);
        };
    }, [ref]);

    return (
        <TextField
            value={value}
            onChange={handleChange}
            label="Phone Number"
            fullWidth
            placeholder="(   )    -"
            inputRef={ref}
        />
    );
});

export default PhoneNumberInput;