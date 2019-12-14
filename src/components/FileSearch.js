import React, {useState, useEffect, useRef} from "react";
import PropTypes from 'prop-types'
// 搜素文件组件
const FileSearch = ({title, onFileSearch}) => {
    const [inputActive, setInputActive] = useState(false);
    const [value, setValue] = useState('');
    let node = useRef(null);
    const spanStyle = {
        lineHeight: '38px'
    };
    // 关闭搜索事件
    const closeSearch = (e) => {
        e.preventDefault();
        setInputActive(false);
        setValue('')
    };
    // 添加键盘事件
    useEffect(() => {
        const handleInputEvent = (e) => {
            const {keyCode} = e;
            if (keyCode === 13 && inputActive) {
                onFileSearch(value)
            } else if (keyCode === 27 && inputActive) {
                closeSearch(e)
            }
        };
        document.addEventListener('keyup', handleInputEvent);
        return () => {
            document.removeEventListener('keyup', handleInputEvent)
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
                        搜索
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
                        >关闭
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