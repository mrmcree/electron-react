import React, {useState, useEffect, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch,faTimes} from "@fortawesome/free-solid-svg-icons";
import useKeyPress from "../hooks/useKeyPress";
import PropTypes from 'prop-types'
// 搜素文件组件
const FileSearch = ({title, onFileSearch}) => {
    const [inputActive, setInputActive] = useState(false);
    const [value, setValue] = useState('');
    const enterPress=useKeyPress(13)
    const escPress=useKeyPress(27)
    let node = useRef(null);
    const spanStyle = {
        lineHeight: '38px'
    };
    // 关闭搜索事件
    const closeSearch = () => {
        setInputActive(false);
        setValue('')
    };
    // 添加键盘事件
    useEffect(() => {
        if(enterPress && inputActive){
            onFileSearch(value)
        }
        if(escPress && inputActive){
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
            <div className="alert alert-primary ">
                {!inputActive &&
                <div className='d-flex justify-content-between align-item-center'>
                    <span style={spanStyle}>{title}</span>
                    <button className="btn btn-primary"
                            type='button'
                            onClick={() => {
                                setInputActive(true)
                            }}
                    >
                        <FontAwesomeIcon
                            title="搜索"
                            size="lg"
                            icon={faSearch}
                        />
                    </button>
                </div>
                }
                {
                    inputActive &&
                    <div className='row d-flex justify-content-between align-item-center'>
                        <input type="text" className="form-control col-8" value={value}
                               onChange={(e) => {
                                   setValue(e.target.value)
                               }}
                               ref={node}
                        />
                        <button className="btn btn-primary col-4"
                                onClick={closeSearch}
                        > <FontAwesomeIcon
                            title="关闭"
                            size="lg"
                            icon={faTimes}
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
    title: "我的云文档"
};
export default FileSearch