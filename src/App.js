import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'easymde/dist/easymde.min.css'
import './index.scss'
import data from './api/data';

import {faPlus, faFileImport} from '@fortawesome/free-solid-svg-icons';
import SimpleMde from 'react-simplemde-editor'

import uuidV4 from 'uuid/v4'
import {flattenArr, objToArr} from './utils/helper';
import fileHelper from './utils/fileHelper';
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import BottomBtn from './components/BottomBtn';
import TabList from './components/TabList';


// require node modules
const {join} = window.require('path');
const {remote} = window.require('electron');

function App() {
    const [files, setFiles] = useState(flattenArr(data));
    const [activeFileID, setActiveFileId] = useState('');
    const [openedFileIDs, setOpenedFileIDs] = useState([]);
    const [unSaveFileIds, setUnSaveFileIds] = useState([]);
    const [searchFiles, setSearchFiles] = useState([]);
    const fileArr = objToArr(files);
    const saveLocation = remote.app.getPath('documents');
    console.log(saveLocation);
    const fileClick = (fileID) => {
        // set current id
        setActiveFileId(fileID);
        // add new file
        if (!openedFileIDs.includes(fileID)) {
            setOpenedFileIDs([...openedFileIDs, fileID])
        }

    };
    const tabClick = (fileID) => {
        setActiveFileId(fileID)
    };
    const tabClose = (id) => {
        let tabsWithout = openedFileIDs.filter(fileId => fileId !== id);
        setOpenedFileIDs(tabsWithout);
        if (tabsWithout.length > 0) {
            let currentID = openedFileIDs.findIndex(item => item === id);
            setActiveFileId(openedFileIDs[currentID - 1])
        } else {
            setActiveFileId('')
        }

    };
    const fileChange = (id, value) => {
        // 更新body内容
        const newFile = {...files[id], body: value};
        setFiles({...files, [id]: newFile});
        // 更新unSaveFileId
        if (!unSaveFileIds.includes(id)) {
            setUnSaveFileIds([...unSaveFileIds, id])
        }
    };
    const deleteFile = (id) => {
        // filter file
        delete files[id];
        // update file
        setFiles(files);
        tabClose(id)
    };
    const updateFileName = (id, title, isNew) => {
        const modifierFile = {...files[id], title, isNew: false};
        if (isNew) {
            fileHelper.writeFile(join(saveLocation, `${title}.md`), files[id].body).then(res => {
                setFiles({...files, [id]: modifierFile})
            })
        }
    };
    const fileSearch = (keyword) => {
        const newFiles = fileArr.filter(file => file.title.includes(keyword));
        setSearchFiles(newFiles)
    };
    const createNewFiles = () => {
        const newId = uuidV4();
        const newFile = {
            id: newId,
            title: '',
            body: '## 请输入',
            createdAt: +new Date(),
            isNew: true
        };
        setFiles({...files, [newId]: newFile})

    };
    const fileListArr = (searchFiles.length > 0) ? searchFiles : fileArr;
    const activeFile = files[activeFileID];
    const openFiles = openedFileIDs.map(openId => {
        return files[openId]
    });
    return (
        <div className="app container-fluid">
            <div className="row main-container">
                <div className="col-3 bg-light left-panel d-flex flex-column p-0">
                    <FileSearch
                        onFileSearch={fileSearch}
                        title="我的云文档"
                    />
                    <FileList
                        files={fileListArr}
                        onFileClick={fileClick}
                        onFileDelete={deleteFile}
                        onSaveEdit={updateFileName}
                    />
                    <div className="row no-gutters list-Bottom">
                        <div className="col">
                            <BottomBtn
                                colorClass="btn-primary"
                                icon={faPlus}
                                onBtnClick={createNewFiles}
                                text="新建"
                            />
                        </div>
                        <div className="col">
                            <BottomBtn
                                colorClass="btn-success"
                                icon={faFileImport}
                                text="导入"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-9 right-panel p-0">
                    {
                        !activeFile &&
                        <div className="start-page">
                            选择或者创建新的MarkDown 文档
                        </div>
                    }
                    {
                        activeFile &&
                        <>
                            <TabList
                                activeId={Number(activeFileID)}
                                files={openFiles}
                                onCloseTab={tabClose}
                                onTabClick={tabClick}
                                unSaveIds={unSaveFileIds}
                            />
                            <SimpleMde
                                key={activeFile && activeFileID}
                                onChange={(value) => {
                                    fileChange(activeFileID, value)
                                }}
                                options={{
                                    minHeight: '500px'
                                }
                                }
                                value={activeFile && activeFile.body}
                            />
                        </>
                    }

                </div>
            </div>
        </div>
    )
}

export default App;
