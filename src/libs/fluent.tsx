'use client';
import { Button as RawButton } from '@fluentui/react-components';

import { useFluentComponent } from '@hooks/useFluentComponent';

export const Button = (props) => useFluentComponent(RawButton, props);
