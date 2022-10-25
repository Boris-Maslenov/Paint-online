import './popper.css';
import { Slider} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setWidth } from '../../actions';

const WidthSlider = styled(Slider)(
    {
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
            }
    }
);

const Popper = ({fn}) => {
    const dispatch = useDispatch();
    const width = useSelector(state=>+state.width);

    return (
                <div className="popper">
                    <button type="button" onClick={e => fn(e, false) } className="popper__exit"></button>
                    <h5 className="popper__title">Размер кисти</h5>
                    <div className="popper__columns">
                        <div className='popper__slider-wrap'>
                            <WidthSlider value={width} onChange={e => dispatch(setWidth(e.target.value))} min={1} max={50} aria-label="Default" valueLabelDisplay="auto" />
                        </div>
                        <div className="popper__input-wrap">
                            <input type="number" value={width} onChange={e => dispatch(setWidth(e.target.value))}  min={1} max={50} className="popper__input" />
                        </div>
                    </div>
                </div>
            ) 
}

export default Popper;