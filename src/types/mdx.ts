export type PostMetaType = {
  __content: string;
  __id: string;
  __raw: {
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: string;
    flattenedPath: string;
  };
  __hash: string;
};

export type PostType = {
  meta: PostMetaType;
  Component: React.ComponentType;
};
