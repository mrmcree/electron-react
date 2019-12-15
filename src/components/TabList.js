import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import '../css/TabList.scss'
const TabList = ({files, activeId, unSaveIds, onTabClick, onCloseTab}) => {
    return (
        <ul className="nav nav-pills tabList-component">
            {files.map(file => {
                const fClassNames = classNames({
                    'nav-link': true,
                    'active': file.id === activeId
                });
                return (
                    <li className="nav-item"
                        key={file.id}
                    >
                        <a className={fClassNames}
                            href="#"
                            onClick={(e) => {
                               e.preventDefault();
                               onTabClick(file.id)
                           }}
                        >
                            {file.title}
                            <span className="ml-2 close-icon" >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                />
                            </span>
                        </a>
                    </li>
                )
            })}
        </ul>
    )
};
TabList.propTypes = {
    files: PropTypes.array,
    activeId: PropTypes.number,
    unSaveIds: PropTypes.array,
    onTabClick: PropTypes.func,
    onCloseTab: PropTypes.func
};
TabList.defaultProps = {
    unSaveIds: []
};
export default TabList