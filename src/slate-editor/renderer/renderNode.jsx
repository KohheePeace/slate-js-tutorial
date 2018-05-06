import React from 'react';

import BLOCKS from '../constants/blocks';
import INLINES from '../constants/inlines';
import CodeBlock from './CodeBlock';
import LinkNode from './LinkNode';
import Video from './Video';
import Image from './Image';
import TableCell from './TableCell';
import CheckListItem from './CheckListItem';
import Paragraph from './Paragraph';
import Heading from './Heading';

const renderNode = (props) => {
  const {
    attributes, children, node, isSelected,
  } = props;
  switch (node.type) {
    case BLOCKS.PARAGRAPH:
      return <Paragraph {...props} />;
    case BLOCKS.HEADING_1:
      return <Heading {...props} />;
    case BLOCKS.HEADING_2:
      return <Heading {...props} />;
    case BLOCKS.HEADING_3:
      return <Heading {...props} />;
    case BLOCKS.HEADING_4:
      return <Heading {...props} />;
    case BLOCKS.HEADING_5:
      return <Heading {...props} />;
    case BLOCKS.HEADING_6:
      return <Heading {...props} />;
    case BLOCKS.CODE_BLOCK:
      return <CodeBlock {...props} />;
    case BLOCKS.CODE_LINE:
      return <div {...attributes}>{children}</div>;
    case BLOCKS.HR:
      return <hr {...attributes} style={isSelected ? { outline: '1px solid #17a2b8' } : null} />;
    case BLOCKS.UL_LIST:
      return <ul {...attributes}>{children}</ul>;
    case BLOCKS.OL_LIST:
      return <ol {...attributes}>{children}</ol>;
    case BLOCKS.LIST_ITEM:
      return <li {...attributes}>{children}</li>;
    case BLOCKS.CHECK_LIST:
      return <ul {...attributes}>{children}</ul>;
    case BLOCKS.CHECK_LIST_ITEM:
      return <CheckListItem {...props} />;
    case BLOCKS.BLOCKQUOTE:
      return <blockquote {...attributes}>{children}</blockquote>;
    case INLINES.LINK:
      return <LinkNode {...props} />;
    case BLOCKS.IMAGE:
      return <Image {...props} />;
    case BLOCKS.VIDEO:
      return <Video {...props} />;
    case BLOCKS.TABLE:
      return <table><tbody {...attributes}>{children}</tbody></table>;
    case BLOCKS.TABLE_ROW:
      return <tr {...attributes}>{children}</tr>;
    case BLOCKS.TABLE_CELL:
      return <TableCell {...props} />;
    default:
      return null;
  }
};
export default renderNode;
