import React, {useState, useEffect, useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import useKeyPress from '../hooks/useKeyPress';
import PropTypes from 'prop-types'
// 搜素文件组件
const FileSearch = ({title, onFileSearch}) => {
    const [inputActive, setInputActive] = useState(false);
    const [value, setValue] = useState('');
    const enterPress = useKeyPress(13);
    const escPress = useKeyPress(27);
    let node = useRef(null);
    const spanStyle = {
        lineHeight: '38px'
    };
    // 关闭搜索事件
    const closeSearch = () => {
        setInputActive(false);
        setValue('');
        onFileSearch('')
    };
    // 添加键盘事件
    useEffect(() => {
        if (enterPress && inputActive) {
            onFileSearch(value)
        }
        if (escPress && inputActive) {
            closeSearch()
        }
    });
    // 添加focus
    useEffect(() => {
        if (inputActive) {
            node.current.focus()
        }
    });
    return (
        <>
            <div className="alert alert-primary file-search no-border">
                {!inputActive &&
                <div className="d-flex justify-content-between align-item-center">
                    <span style={spanStyle}>{title}</span>
                    <button className="icon-button"
                        onClick={() => {
                                setInputActive(true)
                            }}
                        type="button"
                    >
                        <FontAwesomeIcon
                            icon={faSearch}
                            size="lg"
                            title="搜索"
                        />
                    </button>
                </div>
                }
                {
                    inputActive &&
                    <div className="row d-flex justify-content-between align-item-center">
                        <input className="form-control col-8"
                            onChange={(e) => {
                                   setValue(e.target.value)
                               }}
                            ref={node}
                            type="text"
                            value={value}
                        />
                        <button className="btn btn-primary col-4"
                            onClick={closeSearch}
                        >
                            <FontAwesomeIcon
                                icon={faTimes}
                                size="lg"
                                title="关闭"
                            />
                        </button>

                    </div>
                }
            </div>
        </>
    )
};
// 属性检查
FileSearch.propTypes = {
    title: PropTypes.string,
    onFileSearch: PropTypes.func.isRequired
};
// 默认属性值
FileSearch.defaultProps = {
    title: '我的云文档'
};
export default FileSearch