import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NotesAppBar } from "./NotesAppBar";
import { useForm } from "../../hooks/useForm";
import { activeNote } from "../../actions/notes";

export const NotePage = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const { body, title } = formValues;
  const activeId = useRef(note.id);

  useEffect(() => {
    if(note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, {...formValues}))
  }, [formValues, dispatch]);

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          className="notes__title-input"
          placeholder="An awesome history?"
          autoComplete="off"
          name="title"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="Tell it here!"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>
        {note.url && (
          <div className="notes__img">
            <img
              src={note.url}
              alt="imagen"
            />
          </div>
        )}
      </div>
    </div>
  );
};
