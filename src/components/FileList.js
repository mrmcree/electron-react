import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {faMarkdown} from '@fortawesome/free-brands-svg-icons';
import useKeyPress from '../hooks/useKeyPress';
const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
    const [editStatus, setEditStatus] = useState(false);
    const [value, setValue] = useState('');
    const enterPress=useKeyPress(13)
    const escPress=useKeyPress(27)
    const closeEdit = ()=> {
        setEditStatus(false);
        setValue('')
    };
    // 添加键盘事件
    useEffect(() => {
        if(enterPress && editStatus){
            const editItem=files.find(file=>file.id===editStatus)
            onSaveEdit(editItem.id,value)
            setValue('')

        }
        if(escPress && editStatus){
            closeEdit()
        }
    });
    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file => (
                    <li className="list-group-item bg-light d-flex align-items-center file-item mx-0"
                        key={file.id}
                    >
                        {(file.id !== editStatus) &&
                        <>
                         <span className="col-2">
                            <FontAwesomeIcon
                                icon={faMarkdown}
                                size="lg"
                            />
                        </span>
                        <span className="col-8 c-link"
                            onClick={() => {onFileClick(file.id)}}
                        >
                            {file.title}
                        </span>
                        <button className="icon-button col-1 d-flex justify-content-center"
                            type="button"
                        >
                            <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() => {
                                    setEditStatus(file.id);
                                    setValue(file.title)
                                }}
                                size="lg"
                                title="编辑"
                            />
                        </button>
                        <button className="icon-button col-1 d-flex justify-content-center"
                            onClick={() => {
                                    onFileDelete(file.id)
                                }}
                            type="button"
                        >
                            <FontAwesomeIcon
                                icon={faTrash}
                                size="lg"
                                title="删除"
                            />
                        </button>
                        </>
                        }
                        {
                            (file.id === editStatus) &&
                            <>
                                <input className="form-control col-10"
                                    onChange={(e) => {
                                           setValue(e.target.value)
                                       }}
                                    type="text"
                                    value={value}

                                />
                                <button className="btn btn-primary col-2"
                                    onClick={closeEdit}
                                >关闭
                                </button>

                            </>
                        }

                    </li>
                ))
            }
        </ul>
    )

};

FileList.propTypes = {
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onFileSearch: PropTypes.func,
    onSaveEdit:PropTypes.func
};
export default FileList