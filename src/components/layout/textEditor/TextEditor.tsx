import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

function TextEditor() {

  return (
    <div className="App">
      <SunEditor
        // setContents="My contents"
        // showToolbar={true}
        // onChange={handleEditorChange}
        setDefaultStyle="height: auto"
        setOptions={{
          buttonList: [
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "list",
              "align",
              "fontSize",
              "formatBlock",
              "table",
              "image"
            ]
          ]
        }}
      />
    </div>
  );
}
export default TextEditor