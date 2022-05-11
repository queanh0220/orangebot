import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useState } from "react";




export default function EditorComp() {
  const editorRef = useRef(null);
const log = () => {
if (editorRef.current) {
console.log(editorRef.current.getContent());
}
};

  const [contentEditor, setContentEditor] = useState();
  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
    setContentEditor(content);
  };

  return (
    <Editor
onInit={(evt, editor) => (editorRef.current = editor)}
initialValue="<p>This is the initial content of the editor.</p>"
init={{
height: 500,
menubar: false,
plugins: [
"advlist",
"autolink",
"lists",
"link",
"image",
"charmap",
"anchor",
"searchreplace",
"visualblocks",
"code",
"fullscreen",
"insertdatetime",
"media",
"table",
"preview",
"help",
"wordcount",
],
toolbar:
"undo redo | blocks | " +
"bold italic forecolor | alignleft aligncenter " +
"alignright alignjustify | bullist numlist outdent indent | " +
"removeformat | help",
content_style:
"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
}}
/>

  );
}
