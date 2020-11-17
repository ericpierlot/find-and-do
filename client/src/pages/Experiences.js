import React from 'react';
import RenderExperience from './experience/RenderExperience';
import { Wrapper, Section, Article } from '../css/styled/Experience/styled';

const Experiences = () => {
  return (
    <Section>
      <Wrapper>
        <Article>
          <RenderExperience />
        </Article>
      </Wrapper>
    </Section>
  );
};

export default Experiences;
