import React from 'react';
import styled from 'react-emotion';

const TagList = styled('div')`
  border-top: 2px solid #f9f9f9;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
`;

export default function Tags({ list = [], ignore }) {
  const tags = list.filter((a) => {return a !== ignore});
  return (
    <TagList className="tags">
      {tags.map((tag, index) =>
        <span className="tag is-size-6 has-text-weight-light is-lowercase" key={index}>{tag}</span>
      )}
    </TagList>
  );
}
