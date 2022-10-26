import './popper.css';

const Popper = ({open, fn, title, children}) => {


    return open ? (
                <div className="popper">
                    <button type="button" onClick={e => fn(e, false) } className="popper__exit"></button>
                    <h5 className="popper__title">{title}</h5>
                    {children}
                </div>
            ) : null;
}

export default Popper;