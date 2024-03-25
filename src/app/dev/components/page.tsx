import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import React from 'react';

import { ButtonGallery } from '@components/fluent/Button/index.test';
import { CheckboxGallery } from '@components/fluent/Checkbox/index.test';
import { LinkGallery } from '@components/fluent/Link/index.test'
import { ThemeTest } from './ThemeTest';

export default function Components() {
  return (
    <>
      <Header />
      <div>
        <div className="mx-auto max-w-4xl py-8">
          <ThemeTest />
        </div>
        <div className="mx-auto max-w-4xl py-8">
          <div className="mb-2">Link</div>
          <LinkGallery />
        </div>
        <div className="mx-auto max-w-4xl py-8">
          <div className="mb-2">Checkbox</div>
          <CheckboxGallery />
        </div>
        {/*<div className="mx-auto max-w-4xl py-8">*/}
        {/*  <div className="mb-2">Buttons</div>*/}
        {/*  <ButtonGallery />*/}
        {/*</div>*/}
      </div>
      <Footer />
    </>
  );
}
