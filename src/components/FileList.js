import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash, faTimes} from '@fortawesome/free-solid-svg-icons';
import {faMarkdown} from '@fortawesome/free-brands-svg-icons';
import useKeyPress from '../hooks/useKeyPress';

const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
    const [editStatus, setEditStatus] = useState(false);
    const [value, setValue] = useState('');
    const enterPress = useKeyPress(13);
    const escPress = useKeyPress(27);
    const closeEdit = (editItem) => {
        setEditStatus(false);
        setValue('');
        if (editItem.isNew) {
            onFileDelete(editItem.id)
        }

    };
    // 添加键盘事件
    useEffect(() => {
        const editItem = files.find(file => file.id === editStatus);
    if (enterPress && editStatus &&value.trim()!=='') {
            setEditStatus(false);
            onSaveEdit(editItem.id, value,editItem.isNew);
            setValue('')

        }
        if (escPress && editStatus) {
            closeEdit(editItem)
        }
    });
    useEffect(() => {
        const newFile = files.find(file => file.isNew);
        if (newFile) {
            setEditStatus(newFile.id);
            setValue(newFile.title)
        }
    }, [files]);
    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file => (
                    <li className="list-group-item bg-light d-flex align-items-center file-item mx-0"
                        key={file.id}
                    >
                        {(file.id !== editStatus && !file.isNew) &&
                        <>
                         <span className="col-2 d-flex justify-content-center">
                            <FontAwesomeIcon
                                icon={faMarkdown}
                                size="lg"
                            />
                        </span>
                            <span className="col-8 document-title "
                                onClick={() => {
                                      onFileClick(file.id)
                                  }}
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
                                onClick={(e) => {
                                        e.stopPropagation();
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
                            ((file.id === editStatus) || file.isNew) &&
                            <>
                                <input className="form-control col-8"
                                    maxLength={15}
                                    onChange={(e) => {
                                           setValue(e.target.value)
                                       }}
                                    placeholder="请输入标题"
                                    type="text"
                                    value={value}

                                />
                                <button className="icon-button col-4"
                                    onClick={()=>{closeEdit(file)}}
                                >
                                    <FontAwesomeIcon icon={faTimes}/>
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
    onSaveEdit: PropTypes.func
};
export default FileList