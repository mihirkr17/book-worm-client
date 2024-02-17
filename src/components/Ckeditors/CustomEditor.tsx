// components/custom-editor.js

import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@ckeditor/ckeditor5-build-classic";

const editorConfiguration = {
   toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo'
   ]
};

function CustomEditor(props: any) {
   return (
      <CKEditor
         editor={Editor}
         config={editorConfiguration}
         data={props.initialData}
         onChange={(event, editor) => {
            const data = editor.getData();
            props.setData(data)
         }}
      />
   )
}

export default CustomEditor;
