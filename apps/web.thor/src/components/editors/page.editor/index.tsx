import * as React from 'react';

import { BodySection } from './body.section';
import { Container } from './styles';
import { EditorStore } from './store';
import { EmptyContent } from './empty';
import { LoadingBlock } from '@app/components/loading.block';
import isEmpty from 'lodash.isempty';
import { useSectionsList } from './hooks/use.sections.list';

export const PageEditor: React.FC = () => {
  const size = EditorStore.useSelect((state) => state.size);
  const query = useSectionsList();
  const sections = query.data?.sectionsByPage;

  if (query.loading) {
    return (
      <Container size={size}>
        <LoadingBlock />
      </Container>
    );
  } else if (isEmpty(sections)) {
    return (
      <Container size={size}>
        <EmptyContent />
      </Container>
    );
  }

  return (
    <Container size={size}>
      {sections.map((section, index) => (
        <BodySection key={section.id} section={section} index={index} />
      ))}
    </Container>
  );
};
