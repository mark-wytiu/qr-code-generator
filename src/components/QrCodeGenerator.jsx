import { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import QRCode from 'react-qr-code';
import './QrCodeGenerator.css';


function QrCodeGenerator() {
    const [url, setUrl] = useState('');
    const [qrIsVisible, setQrIsVisible] = useState(false);
    const handleQrCodeGeneratior = () => {
        if (!url) {
            return;
        }
        setQrIsVisible(true);
    };
    const qrCodeRef = useRef(null);
    const downloadQRCode = () => {
        htmlToImage
            .toPng(qrCodeRef.current)
            .then(function (dataUrl) {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "qr-code.png";
                link.click();
            })
            .catch(function (error) {
                console.error("Error generating QR code:", error);
            });
    };
    return (
        <div className="qrcode_container">
            <h1>QR Code Generator</h1>
            <div className="qrcode__container--parent" ref={qrCodeRef}>
                <div className='qrcode__input'>
                    <input type="text"
                        placeholder='Enter URL'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button onClick={handleQrCodeGeneratior}>Generate QR Code</button>
                </div>
                {qrIsVisible && (
                    <div className="qrcode__download">
                        <div className="qrcode__image">
                            <QRCode value={url} size={400} />
                        </div>
                        <button onClick={downloadQRCode}>Download QR Code</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QrCodeGenerator;