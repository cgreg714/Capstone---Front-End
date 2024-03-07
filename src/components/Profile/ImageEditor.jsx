import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

const ImageEditor = ({ image, onImageChange }) => {
    const [zoom, setZoom] = useState(1);

    const handleZoomChange = (event) => {
        setZoom(Number(event.target.value));
    };

    const handleSave = () => {
        const canvas = editor.getImageScaledToCanvas().toDataURL();
        onImageChange(canvas);
    };

    let editor;

    return (
        <div>
            <AvatarEditor
                ref={(ref) => (editor = ref)}
                image={image}
                width={200}
                height={200}
                border={50}
                color={[255, 255, 255, 0.6]}
                scale={zoom}
            />
            <br />
            <input name="zoom" type="range" onChange={handleZoomChange} min="1" max="2" step="0.01" defaultValue="1" />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default ImageEditor;