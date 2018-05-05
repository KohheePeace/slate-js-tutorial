const insertLink = (change, url) => {
  if (change.value.isCollapsed) {
    change
      .insertText(url)
      .extend(0 - url.length)
      .wrapInline({
        type: 'link',
        data: { url },
      })
      .collapseToEnd();
  } else {
    change.wrapInline({
      type: 'link',
      data: { url },
    });

    change.collapseToEnd();
  }
};

export default insertLink;
