import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NotePage = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          className="notes__title-input"
          placeholder="An awesome history?"
          autoComplete="off"
        />
        <textarea
          placeholder="Tell it here!"
          className="notes__textarea"></textarea>
        <div className="notes__img">
          <img
            src="https://i.ytimg.com/vi/JMesmr1RpXI/maxresdefault.jpg"
            alt="imagen"
          />
        </div>
      </div>
    </div>
  );
};
