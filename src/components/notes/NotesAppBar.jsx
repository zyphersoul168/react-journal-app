import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startDeletingNote, startSaveNote, startUploadingImage } from "../../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: activeNote } = useSelector((state) => state.notes);

  const handleSave = () => {
    dispatch(startSaveNote(activeNote));
    console.log("note updated");
  };

  const handlePictureUpload = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) dispatch(startUploadingImage(file));
  };

  const handleDelete = () => {
    dispatch(startDeletingNote(activeNote.id));
  }

  return (
    <div className="notes__appbar">
      <span>Septiembre 6, 2021</span>
      <input
        id="fileSelector"
        name="file"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div>
        <button className="btn notes__appbar-btn" onClick={handlePictureUpload}>
          Picture
        </button>
        <button className="btn notes__appbar-btn" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};
