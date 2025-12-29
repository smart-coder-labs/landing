import sharedConfig from '@smart-coder-labs/eslint-config/react';
import tseslint from 'typescript-eslint';

export default tseslint.config(...sharedConfig, ...tseslint.configs.recommended);
