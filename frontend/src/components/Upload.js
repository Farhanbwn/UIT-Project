import './Upload.css';
import React, { useState, useRef } from 'react';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('');
    const [otherDetails, setOtherDetails] = useState('');
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError('File size must be less than 10MB');
                setFile(null);
                fileInputRef.current.value = '';
            } else {
                setError('');
                setFile(selectedFile);
            }
        }
    };

    const handleFileTypeChange = (e) => {
        setFileType(e.target.value);
        if (e.target.value) {
            setError('');
        }
    };

    const handleCancel = () => {
        setFile(null);
        setFileType('');
        setOtherDetails('');
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUpload = () => {
        if (!fileType) {
            setError('Please select a file type.');
            return;
        }
        alert(`Uploading: ${file.name} as ${fileType} ${fileType === "Other" && otherDetails ? `with details: ${otherDetails}` : ''}`);
    };

    return (
        <div className="upload-container">
            <h2 className="text">Upload File</h2>

            <div className="mb-3">
                <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
            </div>

            {file && (
                <>
                    <div className="mb-3">
                        <label className="form-label">Select File Type:</label>
                        <select
                            className="form-select"
                            value={fileType}
                            onChange={handleFileTypeChange}
                        >
                            <option value="">-- Select File Type --</option>
                            <option value="Prescription">Prescription</option>
                            <option value="Medical Report">Medical Report</option>
                            <option value="Invoice">Invoice</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {fileType === "Other" && (
                        <div className="mb-3">
                            <label className="form-label">Enter File Details (Optional):</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter details about the file"
                                value={otherDetails}
                                onChange={(e) => setOtherDetails(e.target.value)}
                            />
                        </div>
                    )}
                </>
            )}

            {error && <p className="text-danger">{error}</p>}

            {file && (
                <div className="file-info mb-3">
                    <p><strong>Selected File:</strong> {file.name}</p>
                    {fileType && <p><strong>File Type:</strong> {fileType}</p>}
                    {fileType === "Other" && otherDetails && <p><strong>Details:</strong> {otherDetails}</p>}
                    <button className="btn btn-danger me-2" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleUpload}>
                        Upload
                    </button>
                </div>
            )}
        </div>
    );
};

export default Upload;
