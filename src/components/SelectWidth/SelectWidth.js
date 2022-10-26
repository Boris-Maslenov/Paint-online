import { Slider} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import Popper from '../Popper/Popper';
import { setWidth } from '../../actions';
import { sliderStyles } from '../../styles';
const WidthSlider = styled(Slider)(sliderStyles);

const SelectWidth = ({open, fn}) => {

    const dispatch = useDispatch();
    const width = useSelector(state=>+state.width);

    return (
        <Popper open={open} fn={fn} title={'Размер кисти'}>
            <div className="popper__columns">
                <div className='popper__slider-wrap'>
                    <WidthSlider value={width} onChange={e => dispatch(setWidth(e.target.value))} min={1} max={50} aria-label="Default" valueLabelDisplay="auto" />
                </div>
                <div className="popper__input-wrap">
                    <input type="number" value={width} onChange={e => dispatch(setWidth(e.target.value))}  min={1} max={50} className="popper__input" />
                </div>
            </div>
        </Popper>
    )
}

export default SelectWidth;