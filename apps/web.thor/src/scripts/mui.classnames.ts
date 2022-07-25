import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';

ClassNameGenerator.configure((componentName) =>
  componentName.replace(/mui/g, '').replace(/Mui/g, '').toLowerCase(),
);