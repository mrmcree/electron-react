import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import '../css/TabList.scss'
const TabList = ({files, activeId, unSaveIds, onTabClick, onCloseTab}) => {
    return (
        <ul className="nav nav-pills tabList-component">
            {files.map(file => {
                const withUnSaveMark = unSaveIds.includes(file.id);
                const fClassNames = classNames({
                    'nav-link': true,
                    'document-title ':true,
                    'no-border':true,
                    'active': file.id === activeId,
                    'widthUnsaved':withUnSaveMark
                });
                return (
                    <li className="nav-item no-border"
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
                            <span className="ml-2 close-icon"
                                onClick={(e) => {
                                      e.stopPropagation();
                                      onCloseTab(file.id)
                                  }}
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                />
                            </span>
                            {withUnSaveMark && <span className="rounded-circle unSaveIcon ml-2">

                            </span>}
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