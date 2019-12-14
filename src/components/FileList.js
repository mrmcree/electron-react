import React, {useState, useEffect } from "react";
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faMarkdown} from "@fortawesome/free-brands-svg-icons";
import useKeyPress from "../hooks/useKeyPress";
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
                    <li className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
                        key={file.id}>
                        {(file.id !== editStatus) &&
                        <>
                         <span className="col-2">
                            <FontAwesomeIcon
                                size='lg'
                                icon={faMarkdown}
                            />
                        </span>
                            <span className="col-8 c-link" onClick={() => {
                                onFileClick(file.id)
                            }}>{file.title}</span>
                            <button className="icon-button col-1 d-flex justify-content-center"
                                    type='button'>
                                <FontAwesomeIcon
                                    size='lg'
                                    icon={faEdit}
                                    title='编辑'
                                    onClick={() => {
                                        setEditStatus(file.id);
                                        setValue(file.title)
                                    }}
                                />
                            </button>
                            <button className="icon-button col-1 d-flex justify-content-center" type='button'
                                    onClick={() => {
                                        onFileDelete(file.id)
                                    }}>
                                <FontAwesomeIcon
                                    size='lg'
                                    icon={faTrash}
                                    title='删除'
                                />
                            </button>
                        </>
                        }
                        {
                            (file.id === editStatus) &&
                            <>
                                <input type="text" className="form-control col-10" value={value}
                                       onChange={(e) => {
                                           setValue(e.target.value)
                                       }}

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