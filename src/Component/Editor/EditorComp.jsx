import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useState } from "react";
export default function EditorComp(props) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const [contentEditor, setContentEditor] = useState(props.active.content);
  const handleEditorChange = (content, editor) => {
    props.setContent(content);
    setContentEditor(content);
  };

  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={props.active.content}
      init={{
        height: 600,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "casechange",
          "insertfile",
          "file",
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
          "pagebreak",
        ],
        toolbar:
          "bold italic underline casechange forecolor bullist | image media link insertfile",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      value={contentEditor}
      onEditorChange={handleEditorChange}
    />
  );
}
