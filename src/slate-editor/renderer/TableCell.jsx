import React from 'react';
import Select from 'material-ui/Select';

class TabelCell extends React.PureComponent {
  state = {
    isMouseHovered: false,
  }

  onSelectChange = (e) => {
    const { editor, node } = this.props;
    const { value } = editor;
    const change = value.change();
    change
      .setNodeByKey(node.key, {
        data: {
          align: e.target.value,
        },
      });

    editor.onChange(change);
  }

  mouseEnter = () => {
    this.setState({ isMouseHovered: true });
  }

  mouseLeave = () => {
    this.setState({ isMouseHovered: false });
  }

  render() {
    const {
      node, editor, attributes, children,
    } = this.props;
    const isReadOnly = editor.props.readOnly;
    const { isMouseHovered } = this.state;

    const align = node.get('data').get('align') || 'left';
    return (
      <td
        {...attributes}
        style={{ textAlign: align }}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        {children}
        {
          (!isReadOnly && isMouseHovered) &&
          <div
            contentEditable={false}
            style={{ position: 'absolute', top: 1, right: 2 }}
          >
            <Select native value={align} onChange={this.onSelectChange}>
              <option value="left">left</option>
              <option value="center">center</option>
              <option value="right">right</option>
            </Select>
          </div>
        }
      </td>
    );
  }
}
export default TabelCell;
