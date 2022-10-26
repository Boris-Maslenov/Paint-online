export const sliderStyles = {
    color: '#D0D8E2',
    height: 8,
    padding: '13px 0',
        '& .MuiSlider-thumb' : {
            width: '22px',
            height: '22px',
            border: '2px solid #5B6E87',
            background: '#FFFFFF',
                '&:before' : {
                    width: '8px',
                    height: '8px',
                    top: '50%',
                    left: '50%',
                    background: '#5B6E87;',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: 'none',
                }
        },
        '& .MuiSlider-valueLabelLabel' : {
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: '600',
        }
}