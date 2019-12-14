import React, {useState, useEffect, useRef} from "react";
import PropTypes from 'prop-types'

const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
    return (
        <ul className="list-group list-group-flush file.list">
            {
                files.map(file => (
                    <li className="list-group-item bg-light row d-flex align-item-center file-item"
                        key={file.id}>
                        <span className="col-2">22</span>
                        <span>{file.title}</span>
                    </li>
                ))
            }
        </ul>
    )

};

FileList.propTypes = {
    files: PropTypes.array,
    onFileClick:PropTypes.func,
    onFileSearch:PropTypes.func
};
export default FileList