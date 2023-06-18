import { React, useEffect, useState } from "react";
import "./style.scss";
import RichTextStore from "../../stores/richTextStore";
import { Editor, RichUtils, convertFromRaw, EditorState } from "draft-js";

export default function RichText() {
  const store = RichTextStore();

  useEffect(() => {
    // SI je trouve un contenu je l'intègre
    if (store.contentStateJson) {
      store.editorState = store.contentStateJson.createWithContent(
        convertFromRaw(JSON.parse(store.contentStateJson))
      );
      // Sinon je créé un éditeur vide
    } else {
      EditorState.createEmpty();
    }
  });

  // Callback underline button
  const onUnderlineClick = () => {
    store.setEditorState(
      RichUtils.toggleInlineStyle(store.editorState, "UNDERLINE")
    );
  };

  // Callback bold button
  const onBoldClick = () => {
    store.setEditorState(
      RichUtils.toggleInlineStyle(store.editorState, "BOLD")
    );
  };

  // Callback Italic button
  const onItalicClick = () => {
    store.setEditorState(
      RichUtils.toggleInlineStyle(store.editorState, "ITALIC")
    );
  };

  // Callback Bullet Pointbutton
  const onListItem = () => {
    store.setEditorState(
      RichUtils.toggleBlockType(store.editorState, "unordered-list-item")
    );
  };

  return (
    <>
      <div className="editorText">
        <input
          className="editorText__title"
          type="text"
          value={store.EditorTitle}
          onChange={store.setEditorTitle}
          placeholder="My title . . ."
        />
        <div className="button__container">
          <button
            className="button__container__underline"
            onClick={onUnderlineClick}
          >
            U
          </button>
          <button className="button__container__bold" onClick={onBoldClick}>
            b
          </button>
          <button className="button__container__italic" onClick={onItalicClick}>
            i
          </button>
          <button className="button__container__listItem" onClick={onListItem}>
            Bullet Point
          </button>
        </div>

        <Editor
          editorState={store.editorState}
          onChange={store.setEditorState}
        />
      </div>
    </>
  );
}
