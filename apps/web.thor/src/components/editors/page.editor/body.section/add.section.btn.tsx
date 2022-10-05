import * as React from 'react';

import { Button, css, styled } from '@mui/material';
import {
  GetPageSectionListDocument,
  useCreatePageSectionMutation,
} from '@app/generated/valhalla.gql';

import { makeFilterProps } from '@valhalla/web.react';
import { useApolloClient } from '@apollo/client';
import { useHelperDisplay } from './hooks/use.helpers.display';
import { useSectionIndex } from './scope.provider';
import { useSitePageId } from '@app/hooks/hydrate/use.site.page.hydrate';

const ActionBtn = styled(
  Button,
  makeFilterProps(['align', 'isVisible']),
)<{
  align?: Props['align'];
  isVisible?: boolean;
}>(
  ({ align, isVisible }) => css`
    position: absolute;
    margin: auto;
    align-self: center;
    transition: 0.2s all;

    &:hover {
      transform: scale(1.2);
    }

    ${!isVisible &&
    css`
      opacity: 0;
    `}

    ${align === 'top' &&
    css`
      top: 0;
      margin-top: -15px;
    `}

    ${align === 'bottom' &&
    css`
      bottom: 0;
      margin-bottom: -15px;
    `}
  `,
);

type Props = {
  align: 'top' | 'bottom';
};

export const AddSectionBtn: React.FC<Props> = ({ align }) => {
  const isVisible = useHelperDisplay();
  const sectionIndex = useSectionIndex();
  const apollo = useApolloClient();
  const isTop = align === 'top';
  const pageId = useSitePageId();
  const [createSection, { loading }] = useCreatePageSectionMutation({
    variables: {
      pageId,
      input: {
        index: isTop ? sectionIndex : sectionIndex + 1,
      },
    },
    onCompleted() {
      apollo.refetchQueries({
        include: [GetPageSectionListDocument],
      });
    },
  });

  function handleClick() {
    createSection({
      variables: {
        pageId,
        input: {},
      },
    });
  }

  return (
    <ActionBtn
      size="small"
      variant="contained"
      isVisible={isVisible && (!isTop || (isTop && sectionIndex !== 0))}
      align={align}
      disabled={loading}
      onClick={handleClick}
    >
      Add Section
    </ActionBtn>
  );
};
