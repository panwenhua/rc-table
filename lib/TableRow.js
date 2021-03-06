'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var TableRow = _react2['default'].createClass({
  displayName: 'TableRow',

  propTypes: {
    onDestroy: _react2['default'].PropTypes.func,
    onRowClick: _react2['default'].PropTypes.func,
    record: _react2['default'].PropTypes.object,
    prefixCls: _react2['default'].PropTypes.string,
    expandIconColumnIndex: _react2['default'].PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onRowClick: function onRowClick() {},
      onDestroy: function onDestroy() {},
      expandIconColumnIndex: 0
    };
  },

  componentWillUnmount: function componentWillUnmount() {
    this.props.onDestroy(this.props.record);
  },

  isInvalidRenderCellText: function isInvalidRenderCellText(text) {
    return text && !_react2['default'].isValidElement(text) && Object.prototype.toString.call(text) === '[object Object]';
  },

  render: function render() {
    var props = this.props;
    var prefixCls = props.prefixCls;
    var columns = props.columns;
    var record = props.record;
    var index = props.index;
    var cells = [];
    var expanded = props.expanded;
    var expandable = props.expandable;
    var expandIconAsCell = props.expandIconAsCell;
    var indent = props.indent;
    var indentSize = props.indentSize;
    var needIndentSpaced = props.needIndentSpaced;
    var onRowClick = props.onRowClick;
    var expandIconColumnIndex = props.expandIconColumnIndex;

    for (var i = 0; i < columns.length; i++) {
      var col = columns[i];
      var colClassName = col.className || '';
      var render = col.render;
      var text = record[col.dataIndex];

      var expandIcon = undefined;
      var tdProps = undefined;
      var colSpan = undefined;
      var rowSpan = undefined;
      var notRender = false;

      if (expandable) {
        expandIcon = _react2['default'].createElement('span', { className: prefixCls + '-expand-icon ' + prefixCls + '-' + (expanded ? 'expanded' : 'collapsed'),
          onClick: props.onExpand.bind(null, !expanded, record) });
      } else if (needIndentSpaced) {
        expandIcon = _react2['default'].createElement('span', { className: prefixCls + '-expand-icon ' + prefixCls + '-spaced' });
      }

      var isColumnHaveExpandIcon = expandIconAsCell ? false : i === expandIconColumnIndex;

      if (expandIconAsCell && i === 0) {
        cells.push(_react2['default'].createElement(
          'td',
          { className: prefixCls + '-expand-icon-cell',
            key: 'rc-table-expand-icon-cell' },
          expandIcon
        ));
      }

      if (render) {
        text = render(text, record, index);
        if (this.isInvalidRenderCellText(text)) {
          tdProps = text.props || {};
          rowSpan = tdProps.rowSpan;
          colSpan = tdProps.colSpan;
          text = text.children;
        }
      }

      // Fix https://github.com/ant-design/ant-design/issues/1202
      if (this.isInvalidRenderCellText(text)) {
        text = null;
      }

      if (rowSpan === 0 || colSpan === 0) {
        notRender = true;
      }

      var indentText = _react2['default'].createElement('span', { style: { paddingLeft: indentSize * indent + 'px' },
        className: prefixCls + '-indent indent-level-' + indent });

      if (!notRender) {
        cells.push(_react2['default'].createElement(
          'td',
          { key: col.key,
            colSpan: colSpan,
            rowSpan: rowSpan,
            className: colClassName },
          isColumnHaveExpandIcon ? indentText : null,
          isColumnHaveExpandIcon ? expandIcon : null,
          text
        ));
      }
    }
    return _react2['default'].createElement(
      'tr',
      { onClick: onRowClick.bind(null, record, index),
        className: prefixCls + ' ' + props.className + ' ' + prefixCls + '-level-' + indent,
        style: { display: props.visible ? '' : 'none' } },
      cells
    );
  }
});

exports['default'] = TableRow;
module.exports = exports['default'];