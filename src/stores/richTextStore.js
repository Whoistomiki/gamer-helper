import create from "zustand";
import { convertToRaw, EditorState } from "draft-js";

const RichTextStore = create((set) => ({
  editorState: EditorState.createEmpty(),
  editorTitle :"",
  contentState: "",
  contentStateJson: "",
  
          /* note title editable */
setEditorTitle:(e) => {
  set({editorTitle: e.target.value
  })},

         /*Initialisation editor component */
  setEditorState: (newEditorState) => {
    set({ editorState: newEditorState });
  },

                  /* Value */
  setContentState: () => {
    // Value recuperation "draft format"
    set({
      contentState: RichTextStore.getState().editorState.getCurrentContent(),
    });

    // Value trasformation "draft format" to "JSON format"
    set({
      contentStateJson: convertToRaw(RichTextStore.getState().contentState),
    });

  },
}));

export default RichTextStore;
