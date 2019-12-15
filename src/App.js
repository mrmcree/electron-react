import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch';
import FileList from './components/FileList';
import data from './api/data';
import './index.css'
import BottomBtn from './components/BottomBtn';
import {faPlus,faFileImport} from '@fortawesome/free-solid-svg-icons';
import TabList from './components/TabList';
function App() {
    return (
        <div className="app container-fluid">
            <div className="row">
                <div className="col-3 bg-light left-panel "
                    style={{padding:0}}
                >
                    <FileSearch
                        onFileSearch={(value)=>{console.log(value)}}
                        title="我的云文档"
                    />
                    <FileList
                        files={data}
                        onFileClick={(id)=>{console.log(id)}}
                        onFileDelete={(id)=>{console.log(id)}}
                        onSaveEdit={(id,newValue)=>{
                            console.log(id,newValue)
                        }}
                    />
                    <div className="row no-gutters">
                        <div className="col">
                            <BottomBtn
                                colorClass="btn-primary"
                                icon={faPlus}
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
                <div className="col-9 right-panel">
                    <TabList
                        activeId={1}
                        files={data}
                        onTabClick={(id)=>{console.log(id)}}
                    />
                </div>
            </div>
        </div>
    )
}
export default App;
