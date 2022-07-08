import * as React from 'react';

import { FaSolid, Icon, cProps } from '@valhalla/react';
import { IconButton, Tooltip } from '@mui/material';

import Link from 'next/link';
import { useSiteHydrate } from '@app/hooks/use.site.hydrate';

type Props = cProps;

export const ExitButton: React.FC<Props> = () => {
  const site = useSiteHydrate();
  const prevUrl = `/sites/${site.data?.id}`;

  return (
    <Link href={prevUrl} passHref>
      <a>
        <Tooltip title={`Return to ${site.data.name} Page`} placement="right">
          <IconButton>
            <Icon icon={FaSolid.faArrowLeft} />
          </IconButton>
        </Tooltip>
      </a>
    </Link>
  );
};
