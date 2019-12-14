import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import data from "./api/data";
import './index.css'
import BottomBtn from "./components/BottomBtn";
import {faPlus,faFileImport} from "@fortawesome/free-solid-svg-icons";

function App() {
    return (
        <div className="app container-fluid">
            <div className="row">
                <div className="col-3 bg-light left-panel " style={{padding:0}}>
                    <FileSearch
                        title='我的云文档'
                        onFileSearch={(value)=>{console.log(value)}}
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
                                text='新建'
                                colorClass='btn-primary'
                                icon={faPlus}
                            />
                        </div>
                        <div className="col">
                            <BottomBtn
                                text='导入'
                                colorClass='btn-success'
                                icon={faFileImport}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-9 bg-primary right-panel">
                    <h1>this is right</h1>
                </div>
            </div>
        </div>
    )
}
export default App;
