import React from 'react';

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage:
            'url(https://pm1.narvii.com/7673/bc18bebccadba969afa1b0778c53bbdfa93bda26r1-540-553v2_hq.jpg)',
        }}></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">Un nuevo día</p>
        <p className="journal__entry-content">
          Cillum tempor est esse incididunt ex velit est quis pariatur
          consectetur.
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>5</h4>
      </div>
    </div>
  );
};
