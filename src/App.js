import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import data from "./api/data";

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
                    />
                </div>
                <div className="col-9 bg-primary right-panel">
                    <h1>this is right</h1>
                </div>
            </div>
        </div>
    )
}
export default App;
