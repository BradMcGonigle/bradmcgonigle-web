import React from 'react';
import styled from '@emotion/styled';

const TagList = styled('div')`
  border-top: 2px solid #f9f9f9;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
`;

export default function Tags({ list = [], ignore }) {
  let tags = list.filter((a) => {return a !== ignore});
  tags = tags.sort(); // Sort alphabetically
  return (
    <TagList className="tags">
      {tags.map((tag, index) =>
        <span className="tag is-size-6 has-text-weight-light is-lowercase" key={index}>{tag}</span>
      )}
    </TagList>
  );
}
