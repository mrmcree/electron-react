import React from "react";
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const BottomBtn = ({text, colorClass, icon, onBtnClick}) => {
    return (
        <>
            <button type='button'
                    className={`btn w-100 btn-clock no-border ${colorClass}`}
                    onClick={onBtnClick}
            >
                <FontAwesomeIcon
                    size='lg'
                    className='mr-2'
                    icon={icon}

                />
                {text}
            </button>
        </>
    )

};
BottomBtn.prototype = {
    text: PropTypes.string,
    colorClass: PropTypes.string,
    icon: PropTypes.element.isRequired,
    onBtnClick: PropTypes.func
};
BottomBtn.defaultProps = {
    text: '新建'
};
export default BottomBtn