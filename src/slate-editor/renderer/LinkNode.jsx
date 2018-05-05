import React from 'react';
import Input from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Close from '@material-ui/icons/Close';
import Tooltip from 'material-ui/Tooltip';
import PropTypes from 'prop-types';
import Types from 'slate-prop-types';

class LinkNode extends React.PureComponent {
  static propTypes = {
    editor: PropTypes.shape({}).isRequired,
    node: Types.node.isRequired,
    attributes: PropTypes.shape({}).isRequired,
    children: PropTypes.node.isRequired,
  };

  state = {
    open: false,
  }

  onClick = (e) => {
    const { node } = this.props;
    const url = node.data.get('url');

    e.stopPropagation();

    window.open(url, '_blank');
  }

  handleUrlChange = (e) => {
    const { node, editor } = this.props;

    e.stopPropagation();
    editor.change(c => c.setNodeByKey(node.key, {
      data: {
        url: e.target.value,
      },
    }));
  }

  unWrapLink = () => {
    const { node, editor } = this.props;

    editor.change(c => c.unwrapInlineByKey(node.key, {
      type: 'link',
    }));
  }

  openToolTip = () => {
    this.hrefInput.focus();
    this.setState({ open: true });
  }

  closeToolTip = () => {
    this.setState({ open: false });
  }

  render() {
    const {
      node, editor, attributes, children,
    } = this.props;
    const { readOnly } = editor.props;
    const url = node.data.get('url');

    const { open } = this.state;

    return (
      <Tooltip
        enterDelay={1000}
        id="tooltip-link"
        onOpen={this.openToolTip}
        open={open}
        placement="top"
        title={
          <div onMouseLeave={this.closeToolTip}>
            <Input
              inputRef={(input) => { this.hrefInput = input; }}
              value={url || ''}
              onChange={this.handleUrlChange}
            />
            <IconButton onClick={this.unWrapLink}>
              <Close />
            </IconButton>
          </div>
        }
      >
        <a
          id={node.key}
          {...attributes}
          onMouseDown={readOnly ? null : () => this.onClick}
          style={{ cursor: 'pointer' }}
        >
          {children}
        </a>
      </Tooltip>
    );
  }
}
export default LinkNode;
