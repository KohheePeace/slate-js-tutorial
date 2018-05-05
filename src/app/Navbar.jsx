import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import SlateEditTable from '@strelka/slate-edit-table';
import SlateEditList from 'slate-edit-list';
import SlateEditCode from 'slate-edit-code';
import SlateEditBlockquote from 'slate-edit-blockquote';

import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import BorderColor from '@material-ui/icons/BorderColor';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import StrikethroughS from '@material-ui/icons/StrikethroughS';
import Code from '@material-ui/icons/Code';


import FormatQuote from '@material-ui/icons/FormatQuote';
import GridOn from '@material-ui/icons/GridOn';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import CheckBox from '@material-ui/icons/CheckBox';
import Tooltip from 'material-ui/Tooltip';

import MARKS from '../slate-editor/constants/marks';
import BLOCKS from '../slate-editor/constants/blocks';

import s from './Navbar.scss';

const ListPlugin = SlateEditList({
  types: [BLOCKS.OL_LIST, BLOCKS.UL_LIST],
  typeItem: BLOCKS.LIST_ITEM,
});

const CheckListPlugin = SlateEditList({
  types: [BLOCKS.CHECK_LIST],
  typeItem: BLOCKS.CHECK_LIST_ITEM,
});

const BlockquotePlugin = SlateEditBlockquote();

const CodePlugin = SlateEditCode();

const TablePlugin = SlateEditTable();


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

function Navbar(props) {
  const { classes } = props;

  function hasMark(type) {
    const { value } = props;
    return value.activeMarks.some(mark => mark.type === type);
  }

  function hasBlock(type) {
    const { value } = props;
    return value.blocks.some(node => node.type === type);
  }

  function onClickMark(e, type) {
    e.preventDefault();
    const { value } = props;
    const change = value.change().toggleMark(type);

    props.onChange(change);
  }

  function onClickBlock(e, type) {
    e.preventDefault();

    const { value } = props;
    const change = value.change();

    const {
      DEFAULT, HEADING_1, HEADING_2, HEADING_3, HR, BLOCKQUOTE, CODE,
      TABLE, UL_LIST, OL_LIST, CHECK_LIST,
    } = BLOCKS;

    switch (type) {
      case HEADING_1:
      case HEADING_2:
      case HEADING_3:
      {
        const isActive = hasBlock(type);
        change.setBlocks(isActive ? DEFAULT : type);
        break;
      }
      case HR: {
        change.setBlocks({ type, isVoid: true });
        break;
      }
      case BLOCKQUOTE: {
        const isActive = BlockquotePlugin.utils.isSelectionInBlockquote(value);
        return isActive ?
          props.onChange(BlockquotePlugin.changes.unwrapBlockquote(change))
          :
          props.onChange(BlockquotePlugin.changes.wrapInBlockquote(change));
      }
      case CODE: {
        CodePlugin.changes.toggleCodeBlock(change);
        break;
      }
      case TABLE: {
        const isActive = TablePlugin.utils.isSelectionInTable(value);
        return isActive ?
          props.onChange(TablePlugin.changes.removeTable(change))
          :
          props.onChange(TablePlugin.changes.insertTable(change));
      }
      case UL_LIST: {
        const isActive = ListPlugin.utils.isSelectionInList(value)
                    && ListPlugin.utils.getCurrentList(value).type === UL_LIST;
        return isActive ?
          props.onChange(ListPlugin.changes.unwrapList(change))
          :
          props.onChange(ListPlugin.changes.wrapInList(change, UL_LIST));
      }
      case OL_LIST: {
        const isActive = ListPlugin.utils.isSelectionInList(value)
                    && ListPlugin.utils.getCurrentList(value).type === OL_LIST;
        return isActive ?
          props.onChange(ListPlugin.changes.unwrapList(change))
          :
          props.onChange(ListPlugin.changes.wrapInList(change, OL_LIST));
      }
      case CHECK_LIST: {
        const isActive = CheckListPlugin.utils.isSelectionInList(value)
                    && CheckListPlugin.utils.getCurrentList(value).type === CHECK_LIST;
        return isActive ?
          props.onChange(CheckListPlugin.changes.unwrapList(change))
          :
          props.onChange(CheckListPlugin.changes.wrapInList(change, CHECK_LIST));
      }
      default:
        return null;
    }

    return props.onChange(change);
  }

  function renderMarkButton(type, title) {
    const isActive = hasMark(type);
    const onMouseDown = e => onClickMark(e, type);
    const {
      BOLD, ITALIC, HIGHLIGHT, STRIKETHROUGH, UNDERLINE, CODE,
    } = MARKS;

    let Tag;

    switch (type) {
      case BOLD:
        Tag = <FormatBold style={{ fontSize: 20 }} />;
        break;
      case ITALIC:
        Tag = <FormatItalic style={{ fontSize: 20 }} />;
        break;
      case HIGHLIGHT:
        Tag = <BorderColor style={{ fontSize: 20 }} />;
        break;
      case STRIKETHROUGH:
        Tag = <StrikethroughS style={{ fontSize: 20 }} />;
        break;
      case UNDERLINE:
        Tag = <FormatUnderlined style={{ fontSize: 20 }} />;
        break;
      case CODE:
        Tag = <Code style={{ fontSize: 20 }} />;
        break;
      default:
        return null;
    }

    return (
      /* eslint-disable */
      <Tooltip id={`tooltip-block-${type}`} title={title} placement="bottom">
        <span className={s.button} onMouseDown={onMouseDown} data-active={isActive}>
          {Tag}
        </span>
      </Tooltip>
      /* eslint-enable */
    );
  }

  function renderBlockButton(type, title) {
    const { value } = props;
    const onMouseDown = e => onClickBlock(e, type);

    let isActive;
    let Tag;

    const {
      HEADING_1, HEADING_2, HEADING_3, HR, BLOCKQUOTE, CODE, TABLE, UL_LIST, OL_LIST, CHECK_LIST,
    } = BLOCKS;

    switch (type) {
      case HEADING_1:
      {
        isActive = hasBlock(type);
        Tag = <div style={{ height: 22, fontSize: 16, fontWeight: 500 }}>H1</div>;
        break;
      }
      case HEADING_2:
      {
        isActive = hasBlock(type);
        Tag = <div style={{ height: 22, fontSize: 16, fontWeight: 500 }}>H2</div>;
        break;
      }
      case HEADING_3:
      {
        isActive = hasBlock(type);
        Tag = <div style={{ height: 22, fontSize: 16, fontWeight: 500 }}>H3</div>;
        break;
      }
      case HR:
      {
        isActive = hasBlock(type);
        Tag = <div style={{ height: 22, fontSize: 16, fontWeight: 500 }}>HR</div>;
        break;
      }
      case BLOCKQUOTE:
      {
        isActive = BlockquotePlugin.utils.isSelectionInBlockquote(value);
        Tag = <FormatQuote style={{ fontSize: 20 }} />;
        break;
      }
      case CODE:
      {
        Tag = <Code style={{ fontSize: 20 }} />;
        isActive = CodePlugin.utils.isInCodeBlock(value);
        break;
      }
      case TABLE:
      {
        isActive = TablePlugin.utils.isSelectionInTable(value);
        Tag = <GridOn style={{ fontSize: 20 }} />;
        break;
      }
      case UL_LIST:
      {
        isActive = ListPlugin.utils.isSelectionInList(value)
                    && ListPlugin.utils.getCurrentList(value).type === UL_LIST;
        Tag = <FormatListBulleted style={{ fontSize: 20 }} />;
        break;
      }
      case OL_LIST:
      {
        isActive = ListPlugin.utils.isSelectionInList(value)
                    && ListPlugin.utils.getCurrentList(value).type === OL_LIST;
        Tag = <FormatListNumbered style={{ fontSize: 20 }} />;
        break;
      }
      case CHECK_LIST:
      {
        isActive = CheckListPlugin.utils.isSelectionInList(value)
                    && CheckListPlugin.utils.getCurrentList(value).type === CHECK_LIST;
        Tag = <CheckBox style={{ fontSize: 20 }} />;
        break;
      }
      default:
        return null;
    }

    return (
      /* eslint-disable */
      <Tooltip id={`tooltip-block-${type}`} title={title} placement="bottom">
        <span className={s.button} onMouseDown={onMouseDown} data-active={isActive}>
          {Tag}
        </span>
      </Tooltip>
      /* eslint-enable */
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit">
        <Toolbar className={s.toolbar}>
          {renderMarkButton(MARKS.BOLD, '⌘ + b')}
          {renderMarkButton(MARKS.ITALIC, '⌘ + i')}
          {renderMarkButton(MARKS.HIGHLIGHT, '⌘ + e')}
          {renderMarkButton(MARKS.STRIKETHROUGH, '⌘ + d')}
          {renderMarkButton(MARKS.UNDERLINE, '⌘ + u')}
          {renderMarkButton(MARKS.CODE, '⌘ + shift + 9')}
          {renderBlockButton(BLOCKS.HEADING_1, '# + space')}
          {renderBlockButton(BLOCKS.HEADING_2, '## + space')}
          {renderBlockButton(BLOCKS.HEADING_3, '### + space')}
          {renderBlockButton(BLOCKS.HR, '--- + enter')}
          {renderBlockButton(BLOCKS.BLOCKQUOTE, '> + space')}
          {renderBlockButton(BLOCKS.CODE, '```foo.rb:ruby + enter')}
          {renderBlockButton(BLOCKS.TABLE, '⌘ + e')}
          {renderBlockButton(BLOCKS.UL_LIST, '- + space')}
          {renderBlockButton(BLOCKS.OL_LIST, '1. + space')}
          {renderBlockButton(BLOCKS.CHECK_LIST, '[] + space')}
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default withStyles(styles)(Navbar);

Navbar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

